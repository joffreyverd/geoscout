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
				let dest = '';
				let fileNumber = await utils.getFiles(req.body.type,req.body.id);
				fileNumber = fileNumber.length + 1;
				if(req.body.type === 'user')
				{
					if(id_user === req.body.id)
					{
						dest = utils.root() + '/images/users/' + req.body.id + '/';
						await fs.rename(utils.root() + '/images/awaiting/'+req.file.filename, dest + fileNumber + '.' + req.file.originalname.split('.')[1],(a) => {console.log(a);});
						res.sendStatus(201);
					}

					else
						res.sendStatus(403);
						
				}
					
				else if(req.body.type === 'circuit')
				{
					let circuitOk = await utils.ownCircuit(id_user,req.body.id);
					if(circuitOk)
					{
						dest = utils.root() + '/images/circuits/' + req.body.id + '/';
						await fs.rename(utils.root() + '/images/awaiting/'+req.file.filename, dest + fileNumber + '.' + req.file.originalname.split('.')[1],(a) => {console.log(a);});
						res.sendStatus(201);
					}
						
					else
						res.sendStatus(403);
				}
			}

			catch(err)
			{
				res.status(500).send(utils.messages.serverError);
			}
			
		}

		else
			res.status(401).send(utils.messages.invalidToken);	
	}
};