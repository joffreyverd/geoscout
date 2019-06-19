/* eslint-disable valid-jsdoc */
/* eslint-disable no-undef */
/* eslint-disable no-console */
'use strict';
const db = require('../models');
const utils = require('./utils');

/** 
Ce module regroupe toutes les méthodes sur les achievedcircuit, c'est-à-dire les circuits terminés, mais en pause ou abandonné par les utilisateurs
*/
module.exports=
{	
	/**
	Cette fonction permet de créer un achievedcircuit. Pour cette fonction et toutes les autres dans ce fichier.
	On teste d'abord le token envoyé par l'utilisateur pour vérifier s'il est connecté au moment de l'appel.
	S'il est n'est pas connecté, a renvoit une erreur avec le code 401. en cas d'erreur on renvoit un code 500,
	sinon on renvoie un code 200 avec l'objet créé.

	@param {int} req.body.score le score actuel de l'utilisateur
	@param {int} req.body.max.score le score max du circuit
	@param {Tinyint} req.body.statut_circuit le statut du circuit -> 0 = en pause / 1 = terminé / 2 = abandonnée
	@param {TinyInt} req.body.version quel est la version du circuit
	@param {TinyInt} req.body.achievedtime le temps écoulé depuis le début du circuit en minutes
	@param {int} req.body.id_circuit l'id du circuit
	@param {int} req.body.id_step en cas de pause, l'id de l'étape à laquelle on s'est arrêté 	
	*/
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
	/**
	Cette fonction supprime un achievedCircuit dont l'id est dans l'url

	@param {int} req.params.id_achievement l'id de l'achieved circuit que l'on veut supprimer
	*/
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
	/**
	Cette fonction renvoie tous les achievedCircuits pour l'utilisateur en cours
	*/
	getAchievements: async (req,res) =>
	{
		let id = utils.verifToken(req.headers['authorization']);
		let achieved = null;
		if (id)
		{
			try
			{
				if (req.query.statut == null || req.query.statut == '')
				{
					achieved = await db.AchievedCircuit.findAll(
						{
							where : {id_user : id},
							include : 
							[
								{
									model : db.Circuit,
									where : {blocked : 0,published : true},
									include : 
									[
										{
											model : db.Evaluation
										}
									]
								}
							]
						}
					);
				}
				else
				{
					achieved = await db.AchievedCircuit.findAll(
						{
							where : {id_user : id, statut_circuit : req.query.statut},
							include : 
							[
								{
									model : db.Circuit,
									where : {blocked : 0,published : true},
									include : 
									[
										{
											model : db.Evaluation
										}
									]
								}
							]
						}
					);
				}

				achieved.map(item => 
				{
					return item.Circuit = utils.averageStars(item.Circuit);
				});

				res.status(200).send(achieved);
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
	/**
	Cette fonction renvoie tous les achievedCircuits pour l'utilisateur en cours et le circuit renseigné
	*/
	getAchievementsByCircuit: async (req,res) =>
	{
		let id = utils.verifToken(req.headers['authorization']);
		let achieved = null;
		if (id)
		{
			try
			{
				if (req.query.statut == null || req.query.statut == '')
				{
					achieved = await db.AchievedCircuit.findAll(
						{
							where : {id_user : id, statut_circuit : 0},
							include : 
							[
								{
									model : db.Circuit,
									where : {blocked : 0, published : true, id_circuit : req.params.id_circuit},
									include : 
									[
										{
											model : db.Evaluation
										}
									]
								}
							]
						}
					);
				}
				else
				{
					achieved = await db.AchievedCircuit.findAll(
						{
							where : {id_user : id, statut_circuit : req.query.statut},
							include : 
							[
								{
									model : db.Circuit,
									where : {blocked : 0, published : true, id_circuit : req.params.id_circuit},
									include : 
									[
										{
											model : db.Evaluation
										}
									]
								}
							]
						}
					);
				}

				achieved.map(item => 
				{
					return item.Circuit = utils.averageStars(item.Circuit);
				});

				res.status(200).send(achieved);
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
	/**
	Cette fonction permet de modifier un AchievedCircuit créé.

	@param {int} req.body.score le score actuel de l'utilisateur
	@param {int} req.body.max.score le score max du circuit
	@param {Tinyint} req.body.statut_circuit le statut du circuit -> 0 = en pause / 1 = terminé / 2 = abandonnée
	@param {TinyInt} req.body.version quel est la version du circuit
	@param {TinyInt} req.body.achievedtime le temps écoulé depuis le début du circuit en minutes
	@param {int} req.body.id_circuit l'id du circuit
	@param {int} req.body.id_step en cas de pause, l'id de l'étape à laquelle on s'est arrêté 	

	*/
	updateAchievement: async (req,res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if (id_user)
		{
			let t = await db.sequelize.transaction();
			try 
			{
				let achievement = await db.AchievedCircuit.findByPk(req.params.id_achievement);
				if(achievement.id_user === id_user)
				{
					await achievement.update(req.body,{transaction : t});
					await t.commit();
					res.status(200).send(achievement);
				}
				else
				{
					res.sendStatus(403);
					await t.rollback();
				}
			} 
			
			catch (err) 
			{
				console.log(err);
				await t.rollback();
				res.status(500).send(utils.messages.serverError);
			}
		}
	}
};
