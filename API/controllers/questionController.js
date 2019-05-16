/* eslint-disable no-undef */
/* eslint-disable no-console */

const db = require('../models');
const utils = require('./utils');
module.exports = 
{
	question : async (req,res) => 
	{
		try
		{
			res.json(await db.Question.findAll());
		}

		catch(err)
		{
			console.log(err);
			res.status(500).send(utils.messages.serverError);
		}
	},

	//////////////////////////////////////////////////////////

	getQuestion : async (req, res) =>
	{
		if(utils.verifToken(req.headers['authorization']))
		{

			try
			{
				res.json(await db.Question.findByPk(req.params.id_question,{attributes : ['id_question','wording','points','response']}));
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

	createQuestion : async (req, res) =>
	{
		if(utils.verifToken(req.headers['authorization']))
		{
			let t = await db.sequelize.transaction();
			try
			{
				let question = await await db.Question.create(req.body,{transaction : t});
				await t.commit();
				res.json(question);
			}
			catch(err)
			{
				console.log(err);
				await t.rollback();
				res.status(500).send(utils.messages.serverError);
			}
		}
		else
			res.sendStatus(401);
	},

	//////////////////////////////////////////////////////////

	updateQuestion : async (req, res) =>
	{
		if(utils.verifToken(req.headers['authorization']))
		{
			let t = await db.sequelize.transaction();
			try
			{
				let question = await db.Question.findByPk(req.params.id);
				await question.update(req.body,{transaction : t});
				await t.commit();
				res.status(200).send(question);
			}

			catch(err)
			{
				console.log(err);
				await t.rollback();
				res.status(500).send(utils.messages.serverError);
			}
		}
		else
			res.sendStatus(401);
	}
};
