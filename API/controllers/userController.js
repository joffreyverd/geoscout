/* eslint-disable no-undef */
/* eslint-disable no-console */

const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./configUser');
const utils = require('./utils');
module.exports = 
{
	//////////////////////////////////////////////////////////

	createUser : async (req,res) => 
	{
		let t = await db.sequelize.transaction();
		try
		{
			let user = await db.User.create(
				{
					'email' : req.body.email,
					'password' : await bcrypt.hash(req.body.password, 12),
					'firstname' : req.body.firstname,
					'lastname' : req.body.lastname,
					'picture' : req.body.picture
				},{transaction : t});

			await t.commit();
			res.status(201).send({token :jwt.sign({id_user: user.id_user}, config.secret, {expiresIn: 86400}),user : user});
		}

		catch(err)
		{
			console.log(err);
			await t.rollback();
			res.status(500).send(utils.messages.serverError);
		}
	},

	updateUser : async (req,res) =>
	{
		if(utils.verifToken(req.headers['authorization']))
		{
			let t = await db.sequelize.transaction();
			try
			{
				let user = await db.User.findOne({where : {email : req.body.email}});
				
				user.email = req.body.email;
				user.password = await bcrypt.hash(req.body.password, 12);
				user.firstname = req.body.firstname;
				user.lastname = req.body.lastname;
				await user.save({transaction : t});
				await t.commit();
				res.sendStatus(204);
			}

			catch(err)
			{
				console.log(err);
				await t.rollback();
				res.status(500).send(utils.messages.serverError);
			}
		}

		else
			return res.status(401).send(utils.messages.invalidToken);
		
	},

	login : async (req,res) =>
	{
		try
		{
			let user = await db.User.findOne({where : {email : req.body.email}});

			if(await bcrypt.compare(req.body.password,user.password))
			{
				let token = jwt.sign({id_user: user.id_user}, config.secret, {expiresIn: 86400});
				res.status(200).send({ auth: true, token: token,User : {firstname : user.firstname,lastname : user.lastname, id_user : user.id_user}});
			}

			else
				res.status(401).send(utils.messages.incorrectPassword);
		}

		catch(err)
		{
			res.status(500).send(utils.messages.serverError);
		}
	},

	whoami : async (req,res) =>
	{
		try
		{
			let token = req.headers['authorization'];
			if (!token) 
				return res.status(401).send(utils.messages.invalidToken);
			await jwt.verify(token.split(' ')[1], config.secret, async (err, decoded) =>
			{
				if (err) 
					return res.status(401).send(utils.messages.invalidToken);
				else
					res.status(200).send(await db.User.findByPk(decoded.id_user));	
			});
		}

		catch(err)
		{
			console.log(err);
			res.status(500).send(utils.messages.serverError);
		}
		
	},

	//////////////////////////////////////////////////////////

	downloadUser : async (req,res) =>
	{
		try
		{
			if(utils.verifToken(req.headers['authorization']))
			{
				res.status(200).send(await b.User.findByPk(req.params.id_user,
					{
						attributes : ['id_user','firstname','lastname','picture','email'],
						include : 
						[
							{
								model : db.Circuit,
								attributes : ['id_circuit','name','description']
							},
							{
								model : db.Evaluation
							},
							{ 
								model: db.User,
								as: 'Relations',
								attributes : ['id_user','firstname','lastname','picture','email'],
							}
						]
					}));
			}

			else
				res.status(401).send(utils.messages.invalidToken);
		}

		catch(err)
		{
			console.log(err);
			res.status(500).send(utils.messages.serverError);
		}
	},

	//////////////////////////////////////////////////////////
	
	listRelations : async (req,res) => 
	{
		try
		{
			let id_user = utils.verifToken(req.headers['authorization']);
			if(id_user)
			{
				let user = await db.User.findOne({where : {id_user: id_user}});
				res.status(200).send(await user.getRelations({attributes : ['id_user','firstname','lastname']}));
			}
			else
				res.status(401).send(utils.messages.invalidToken);
		}

		catch(err)
		{
			console.log(err);
			res.status(500).send(utils.messages.serverError);
		}
	},

	//////////////////////////////////////////////////////////

	askRelation : async (req,res) => 
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			let t = await db.sequelize.transaction();
			try
			{
				if(id_user !== req.params.id_user)
				{
					let user = await db.User.findByPk(id_user);
					let friend = await db.User.findByPk(req.params.id_user);
					let relations_user = await user.getRelations({where : {id_user : req.params.id_user}});
					if(!friend || relations_user)
						throw 'Error';
					await user.addRelation(friend.id_user,{through : {status : '0', last_action_user_id: user.id_user }},{transaction : t});
					await friend.addRelation(user,{through : {status : '0',last_action_user_id: user.id_user}},{transaction : t});
					await t.commit();
					res.sendStatus(204);	
				}

				else
					res.sendStatus(403);
				
			}
			
			catch(err)
			{
				console.log(err);
				await t.commit();
				res.status(500).send(utils.messages.serverError);
			}

		}
		else
			res.status(401).send(utils.messages.invalidToken); 
		
	},

	//////////////////////////////////////////////////////////


	answerRelation : async (req,res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			let t = await db.sequelize.transaction();
			try
			{	
				let rel = await db.Relation.findOne({where : {RelationIdUser : id_user}});
				if(req.params.accepted)
				{
					rel.status = 1;
					await rel.save({transaction : t});
					await t.commit();
				}

				else
				{
					await rel.destroy({transaction : t});
					await t.commit();
				}
					
				res.sendStatus(204);
			}

			catch(err)
			{
				console.log(err);
				await t.rollback();
			}
		}

		else
			res.status(401).send(utils.messages.invalidToken); 
	},

	getFavorites : async (req,res) =>
	{
		try 
		{
			let id_user = utils.verifToken(req.headers['authorization']);
			if(id_user)
			{
				let users = await db.Favorite.findAll(
					{
						attributes : [],
						where : {id_user : id_user},
						include : 
						[
							{
								model : db.Circuit,
								attributes : ['id_circuit','name' ,'description','length','duration','need_internet','published','version','level']		
							}
						]
					});
				res.status(200).send(users);
			}

			else
				res.status(401).send(utils.messages.invalidToken);
		} 
		
		catch(err)
		{
			console.log(error);
		}
	},

	setFavorite : async (req,res) =>
	{
		let t = await db.sequelize.transaction();
		try
		{
			let id_user = utils.verifToken(req.headers['authorization']);
			if(id_user)
			{
				
				await db.Favorite.create({id_user : id_user, id_circuit : req.params.id_circuit,transaction : t});
				await t.commit();
				res.sendStatus(201);
			}

			else
				res.status(401).send(utils.messages.invalidToken);
		}

		catch(err)
		{
			await t.rollback();
			console.log(err);
			res.status(500).send(utils.messages.serverError);
		}
	}
};
