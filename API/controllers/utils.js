/* eslint-disable no-console */
/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const config = require('./configUser');
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

	ownCircuit : async (id_user,id_circuit,db) =>
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

	ownStep : async (id_user,id_step,db) =>
	{
		try
		{
			let step = await db.Step.findByPk(id_step);
			if(module.exports.ownCircuit(id_user,step.id_circuit,db))
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
		return (R * c);
	},

	evaluateDistance : async (id_circuit,db) =>
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
				console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////');
				console.log(dist)
				console.log('//////////////////////////////////////////////////////////////////////////////////////////////////////////////');
				dist+= parseFloat(module.exports.distanceBetweenPoints(lat,step.latitude,lon,step.longitude));
				console.log(dist)
			});
			

			circuit.length = dist.toFixed(2);
			circuit.duration = Math.round((dist / 5) * 60);
			await circuit.save({transaction: t});
			await t.commit();	
		}

		catch(err)
		{
			console.log(err);
			t.rollback();
		}
		
	},

	countStars : (circuit) =>
	{
		let count = 0;
		let note = 0;
		note = 0;
		count = 0;

		if(circuit.Evaluations.length)
		{
			circuit.Evaluations.map(evaluation =>
			{
				note+= evaluation.stars;
				count++;
			});

			circuit.Evaluations = [];

			circuit.avgStars = Math.round( (note / count) * 10 ) / 10;
		}
			
		else
			circuit.avgStars = 0;

		return circuit;
	},

	averageStars : (circuits) =>
	{
		if(circuits instanceof Array)
		{
			return circuits.map((circuit) => 
			{
				if(circuit)
				{
					return module.exports.countStars(circuit);
				}     
			});
		}

		else
			return module.exports.countStars(circuits);	
	},

	messages : 
	{
		serverError : 'Il y a eu un problème avec le serveur',
		incorrectUserName : 'Le nom d\'utilisateur est inconnu',
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
		try
		{	
			if(type === 'user')
			{
				let files = await fse.readdir(module.exports.root() + '/images/users/' + id + '/');
				return files.map(file =>
				{
					return '/users/' + id  + '/' + file;
				});
			}

			else if(type === 'circuit')
			{
				let files = await fse.readdir(module.exports.root() + '/images/circuits/' + id + '/');
				return files.map(file =>
				{
					return '/circuits/' + id  + '/' + file;
				});
			}

			else
			{
				let files = await fse.readdir(module.exports.root() + '/images/steps/' + id + '/');
				return files.map(file =>
				{
					return '/steps/' + id  + '/' + file;
				});
			}
		}

		catch(err)
		{
			console.log(err);
			return [];
		}

	},

	createFolder : async (name,type) =>  
	{
		let p = '';
		if(type === 1)
			p =  module.exports.root() + '/images/circuits';
		else if (type === 0)
			p = module.exports.root() + '/images/users';
		else
			p = module.exports.root() + '/images/steps';

		try
		{
			await fse.mkdir(p+'/'+name);
		}

		catch (err)
		{
			if(err.code === 'EPERM')
				console.log('Droits insufisants');
			else if (err.code === 'EEXIST')
				console.log('Le dossier existe déjà');
		}
	},

	isAdmin : async (id_user,db) =>
	{
		let user = await db.User.findByPk(id_user);
		if(user.is_admin)
			return true;
		else
			return false;
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