/* eslint-disable no-console */
/* eslint-disable no-undef */

const db = require('../models');
const utils = require('./utils');
module.exports = 
{
	createEvaluation : async (req,res) => 
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			let t = await db.sequelize.transaction();
			try
			{
				let evaluation = await db.Evaluation.create(
					{
						comment : req.body.comment,
						stars : req.body.stars,
						id_circuit : req.body.id_circuit,
						id_user : id_user
					},{transaction : t});
				await t.commit();
				res.status(201).send(evaluation);
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

	////////////////////////////////////////////////////////////////////////////

	evaluationsCircuit : async (req,res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{

			
			try
			{
				let evaluations = await db.Evaluation.findAll(
					{
						attributes : ['comment','stars'],
						include :
						[
							{
								model : db.User,
								attributes : ['id_user','firstname','lastname']
							}
						],
						where : {id_circuit : req.params.id_circuit}
					});

				res.json(evaluations);
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

	////////////////////////////////////////////////////////////////////////////

	updateEvaluation : async (req,res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if (id_user)
		{
			let t = await db.sequelize.transaction();
			try 
			{
				let evaluation = await db.Evaluation.findByPK(req.params.id_comment);
				if(evaluation.id_user === id_user)
				{
					await evaluation.update(req.body,{transaction : t});
					await t.commit();
					res.status(200).send(evaluation);
				}
				else
				{
					res.sendStatus(403);
					await t.rollback();
				}
			} 
			
			catch (error) 
			{
				console.log(err);
				await t.rollback();
				res.status(500).send(utils.messages.serverError);
			}
		}
	},

	//////////////////////////////////////////////////////////

	deleteEvaluation : async (req,res) =>
	{
		if (utils.verifToken(req.headers['authorization']))
		{
			let t = await db.sequelize.transaction();
			try
			{
				await db.Evaluation.destroy({where : {id : req.params.id_evaluation}}, {transaction: t});
				await t.commit();
				res.sendStatus(204);
			}

			catch(err)
			{
				await t.rollback();
				res.status(500).send(utils.messages.serverError);
				console.log(err);
			}
		}
		else
		res.status(401).send(utils.messages.invalidToken);
	}
};