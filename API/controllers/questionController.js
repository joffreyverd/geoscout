'use_strict';
const db = require('../models')
const utils = require('./utils');
module.exports = 
{
    question : (req,res,next) => 
    {
        db.Question.findAll()
        .then((question) => res.json(question));
    },

    //////////////////////////////////////////////////////////

    getQuestion : (req, res, next) =>
    {
        if(utils.verifToken(req.headers['authorization']))
        {
            db.Question.findByPk(req.params.id_question,{attributes : ['id_question','wording','points']})
            
            .then(questions => res.status(200).json(questions))
            .catch((err) => {if(err) {console.log(err);res.sendStatus(500)}})
        }
        else
            res.sendStatus(401);
    },

    //////////////////////////////////////////////////////////

    createQuestion : (req, res, next) =>
    {
        if(utils.verifToken(req.headers['authorization']))
        {
            db.Question.create(
            {
                wording : req.body.wording,
                response : req.body.response,
                type_of : req.body.type_of,
                points : req.body.points,
                level : req.body.level
            })
            .then((question) =>
            {
                if(question)
                    res.status(201).send(question)
                else
                    throw "err"
            })
            .catch((err) => {if(err) res.sendStatus(500)})
        }
        else
            res.sendStatus(401);
    },

    //////////////////////////////////////////////////////////

    updateQuestion : (req, res, next) =>
    {
        if(utils.verifToken(req.headers['authorization']))
        {
            db.Question.findByPk(req.params.id).then(question => {
                question.update(req.body).then(() => res.status(200).send(question));
            }).catch(() => {res.sendStatus(500)})
        }
        else
            res.sendStatus(401);
    }
}
