'use_strict';
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./configUser');
const utils = require('./utils')
module.exports = 
{
    //////////////////////////////////////////////////////////

    createUser : (req,res,next) => 
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
            return  token = jwt.sign({id_user: user.id_user}, config.secret, {expiresIn: 86400});
        })
        res.status(201).send({ auth: true, token: token,User : {firstname : user.firstname,lastname : user.lastname, id_user : user.id_user}})
        .catch(err => res.status(500).send({message : 'Une erreur est survenue lors de la création de votre compte'}))
    },

    login : (req,res,next) =>
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
                    res.status(401).send({auth : false,message:'Mot de passe incorrect'})
            })
        })
        .catch(err => res.status(500).send({message : 'Une erreur interne est survenue'}))
    },

    whoami : (req,res,next) =>
    {
        let token = req.headers['authorization'];
        if (!token) 
            return res.status(401).send({ auth: false, message: 'Vous n\'avez pas fourni vos informations de connexion !'});
        let id = jwt.verify(token.split(' ')[1], config.secret, (err, decoded) =>
        {
            if (err) return res.status(401).send({ auth: false, message: 'Informations' });
            else
            {
                db.User.findByPk(decoded.id_user,{attributes : ['firstname','lastname','id_user']})
                .then(User => res.status(200).send(User))
            }
        });
    },

    //////////////////////////////////////////////////////////

    listRelations : (req,res,next) => 
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            console.log(id_user)
            db.User.findOne(
            {
                where : {id_user: id_user},
            })
            .then(user =>
            {
                return user.getRelations({attributes : ['id_user','firstname','lastname']})
            })
            .then((relations) => res.status(200).json(relations))
            .catch((err) => {if(err) res.sendStatus(500)});
        }

        else
            res.sendStatus(401);
        
    },

    //////////////////////////////////////////////////////////

    askRelation : (req,res,next) => 
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.User.findByPk(req.body.friend)
            .then(friend =>
            {
                if(!friend)
                    throw 'Error'
                db.User.findByPk(id_user).then(user => {user.addRelation(friend,{through : {status : '0'}}); return user})
                .then(user => friend.addRelation(user,{through : {status : '0'}}))
            })
            .then(() => res.status(201).send(friend))
            .catch((err) => {if(err) res.sendStatus(500)});
        }
        else
            res.sendStatus(401);
    },

    //////////////////////////////////////////////////////////

    answerRelation : (req,res,next) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.User.findByPk(id_user)
            .then(user =>
            {
                db.user.getRelations()
            })
            .then(() => res.sendStatus(200))
            .catch((err) => {if(err) res.sendStatus(500)});
        }
        else
            res.sendStatus(401);
    }
}
