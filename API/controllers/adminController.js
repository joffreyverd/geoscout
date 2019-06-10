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
							attributes : ['id_circuit','name','published','version','id_user','blocked'],
							include : 
							[
								{
									model : db.Evaluation
								}
							]
						});
					
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
			try
			{
				if(await utils.isAdmin(id_user,db))
				{
					let circuit = await db.Circuit.findByPk(req.params.id_circuit);
					circuit.blocked = true;
					await circuit.update();
					res.sendStatus(201);
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
	}
};