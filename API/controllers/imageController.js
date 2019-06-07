/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable no-console */

const utils = require('./utils');
const fs = require('fs-extra');
//const path = require('path');
module.exports = 
{
	download :async (req,res) =>
	{
		try
		{
			res.json(await utils.getFiles(req.body.type,req.body.id));
		}
		catch(err)
		{
			res.status(500).send(utils.messages.serverError);
		}
		
	},

	upload : async (req,res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			try
			{
				let dest = utils.root() + '/images/users/' + req.body.id + '/';
				let fileExist = await utils.getFiles(req.body.type,req.body.id);
				
				if(req.body.type === 'user')
				{
					if(id_user === parseInt(req.body.id))
					{
						
						if(fileExist[0])
						{
							let split = fileExist[0].split('/');
							await fs.unlink(dest + split[split.length -1]);
						}
						
						await fs.rename(utils.root() + '/images/awaiting/'+req.files[0].filename, dest + 'user.' + req.files[0].originalname.split('.')[1],(a) => {console.log(a);});
						res.sendStatus(201);
					}

					else
						res.sendStatus(403);
						
				}
					
				else if(req.body.type === 'circuit')
				{
					let circuitOk = await utils.ownCircuit(id_user,req.body.id,require('../models'));
					if(circuitOk)
					{
						//console.log(req.files);
						dest = utils.root() + '/images/circuits/' + req.body.id + '/';
						req.files.map(async (file,i) =>
						{
							await fs.rename(utils.root() + '/images/awaiting/'+ file.filename, dest + i + '.' + file.originalname.split('.')[1],(a) => {console.log(a);});
						});

						res.sendStatus(201);
					}
						
					else
						res.sendStatus(403);
				}
			}

			catch(err)
			{
				console.log(err);
				res.status(500).send(utils.messages.serverError);
			}
			
		}

		else
			res.status(401).send(utils.messages.invalidToken);	
	}
};