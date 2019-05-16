/* eslint-disable no-undef */
/* eslint-disable no-console */
'use strict';
const db = require('../models');
const utils = require('./utils');
module.exports=
{
	createAchievement: async (req,res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if (id_user)
		{
			let t = await db.sequelize.transaction();
			try
			{
				let achievement = await db.AchievedCircuit.create(
					{
						score: req.body.score,
						max_score : req.body.max_score,
						statut_circuit : req.body.statut_circuit,
						version: req.body.version,
						achievedDate: Date.now(),
						achievedTime: req.body.achievedTime,
						id_user: id_user,
						id_circuit: req.body.id_circuit,    
						id_step: req.body.id_step
					},{transaction : t});
				t.commit();
				res.status(200).send(achievement);
			}

			catch(err)
			{
				await t.rollback();
				res.status(500).send(utils.messages.serverError);
				console.log(err);
			}
		}
		else
		{
			res.status(401).send(utils.messages.invalidToken);
		}
	},

	//////////////////////////////////////////////////////////

	deleteAchievement: async (req,res) =>
	{
		if (utils.verifToken(req.headers['authorization']))
		{
			let t = await db.sequelize.transaction();
			try
			{
				await db.AchievedCircuit.destroy({where : {id_achievement : req.params.id_achievement}},{transaction : t});
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
	},

	//////////////////////////////////////////////////////////

	getAchievements: async (req,res) =>
	{
		let id = utils.verifToken(req.headers['authorization']);
		if (id)
		{
			try
			{
				let achievements = await  db.AchievedCircuit.findAll({where : {id_user : id}});
				res.status(200).send(achievements);
			}

			catch(err)
			{
				res.status(500).send(utils.messages.serverError);
				console.log(err);
			}
		}
		else
			res.status(401).send(utils.messages.invalidToken);
	}
};
