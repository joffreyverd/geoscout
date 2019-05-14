
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./configUser');
const utils = require('./utils')
module.exports = 
{
	//////////////////////////////////////////////////////////

	createUser : (req,res) => 
	{
		db.User.create(
		{
			'email' : req.body.email,
			'password' : bcrypt.hashSync(req.body.password, 12),
			'firstname' : req.body.firstname,
			'lastname' : req.body.lastname,
			'picture' : req.body.picture
		})
		.then((user) =>
		{
			return res.status(201).send({token :jwt.sign({id_user: user.id_user}, config.secret, {expiresIn: 86400}),user : user});
		})
		.catch(err => res.status(500).send(utils.messages.serverError))  
	},

	updateUser : (req,res) =>
	{
		db.User.findOne({where : {email : req.body.email}})
		.then((user) => 
		{
			db.sequelize.transaction(t =>
			{
				user.email = req.body.email;
				user.password = bcrypt.hashSync(req.body.password, 12);
				user.firstname = req.body.firstname;
				user.lastname = req.body.lastname;
				user.save({transaction : t})
				.then(res.sendStatus(204));
			})
		})
		.catch((err) => res.status(500).send(utils.messages.serverError));
	},

	login : (req,res) =>
	{
		db.User.findOne({where : {email : req.body.email}})
		.then((user) => 
		{
			let token = null;
			bcrypt.compare(req.body.password,user.password)
			.then((obj) =>
			{
				if(obj)
				{
					token = jwt.sign({id_user: user.id_user}, config.secret, {expiresIn: 86400});
					res.status(200).send({ auth: true, token: token,User : {firstname : user.firstname,lastname : user.lastname, id_user : user.id_user}});
				}
					
				else
					res.status(401).send(utils.messages.incorrectPassword);
			})
		})
		.catch((err) => res.status(500).send(utils.messages.serverError));
	},

	whoami : (req,res) =>
	{
		let token = req.headers['authorization'];
		if (!token) 
			return res.status(401).send(utils.messages.invalidToken);
		jwt.verify(token.split(' ')[1], config.secret, (err, decoded) =>
		{
			if (err) return res.status(401).send(utils.messages.invalidToken);
			else
			{
				db.User.findByPk(decoded.id_user)
				.then(User => res.status(200).send(User))
			}
		});
	},

	//////////////////////////////////////////////////////////

	downloadUser : (req,res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			db.User.findByPk(req.params.id_user,
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
			})
			.then(user => 
			{
				res.status(200).send(user)
			})
		}

		else
			res.status(401).send(utils.messages.invalidToken);
	},

	//////////////////////////////////////////////////////////
	
	listRelations : (req,res) => 
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			db.User.findOne(
			{
				where : {id_user: id_user},
			})
			.then(user =>
			{
				return user.getRelations({attributes : ['id_user','firstname','lastname']})
			})
			.then((relations) => res.status(200).send(relations))
			.catch((err) => {if(err) res.status(500).send(utils.messages.serverError)});
		}
		else
			res.status(401).send(utils.messages.invalidToken);
	},

	//////////////////////////////////////////////////////////

	askRelation : (req,res) => 
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			console.log(id_user + ' ' + req.params.id_user)
			if(id_user !== req.params.id_user)
			{
				db.User.findByPk(req.params.id_user)
				.then(friend =>
				{
					if(!friend)
						throw 'Error'
					db.User.findByPk(id_user).then(user => 
					{
						user.getRelations({where : {id_user : req.params.id_user}})
						.then(rels =>
						{
							if(!rels.length)
							{
								user.addRelation(friend.id_user,{through : {status : '0', last_action_user_id: user.id_user }})
								.then(user => friend.addRelation(user,{through : {status : '0',last_action_user_id: user.id_user}}))
							}
								
							else 
								throw '';
						});
					})
					.then()
					.catch(err => console.log(err))
				})
				.then(() => res.sendStatus(204))
				.catch((err) => {console.log(err)});
			}

			else
				res.sendStatus(403)
		}
		else
			res.status(401).send(utils.messages.invalidToken); 
	},

	//////////////////////////////////////////////////////////

	testRel : (req,res,next) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			db.User.findByPk(id_user)
			.then(user =>user.getRelations({where : {id_user : 37},attributes : ['id_user','firstname','lastname']}))
			.then(rels => console.log(JSON.stringify(rels)))
		}
	},

	answerRelation : (req,res) =>
	{
		let id_user = utils.verifToken(req.headers['authorization']);
		if(id_user)
		{
			db.User.findByPk(id_user)
			.then(() =>
			{
				db.Relation.findOne({where : {RelationIdUser : 37}})
				.then(rel =>
				{
					if(req.params.accepted)
					{
						db.sequelize.transaction(t =>
						{
							rel.status = 1;
							rel.save({transaction : t});
						});
					}

					else
					{
						db.sequelize.transaction(t =>
						{
							rel.destroy({transaction : t});
						});
					}	
				});
			})
			
			.then(() => res.sendStatus(204))
			.catch((err) => {console.log(err)});
		}
		else
			res.status(401).send(utils.messages.invalidToken); 
	}
}
