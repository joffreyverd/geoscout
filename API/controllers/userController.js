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
                id_user: req.body.id_user
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
                id_user : req.body.friend
            }
        })
        .then(friend =>
        {
            db.User.findOne({
                where : {
                    id_user : req.body.id_user
                }
            })
            .then(user =>
            {
                user.addRelation(friend,{
                    through : {
                        status : '1'
                    }
                });
            });
        })
        .then(() => res.sendStatus(200));
    }
}
