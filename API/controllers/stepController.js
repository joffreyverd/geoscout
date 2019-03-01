'use_strict';
const db = require('../models')
const utils = require('./utils');

module.exports = 
{
    step : (req,res,next) => 
    {
        db.Step.findAll({where : {CircuitIdCircuit : req.body.id_circuit}})
        .then((step) => res.json(step));
    },

    //////////////////////////////////////////////////////////

    createStep : (req,res,next) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Step.count({where : {id_circuit : req.body.id_circuit}})
            .then(count =>
            {
                console.log(count)
                db.Step.create(
                {
                    name : req.body.name,
                    latitude : req.body.latitude,
                    longitude : req.body.longitude,
                    description : req.body.description,
                    order : count +1,
                    instruction : req.body.instruction,
                    id_circuit : req.body.id_circuit
                })
                .then(res.sendStatus(201))
            })
            .catch((err) => {if(err) res.sendStatus(500)})
        }
        else
            res.sendStatus(401)
    },

    addQuestionToStep : (req,res,next) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Step.findByPk(req.body.step)
            .then(step =>
            {
                if(step)
                {
                    db.Question.create(
                    {
                        wording : req.body.question,
                        response : req.body.response,
                        type_of : req.body.typeOf,
                        points : req.body.points,
                        id_step :  step.id_step
                    })
                    .then(res.sendStatus(201))
                }
                else
                    throw 'err'
                
            })
            .catch((err) => {if(err) res.sendStatus(500)})
        }
        else
            res.sendStatus(401)
    },

    questionOfStep : (req,res,next) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Step.findByPk(req.body.step)
            .then(step =>
            {
                if(step)
                {
                    db.Question.findAll(
                    {
                        where : {id_step : step.id_step},
                        attributes : ['id_question','wording','points']
                    })
                    .then(questions => res.status(200).json(questions))
                }
                else
                    throw 'err'
                
            })
            .catch((err) => {if(err) {console.log(err);res.sendStatus(500)}})
        }
        else
            res.sendStatus(401)
    }


}
