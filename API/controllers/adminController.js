/* eslint-disable no-undef */
/* eslint-disable no-console */

const db = require('../models');
const utils = require('./utils');

module.exports=
{
	circuitsAdmin : async (req,res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			try
			{
				if(await utils.isAdmin(id_user,db))
				{
					let circuits = await db.Circuit.findAll(
						{
							where : {published : true},
							attributes : ['id_circuit','name','version','id_user','blocked','createdAt'],
							include : 
							[
								{
									model : db.Evaluation
								},
								{
									model : db.User,
									attributes : ['lastname','firstname']
								}
							]
						}); //datestamp du circuit / firstname et lastname de l'auteur
					
					res.json(utils.averageStars(circuits));
				}

				else
					res.sendStatus(403);
			}

			catch(err)
			{
				console.log(err);
				res.status(500).send(utils.messages.serverError);
			}
		}
	},

	blockCircuit : async (req,res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			let t = await db.sequelize.transaction();
			try
			{
				if(await utils.isAdmin(id_user,db))
				{
					let circuit = await db.Circuit.findByPk(req.params.id_circuit);
					circuit.blocked = !circuit.blocked;
					await circuit.save({transaction : t});
					await t.commit();
					res.sendStatus(204);
				}

				else
					res.sendStatus(403);
			}

			catch(err)
			{
				console.log(err);
				await t.rollback();
				res.status(500).send(utils.messages.serverError);
			}
		}
	}
};