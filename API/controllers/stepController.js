'use_strict';
const db = require('../models')
const utils = require('./utils');
const Promise = require('bluebird')
module.exports = 
{
    stepCircuit : (req,res,next) => 
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Step.findAll({where : {id_circuit : req.params.id_circuit}, order: ['order']})
            .then(step => res.status(200).send(step));
        }
        else
            res.status(401).send(utils.messages.invalidToken); 
    },

    //////////////////////////////////////////////////////////

    step: (req,res,next) => 
    {
        if(utils.verifToken(req.headers['authorization']))
        {
            db.Step.findOne(
                {
                    where : {id_step : req.params.id_step},
                    attributes : ['id_step','name','latitude','longitude','description','order','instruction'],
                    include : 
                    [
                        {
                            model : db.Question,
                            attributes : ['id_question','wording','response','type_of','points']
                        }
                    ]
                }
            )
            .then(step => res.status(200).send(step))
        }
        else
            res.status(401).send(utils.messages.invalidToken);  
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
                    order : count,
                    instruction : req.body.instruction,
                    id_circuit : req.body.id_circuit
                }).then(step =>res.status(201).send(step));
            }).catch((err) => {if(err) res.sendStatus(500)});
        }
        else
            res.status(401).send(utils.messages.invalidToken); 
    },

    //////////////////////////////////////////////////////////

    changeOrder : (req,res,next) =>
    {
        console.log('nigga')
        if(utils.verifToken(req.headers['authorization']))
        {
            db.Step.findAll({attributes : ['id_step','order'],where : {id_circuit : req.body.id_circuit}})
            .then((steps) =>
            {
                return db.sequelize.transaction(t=>
                {
                    return Promise.map(steps,step =>
                    {
                        if(parseInt(step.order) === parseInt(req.body.previous))
                        {
                            step.order = req.body.new;
                        }
                        else if(parseInt(step.order) < parseInt(req.body.previous) && parseInt(step.order) >= parseInt(req.body.new))
                        {
                            step.order += 1;
                        }
                        else if (parseInt(step.order) > parseInt(req.body.previous) && parseInt(step.order) <= parseInt(req.body.new))
                        {
                            step.order -= 1;
                        }

                        return step.save({transaction: t});
                    })
                    .then(res.sendStatus(204))
                    .catch((err) => {if(err)res.sendStatus(500)})    
                })
            });
        }
        else
            res.status(401).send(utils.messages.invalidToken); 
        
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
                
            })
            .catch((err) => {if(err) res.status(500).send(utils.messages.serverError)})
        }
        else
            res.status(401).send(utils.messages.invalidToken); 
    },

    //////////////////////////////////////////////////////////

    deleteStep : (req, res, next) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        let step_order = undefined;
        let step_circuit = undefined;
        if(id_user)
        {

            db.Circuit.findOne(
            {
                where : {id_circuit : req.params.id_circuit},
                include :
                [
                    {
                        model : db.Step,
                        where : {id_step : req.params.id_step}
                    }
                ]
            })
            .then(circuit =>
            {
                let order = circuit.Steps[0].order;
                circuit.Steps[0].destroy()
                
                return order
            })
            .then((order) =>
            {
                db.Step.findAll({attributes: ['id_step','order'], where : {id_circuit: 34, order: {[db.sequelize.Op.gt]: order}}})
                .then((steps)=>
                {
                    return db.sequelize.transaction(t=>
                    {
                        return Promise.map(steps,step =>
                        {
                            step.order-= 1;
                            return step.save({transaction: t})
                        })
                        .then(res.sendStatus(204))
                        .catch((err) => { if (err) res.sendStatus(500)})
                    })
                })
            })
        }
        else
            res.status(401).send(utils.messages.invalidToken); 
    },

    //////////////////////////////////////////////////////////

    updateStep : (req, res, next) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Step.findByPk(req.params.id_step).then(step => 
            {
                db.Circuit.findByPk(step.id_circuit).then(circuit => 
                {
                    if(circuit.id_user === id_user) 
                    {
                        step.update(req.body).then(() => res.status(200).send(step));
                    }
                })
            })
            .catch((err) => {if(err) res.status(500).send(utils.messages.serverError)})
        }
        else
            res.status(401).send(utils.messages.invalidToken); 
    },

    updateQuestion : (req, res, next) =>
    {
        if(utils.verifToken(req.headers['authorization']))
        {
            db.Question.findByPk(req.params.id_question).then(question => {
                question.update(req.body).then(() => res.status(200).send(question));
            }).catch(() => {res.sendStatus(500)})
        }
        else
            res.sendStatus(401);
    }
}
