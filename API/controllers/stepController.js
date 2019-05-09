
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
                db.Step.create(
                {
                    name : req.body.name,
                    latitude : req.body.latitude,
                    longitude : req.body.longitude,
                    description : req.body.description,
                    order : count,
                    instruction : req.body.instruction,
                    id_circuit : req.body.id_circuit
                })
                
                .then((step) => {utils.evaluateDistance(req.body.id_circuit);return step})
                .then(step =>res.status(201).send(step))
            }).catch((err) => {if(err) res.sendStatus(500)});
        }
        else
            res.status(401).send(utils.messages.invalidToken); 
    },

    //////////////////////////////////////////////////////////

    changeOrder : (req,res,next) =>
    {
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
                db.sequelize.transaction(t =>
                {
                    return circuit.Steps[0].destroy({transaction : t})
                })
                      
                return order
            })
            .then((order) =>
            {
                db.Step.findAll({attributes: ['id_step','order'], where : {id_circuit: req.params.id_circuit, order: {[db.sequelize.Op.gt]: order}}})
                .then((steps)=>
                {
                    return db.sequelize.transaction(t=>
                    {
                        return Promise.map(steps,step =>
                        {
                            step.order-= 1;
                            return step.save({transaction: t})
                        })
                        .then(utils.evaluateDistance(req.params.id_circuit))
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
        console.log(JSON.stringify(req.body.step));
        if(id_user)
        {
            db.Step.findOne(
            {
                where : {id_step : req.params.id_step},
                include : 
                [
                    {
                        model : db.Question,
                    }
                ]
            })
            .then(step => 
            {
                db.Circuit.findByPk(step.id_circuit).then(circuit => 
                {
                    if(circuit.id_user === id_user) 
                    {

                        db.sequelize.transaction(t =>
                        {
                            step.description = req.body.step.description;
                            step.instruction = req.body.step.instruction;
                            step.latitude = req.body.step.latitude;
                            step.longitude = req.body.step.longitude;
                            step.name = req.body.step.name;
                            step.order = req.body.step.order;
                            step.validation = req.body.step.validation

                            if(!step.Questions.length)
                            {
                                req.body.step.Questions.map(question =>
                                {
                                    db.Question.create(
                                    {
                                        wording : question.wording,
                                        response : question.response,
                                        type_of : question.type_of,
                                        points : question.points,
                                        id_step : step.id_step
                                    },{transaction : t});
                                });
                            }

                            else
                            {
                                let match = {};
                                step.Questions.map(question => 
                                {
                                    match = {};
                                    match = req.body.step.Questions.find(e =>  e.id_question === question.id_question);
                                    if(match)
                                    {
                                        
                                        question.wording = match.wording;
                                        question.response = match.response;
                                        question.type_of = match.type_of;
                                        question.points = match.points;
                                        question.save({transaction : t});
                                    }
                                });

                                req.body.step.Questions.map(question_body =>
                                {
                                   
                                    if(!question_body.id_question)
                                    {
                                        db.Question.create(
                                        {
                                            wording : question_body.wording,
                                            response : question_body.response,
                                            type_of : question_body.type_of,
                                            points : question_body.points,
                                            id_step : step.id_step
                                        },{transaction : t});
                                    }
                                })
                            }

                            return step.save({transaction : t})
 
                        })
                        .then((step) => {utils.evaluateDistance(step.id_circuit);return step})
                        .then(step =>  res.status(200).send(step));
                    }
                })
            })
            .catch((err) => {if(err) res.status(500).send(utils.messages.serverError)})
        }
        else
            res.status(401).send(utils.messages.invalidToken); 
    },

    //////////////////////////////////////////////////////////

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
