'use_strict';
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./configUser');

module.exports = 
{
    //////////////////////////////////////////////////////////
    
    listUser : (req,res,next) => 
    {
        db.User.findAll()
        .then((user) => res.json(user));
    },

    //////////////////////////////////////////////////////////

    createUser : (req,res,next) => 
    {
        let hashedPassword = bcrypt.hashSync(req.body.password, 12);
        db.User.create(
        {
            "email" : req.body.email,
            "password" : hashedPassword,
            "firstname" : req.body.firstname,
            "lastname" : req.body.lastname,
            "picture" : req.body.picture
        })
        .then((user) =>
        {
            return  token = jwt.sign({id_user: user.id_user}, config.secret, {expiresIn: 86400});
        })
        .then(token => res.status(200).send({ auth: true, token: token }))
        .catch(err => res.status(500).send({message : "Une erreur est survenue lors de la création de votre compte"}))
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
                    res.status(200).send({ auth: true, token: token });
                }
                    
                else
                    res.status(401).send({auth : false,message:'Mot de passe incorrect'})
            })
        })
        .catch(err => res.status(401).send({message : "Identifiant incorrect"}))
    },

    whoami : (req,res,next) =>
    {
        let token = req.headers['authorization'];
        if (!token) 
            return res.status(401).send({ auth: false, message: 'Vous n\'avez pas fourni vos informations de connexion !'});
        let id = jwt.verify(token.split(' ')[1], config.secret, (err, decoded) =>
        {
            if (err) return res.status(401).send({ auth: false, message: 'Informations' });
            else return res.sendStatus(200)
        });
    },

    //////////////////////////////////////////////////////////

    listRelations : (req,res,next) => 
    {
        db.User.findOne(
        {
            where : {id_user: req.body.id_user},
        })
        .then(user =>
        {
            return user.getRelations()
        })
        .then((relations) => res.json(relations));
    },

    //////////////////////////////////////////////////////////

    askRelation : (req,res,next) => 
    {
        db.User.findOne({where : {id_user : req.body.friend}})
        .then(friend =>
        {
            db.User.findOne({where : {id_user : req.body.id_user}})
            .then(user => {user.addRelation(friend,{through : {status : '1'}})});
        })
        .then(() => res.sendStatus(200));
    }
}
