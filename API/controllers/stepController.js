'use_strict';
const db = require('../models')
const utils = require('./utils');

module.exports = 
{
    stepCircuit : (req,res,next) => 
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Step.findAll({where : {id_circuit : req.params.id_circuit}, order: ['order']})
            .then((step) => res.json(step));
        }
        else
            res.sendStatus(401);    
    },

    //////////////////////////////////////////////////////////

    step: (req,res,next) => 
    {
        if(utils.verifToken(req.headers['authorization']))
        {
            db.Step.findByPk(req.params.id_step)
            .then((step) => res.json(step));
        }
        else
            res.sendStatus(401);
    },

    //////////////////////////////////////////////////////////

    createStep : (req,res,next) =>
    {
        if(utils.verifToken(req.headers['authorization']))
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
                    order : count + 1,
                    instruction : req.body.instruction,
                    id_circuit : req.body.id_circuit
                }).then(step =>res.status(201).send(step));
            }).catch((err) => {if(err) res.sendStatus(500)});
        }
        else
            res.sendStatus(401);
    },

    //////////////////////////////////////////////////////////

    changeOrder : (req,res,next) =>
    {
        if(utils.verifToken(req.headers['authorization']))
        {
            db.Step.findAll({attributes : ['id_step','order'],where : {id_circuit : req.body.id_circuit}})
            .then((steps) =>
            {
                let promise = steps.map((item,i) =>
                {
                    if(item.order === req.body.previous)
                    {
                        item.order = req.body.new;
                    }
                    else if(item.order < req.body.previous && item.order >= req.body.new)
                    {
                        item.order += 1;
                    }
                    else if (item.order > req.body.previous && item.order <= req.body.new)
                    {
                        item.order -= 1;
                    }

                    item.save();
                });

                Promise.all(promise)
                .then(res.sendStatus(200))
                .catch(res.sendStatus(500))
            });
        }
        else
            res.sendStatus(401);
    },

    //////////////////////////////////////////////////////////

    addQuestionToStep : (req,res,next) =>
    {
        if(utils.verifToken(req.headers['authorization']))
        {
            db.Step.findByPk(req.body.id_step)
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
                    .then(question => res.status(201).send(question))
                }
                else
                    throw 'err'
                
            }).catch((err) => {if(err) res.sendStatus(500)})
        }
        else
            res.sendStatus(401);
    },


    //////////////////////////////////////////////////////////

    questionsOfStep : (req,res,next) =>
    {
        if(utils.verifToken(req.headers['authorization']))
        {
            db.Question.findAll(
            {
                where : {id_step : req.params.id_step},
                attributes : ['id_question','wording','points']
            })
            .then(questions => res.status(200).json(questions))
            .catch((err) => {if(err) {console.log(err);res.sendStatus(500)}})
        }
        else
            res.sendStatus(401);
    },

    //////////////////////////////////////////////////////////

    deleteStep : (req, res, next) =>
    {
        //TODO : Gérer les positions des autres étapes après la suppression
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Step.findByPk(req.params.id_step).then(step => {
                db.Circuit.findByPk(step.id_circuit).then(circuit => {
                    if (circuit.id_user === id_user) {
                        step.destroy().then(() => res.sendStatus(204));
                    }
                })
            }).catch(() => res.sendStatus(500));
        }
        else
            res.sendStatus(401);
    },

    //////////////////////////////////////////////////////////

    updateStep : (req, res, next) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Step.findByPk(req.params.id_step).then(step => {
                db.Circuit.findByPk(step.id_circuit).then(circuit => {
                    if(circuit.id_user === id_user) {
                        step.update(req.body).then(() => res.sendStatus(200).send(step));
                    }
                })
            }).catch(() => res.sendStatus(500));
        }
        else
            res.sendStatus(401);
    }
}
