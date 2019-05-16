/* eslint-disable no-undef */
/* eslint-disable no-console */

const db = require('../models');
const utils = require('./utils');
const Promise = require('bluebird');
module.exports = 
{
	stepCircuit : async (req,res) => 
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			try
			{
				res.json(await db.Step.findAll({where : {id_circuit : req.params.id_circuit}, order: ['order']}));
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

	step: async (req,res) => 
	{
		if(utils.verifToken(req.headers['authorization']))
		{
			try
			{
				res.json(await db.Step.findOne(
					{
						where : {id_step : req.params.id_step},
						attributes : ['id_step','name','latitude','longitude','description','order','instruction'],
						include : 
						[
							{
								model : db.Question,
								attributes : ['id_question','wording','response','type_of','points']
							}
						]
					}));
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

	createStep : async (req,res) =>
	{
		if(utils.verifToken(req.headers['authorization']))
		{
			let t = await db.sequelize.transaction();
			try
			{
				
				let count = await db.Step.count({where : {id_circuit : req.body.id_circuit}});
				let step = await db.Step.create(
					{
						name : req.body.name,
						latitude : req.body.latitude,
						longitude : req.body.longitude,
						description : req.body.description,
						order : count,
						instruction : req.body.instruction,
						id_circuit : req.body.id_circuit
					},{transaction : t});
				await t.commit();
				await utils.evaluateDistance(req.body.id_circuit);
				res.json(step);
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

	changeOrder : async (req,res) =>
	{
		if(utils.verifToken(req.headers['authorization']))
		{
			let t = db.sequelize.transaction();
			try
			{
				let steps =  await db.Step.findAll({attributes : ['id_step','order'],where : {id_circuit : req.body.id_circuit}});
				let t = await db.sequelize.transaction();
				
				const map = steps.map(async step => 
				{
					if(parseInt(step.order) === parseInt(req.body.previous))
					{
						step.order = req.body.new;
					}
					else if(parseInt(step.order) < parseInt(req.body.previous) && parseInt(step.order) >= parseInt(req.body.new))
					{
						step.order += 1;
					}
					else if (parseInt(step.order) > parseInt(req.body.previous) && parseInt(step.order) <= parseInt(req.body.new))
					{
						step.order -= 1;
					}

					await step.save({transaction: t});
				});

				await Promise.all(map);
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

	addQuestionToStep : async (req,res) =>
	{
		if(utils.verifToken(req.headers['authorization']))
		{
			let t = await db.sequelize.transaction();
			try
			{
				let step = await db.Step.findByPk(req.body.id_step);
				let t = await db.sequelize.transaction();
				await db.Question.create(
					{
						wording : req.body.question,
						response : req.body.response,
						type_of : req.body.typeOf,
						points : req.body.points,
						id_step :  step.id_step
					},{transaction : t});

				await t.commit();
				res.sendStatus(201);
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

	deleteStep : async (req, res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			let t = await db.sequelize.transaction();
			try
			{
				let circuit = await db.Circuit.findOne(
					{
						where : {id_circuit : req.params.id_circuit},
						include :
						[
							{
								model : db.Step,
								where : {id_step : req.params.id_step}
							}
						]
					});

				let order = circuit.Steps[0].order;
				await circuit.Steps[0].destroy({transaction : t});
				let steps = await db.Step.findAll({attributes: ['id_step','order'], where : {id_circuit: req.params.id_circuit, order: {[db.sequelize.Op.gt]: order}}});
				
				const map = steps.map(async step => 
				{
					step.order-= 1;
					await step.save({transaction: t});
				});

				await Promise.all(map);
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

	updateStep : async (req, res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			let t = await db.sequelize.transaction();
			try
			{
				let step = await db.Step.findOne(
					{
						where : {id_step : req.params.id_step},
						include : 
						[
							{
								model : db.Question,
							}
						]
					});
	
				let circuit = await db.Circuit.findByPk(step.id_circuit);
	
				if(circuit.id_user === id_user)
				{		
					step.description = req.body.step.description;
					step.instruction = req.body.step.instruction;
					step.latitude = req.body.step.latitude;
					step.longitude = req.body.step.longitude;
					step.name = req.body.step.name;
					step.order = req.body.step.order;
					step.validation = req.body.step.validation;
					if(!step.Questions.length)
					{
						let map = req.body.step.Questions.map(async question =>
						{
							await db.Question.create(
								{
									wording : question.wording,
									response : question.response,
									type_of : question.type_of,
									points : question.points,
									id_step : step.id_step
								},{transaction : t});
						});
	
						await Promise.all(map);
					}
	
					else
					{
						let match = {};
						let map = step.Questions.map(async question => 
						{
							match = {};
							match = req.body.step.Questions.find(e =>  e.id_question === question.id_question);
							if(match)
							{
								
								question.wording = match.wording;
								question.response = match.response;
								question.type_of = match.type_of;
								question.points = match.points;
								await question.save({transaction : t});
							}
						});
	
						await Promise.all(map);
	
						map = req.body.step.Questions.map(async question_body =>
						{	
							if(!question_body.id_question)
							{
								await db.Question.create(
									{
										wording : question_body.wording,
										response : question_body.response,
										type_of : question_body.type_of,
										points : question_body.points,
										id_step : step.id_step
									},{transaction : t});
							}
						});
					}
					
					await step.save({transaction : t});
					await t.commit();
					await utils.evaluateDistance(step.id_circuit);
					res.sendStatus(204);
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

	//////////////////////////////////////////////////////////

	updateQuestion : async (req, res) =>
	{
		if(utils.verifToken(req.headers['authorization']))
		{
			let t = await db.sequelize.transaction();
			try
			{
				let question = await db.Question.findByPk(req.params.id_question);
				await question.update(req.body,{transaction : t});
				res.status(200).send(question);
			}
			
			catch(err)
			{
				console.log(err);
				res.status(500).send(utils.messages.serverError);
				t.rollback();
			}
		}
		else
			res.sendStatus(401);
	}
};
