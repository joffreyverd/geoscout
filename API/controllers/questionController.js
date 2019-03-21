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
            db.Question.findByPk(req.params.id_question,{attributes : ['id_question','wording','points','response']})
            
            .then(questions => res.status(200).json(questions))
            .catch((err) => {if(err) {console.log(err);res.sendStatus(500)}})
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    //////////////////////////////////////////////////////////

    createQuestion : (req, res, next) =>
    {
        if(utils.verifToken(req.headers['authorization']))
        {
            db.Question.create(req.body)
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
