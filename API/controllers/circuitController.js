/* eslint-disable no-undef */
/* eslint-disable no-console */

const db = require('../models');
const utils = require('./utils');
module.exports = 
{
	circuit : async (req,res) => 
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		try
		{
			let circuit = await db.Circuit.findByPk(req.params.id_circuit,
				{
					attributes : ['name','description','duration','need_internet','level'],
					where: {blocked : 0},
					include :
					[
						{
							model : db.Favorite,
							where : {id_user : id_user},
							attributes : ['id'],
							required : false
						},
						{
							model : db.Evaluation
						}
					]
				}
			);

			res.json(utils.averageStars(circuit));
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
						where : {id_circuit : req.params.id_circuit, blocked : 0},
						include : 
						[
							{
								model : db.Step,
								include : 
								[
									{
										model : db.Question
									}
								]
							},
							{
								model : db.Evaluation
							}
						]
					});

				circuit.images = await utils.getFiles('circuit',circuit.id_circuit);

				let stepImages = [];

				let steps = circuit.Steps.map(async step =>
				{
					stepImages = await utils.getFiles('step',step.id_step);
					if(!stepImages.length)
						return step.images = [];
					else
						return step.images = stepImages;
				});


				circuit.Steps = await Promise.all(steps);
				
				res.status(200).send(utils.averageStars(circuit));
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
					where : {id_circuit : steps_within_range, published : 1, blocked : 0},
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

			res.status(201).send(utils.averageStars(circuits));
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
			res.status(200).send(await db.Circuit.findAll(
				{
					where : {blocked : false}
				}
			));
		}
		
		catch(err)
		{
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
				let circuits = await db.Circuit.findAll(
					{
						where : {id_user : id_user},
						include : 
						[
							{
								model : db.Evaluation
							}
						]
					});

				res.json(utils.averageStars(circuits));
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
						published : 0,
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
				res.json(await db.Circuit.findAll({where : {published : true, blocked : 0}}));
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
	},

	isFavorite : async (req,res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);

		if(id_user)
		{
			try
			{
				let favorite = await db.Favorite.findOne(
					{
						where : {id_circuit : req.params.id_circuit, id_user : id_user}
					});
				
				if(favorite)
					res.json({isFavorites : true});
				else
					res.json({isFavorites : false});
					
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


