/* eslint-disable no-undef */
/* eslint-disable no-console */

const db = require('../models');
const utils = require('./utils');
module.exports = 
{
	circuit : async (req,res) => 
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		console.log(id_user);
		try
		{
			if (id_user) 
			{
				let circuit = await db.Circuit.findByPk(req.params.id_circuit,
					{
						attributes : ['name','description','duration','need_internet','level'],
						include : 
						[
							{
								model : db.Favorite,
								where : {id_user : id_user},
								attributes : ['id'],
								required : false
							}
						]
					}
				);
				res.json(circuit);
			}
			else
			{

				let circuit = await db.Circuit.findByPk(req.params.id_circuit,
					{
						attributes : ['name','description','duration','need_internet','level']
					}
				);
				res.json(circuit);
			}

		}
		
		catch(err)
		{
			res.status(500).send(utils.messages.serverError);
			console.log(err);
		}
	},

	downloadCircuit : async (req,res) =>
	{
		if(utils.verifToken(req.headers['authorization']))
		{
			try
			{
				let circuit = await db.Circuit.findOne(
					{
						where : {id_circuit : req.params.id_circuit},
						include : 
						[
							{
								model : db.Step,
								attributes : ['id_step','name','latitude','longitude','description','order','instruction','validation'],
								include : 
								[
									{
										model : db.Question,
										attributes : ['id_question','wording','response','type_of','points']
									}
								]
							}
						]
					});
				
				res.status(200).send(circuit);
			}

			catch(err)
			{
				res.status(500).send(utils.messages.serverError);
				console.log(err);
			}
		}
		else
			res.status(401).send(utils.messages.invalidToken);
	},

	//////////////////////////////////////////////////////////

	nearbyCircuits : async (req,res) =>
	{
		try
		{  
			let steps = await db.Step.findAll({attributes : ['id_circuit','longitude','latitude'],where : {order : 0}});
			let steps_within_range = [];
			let dist = 0;

			steps.map(step =>
			{
				dist = utils.distanceBetweenPoints(step.latitude,req.body.user_latitude,step.longitude,req.body.user_longitude);
				if(dist <= req.body.distance)
					steps_within_range.push(step.id_circuit);
			});

			let circuits = await db.Circuit.findAll(
				{
					where : {id_circuit : steps_within_range, published : 1},
					attributes : ['id_circuit','name' ,'description','length','duration','need_internet','published','level','version'],
					include : 
					[
						{
							model : db.Step,
							where : {order: 0},
							attributes : ['latitude','longitude']
						},
						{
							model : db.Evaluation
						}
					]
				});

			let c = [];
			let count = 0;
			let note = 0;
			let currentCircuit = null;
			circuits.map((circuit) => 
			{
				if(circuit)
				{
					currentCircuit = circuit.toJSON();
					note = 0;
					count = 0;
					currentCircuit.Evaluations.map(evaluation =>
					{
						note+= evaluation.stars;
						count++;
					});
					if(count)
						currentCircuit.note = Math.round( (note / count) * 10 ) / 10;
					
					else
						currentCircuit.note = 0;

					c.push(currentCircuit);
				}     
			});

			res.status(201).send(c);
		}

		catch(err)
		{
			res.status(500).send(utils.messages.serverError);
			console.log(err);
		}
	},

	//////////////////////////////////////////////////////////

	circuits : async (req,res) => 
	{
		try
		{
			res.status(200).send(await db.Circuit.findAll());
		}
		
		catch(err)
		{
			console.log(err);
			res.status(500).send(utils.messages.serverError);
		}
	},

	//////////////////////////////////////////////////////////

	myCircuits : async (req,res) => 
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			try
			{
				res.json(await db.Circuit.findAll({where : {id_user : id_user}}));
			}
			
			catch(err)
			{
				console.log(err);
				res.status(500).send(utils.messages.serverError);
			}
		}
		else
			res.status(401).send(utils.messages.invalidToken);
	},

	//////////////////////////////////////////////////////////

	createCircuit : async (req,res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			let t = await db.sequelize.transaction();
			try
			{
				let circuit = await db.Circuit.create(
					{
						name : req.body.name,
						description : req.body.description,
						length : req.body.length,
						duration : req.body.duration,
						need_internet : req.body.need_internet,
						published : 1,
						version : 1,
						level : req.body.level,
						id_user : id_user
					},{transaction : t});

				await t.commit();
				await utils.createFolder(circuit.id_circuit,1);
				res.status(201).send(circuit);
			}

			catch(err)
			{
				console.log(err);
				await t.rollback();
				res.status(500).send(utils.messages.serverError);
			}
		}
		else
			res.status(401).send(utils.messages.invalidToken);
	},

	//////////////////////////////////////////////////////////

	publicationCircuit : async (req,res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			let t = await db.sequelize.transaction();
			try
			{
				let circuit = await db.Circuit.findOne({where : {id_circuit : req.body.id_circuit}});
				await circuit.update({published: !circuit.published},{transaction : t});
				t.commit();
				res.sendStatus(204);
			}

			catch(err)
			{
				await t.rollback();
				console.log(err);
				res.status(500).send(utils.messages.serverError);
			}
		}
		else
			res.status(401).send(utils.messages.invalidToken);
	},

	//////////////////////////////////////////////////////////

	deleteCircuit : async (req,res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			let t = await db.sequelize.transaction();
			try
			{
				await db.Circuit.destroy({where : {id_circuit : req.body.id_circuit}},{transaction : t});
				await t.commit();
				res.sendStatus(204);
			}

			catch(err)
			{
				console.log(err);
				await t.rollback();
				res.status(500).send(utils.messages.serverError);
			}
		}
		else
			res.status(401).send(utils.messages.invalidToken);
	},

	//////////////////////////////////////////////////////////

	publishedCircuits : async (req,res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			try
			{
				res.json(await db.Circuit.findAll({where : {published : true}}));
			}

			catch(err)
			{
				console.log(err);
				res.status(500).send(utils.messages.serverError);
			}
		}
		else
			res.status(401).send(utils.messages.invalidToken);
	},

	//////////////////////////////////////////////////////////

	updateCircuit : async (req, res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			let t = await db.sequelize.transaction();
			try
			{
				let circuit = await db.Circuit.findByPk(req.params.id_circuit);
				if(circuit.id_user === id_user) 
				{
					await circuit.update(req.body,{transaction : t});
					await t.commit();
					res.status(200).send(circuit);
				}

				else
				{
					res.sendStatus(403);
					await t.rollback();
				}
					
			}

			catch(err)
			{
				console.log(err);
				await t.rollback();
				res.status(500).send(utils.messages.serverError);
			}
		}
		else
			res.status(401).send(utils.messages.invalidToken);
	},

	patch : async (req,res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			let t = await db.sequelize.transaction();
			try
			{
				let circuit = await db.Circuit.findByPk(req.params.id_circuit);
				if(circuit.id_user === id_user) 
				{
					await circuit.update({version : circuit.version + 1},{transaction : t});
					await t.commit();
					res.status(200).send(circuit);
				}

				else
				{
					res.sendStatus(403);
					await t.rollback();
				}
					
			}

			catch(err)
			{
				console.log(err);
				await t.rollback();
				res.status(500).send(utils.messages.serverError);
			}
		}
		else
			res.status(401).send(utils.messages.invalidToken);
	}
};


