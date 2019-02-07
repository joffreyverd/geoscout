'use_strict';
const db = require('../models')

module.exports = 
{
    //********************** USER **********************//

    listUser : (req,res,next) => 
    {
        db.User.findAll()
        .then((user) => res.json(user));
    },

    createUser : (req,res,next) => 
    {
        db.User.create(
        {
            "email" : req.body.email,
            "password" : req.body.password,
            "firstname" : req.body.firstname,
            "lastname" : req.body.lastname,
            "picture" : req.body.picture
        })
        .then((user) => res.json(user));
    },

    //********************** RELATION **********************//

    listRelations : (req,res,next) => 
    {
        db.User.findOne(
        {
            where : {
                id_user: req.body.user_id
            },
        })
        .then(user =>
        {
            return user.getRelations()
        })
        .then((relations) => res.json(relations));
    },

    askRelation : (req,res,next) => 
    {
        db.User.findOne({
            where : {
                id_user : req.body.ami_id
            }
        })
        .then(ami =>
        {
            db.User.findOne({
                where : {
                    id_user : req.body.user_id
                }
            })
            .then(user =>
            {
                user.askRelation(ami,{
                    through : {
                        status : '1'
                    }
                });
            });
        })
        .then((user) => res.json(user));
    }
}
