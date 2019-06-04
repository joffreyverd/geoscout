/* eslint-disable no-console */
/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const config = require('./configUser');
const db = require('../models');
const fse = require('fs-extra');
const path = require('path');
module.exports = 
{
	verifToken : (token) =>
	{
		if(token)
		{
			let id = jwt.verify(token.split(' ')[1], config.secret, (err, decoded) =>
			{
				if (err) return null;
				else return decoded.id_user;
			});

			return id;

		}
		else
			return null;
	},

	ownCircuit : async (id_user,id_circuit) =>
	{
		try
		{
			let circuit = await db.Circuit.findByPk(id_circuit);
			if(circuit.id_user === id_user)	
				return true;
			else
				return false;
		}

		catch(err)
		{
			console.log(err);
		}
		
	},

	distanceBetweenPoints : (lat1,lat2,lon1,lon2) =>
	{
		let R = 6371; // km
		let x1 = lat2 - lat1;
		let dLat = Math.radians(x1);
		let x2 = lon2 - lon1;
		let dLon = Math.radians(x2);
		let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(Math.radians(lat1)) * Math.cos(Math.radians(lat2)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2);
		let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return Math.round(R * c);
	},

	evaluateDistance : async (id_circuit) =>
	{
		let t = await db.sequelize.transaction();
		try
		{
			let circuit = await db.Circuit.findOne({where : {id_circuit:id_circuit},include :[{model : db.Step}]});
			let lat = circuit.Steps[0].latitude;
			let lon = circuit.Steps[0].longitude;
			let dist = 0;
			circuit.Steps.map(step => 
			{
				dist+= module.exports.distanceBetweenPoints(lat,step.latitude,lon,step.longitude);
			});

			circuit.length = dist;
			await circuit.save({transaction: t});
			await t.commit();	
		}

		catch(err)
		{
			console.log(err);
			t.rollback();
		}
		
	},

	messages : 
	{
		serverError : 'Il y a eu un problème avec le serveur',
		incorrectPassword : 'Le mot de passe est incorrect',
		invalidToken : 'Vous n\'avez pas fourni vos informations de connexion'
	},

	///////////////////////////////////////////////////////////////////////

	root : () => 
	{
		return path.join(path.dirname(process.execPath));
	},

	getFiles : async (type,id) =>
	{
		if(type === 'user')
		{
			try
			{
				let files = await fse.readdir(module.exports.root() + '/images/users/' + id + '/');
				return files.map(file =>
				{
					return '/images/users/' + id  + '/' + file;
				});
			}

			catch(err)
			{
				console.log(err);
			}
		}

		else if(type === 'circuit')
		{
			try
			{
				let files = await fse.readdir(module.exports.root() + '/images/circuits/' + id + '/');
				return files.map(file =>
				{
					return '/images/circuits/' + id  + '/' + file;
				});
			}

			catch(err)
			{
				console.log(err);
			}
		}
	},

	createFolder : async (name,type) =>  
	{
		let p = '';
		if(type === 1)
			p =  module.exports.root() + '/images/circuits';
		else
			p = module.exports.root() + '/images/users';

		try
		{
			await fse.mkdir(p+'/'+name);
		}

		catch (err)
		{
			console.log(err);
		}
	},
};

Math.radians = function(degrees) 
{
	return degrees * Math.PI / 180;
};
   
Math.degrees = function(radians) 
{
	return radians * 180 / Math.PI;
};