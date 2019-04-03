'use_strict';
const db = require('../models');
const utils = require('./utils');
module.exports = 
{
    circuit : (req,res,next) => 
    {
        db.Circuit.findByPk(req.params.id_circuit,{attributes : ['id_step','name','latitude','longitude','description','order','instruction','length']})
        .then((circuit) => res.json(circuit))
        .catch((err) => {if(err) res.status(500).send(utils.messages.serverError)});
    },

    downloadCircuit : (req,res,next) =>
    {
        if(utils.verifToken(req.headers['authorization']))
        {
            db.Circuit.findOne(
            {
                where : {id_circuit : req.params.id_circuit, published : 1},
                attributes : ['name','description','duration','need_internet','level'],
                include : 
                [
                    {
                        model : db.Step,
                        attributes : ['id_step','name','latitude','longitude','description','order','instruction','length'],
                        include : 
                        [
                            {
                                model : db.Question,
                                attributes : ['id_question','wording','response','type_of','points']
                            }
                        ]
                    }
                ]
            })
            .then(circuit => res.status(200).send(circuit))
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    //////////////////////////////////////////////////////////

    nearbyCircuits : (req,res,next) =>
    {
        db.Step.findAll({where : {order : 0}})
        .then((steps) =>
        {
            let dist = 0;
            let map = steps.map(step =>
            {
                dist = utils.distanceBetweenPoints(step.latitude,req.body.user_latitude,step.longitude,req.body.user_longitude);
                if(dist <= req.body.distance)
                {
                    
                    return db.Circuit.findOne(
                    {
                        where : {id_circuit : step.id_circuit, published : 1},
                        include : 
                        [
                            {
                                model : db.Step,
                                where : {order: 0},
                                attributes : ['latitude','longitude']
                            }
                        ]
                    });
                }
            });

            return Promise.all(map);
        })
        .then(circuits =>
        {
            let c = [];
            circuits.map(circuit => 
            {
                if(circuit)
                    c.push(circuit)
            });

            res.status(201).send(c)
        })
        .catch((err) => {if (err) res.status(500).send(utils.messages.serverError)});
    },

    //////////////////////////////////////////////////////////

    circuits : (req,res,next) => 
    {
        db.Circuit.findAll()
        .then(circuits => res.status(200).send(circuits))
        .catch((err) => {if(err) res.status(500).send(utils.messages.serverError)});
    },

    //////////////////////////////////////////////////////////

    myCircuits : (req,res,next) => 
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Circuit.findAll({where : {id_user : id_user}})
            .then((circuit) => res.json(circuit))
            .catch((err) => {if(err) res.status(500).send(utils.messages.serverError)});
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    //////////////////////////////////////////////////////////

    createCircuit : (req,res,next) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Circuit.create(
            {
                name : req.body.name,
                description : req.body.description,
                length : req.body.length,
                duration : req.body.duration,
                need_internet : req.body.need_internet,
                published : 0,
                version : 1,
                level : req.body.level,
                id_user : id_user
            })
            .then((circuit) =>
            {
                if(circuit)
                    res.status(201).send(circuit)
                else
                    throw 'err'
            })
            .catch((err) => {if(err) res.status(500).send(utils.messages.serverError)});
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    //////////////////////////////////////////////////////////

    publicationCircuit : (req,res,next) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Circuit.findOne({where : {id_circuit : req.body.id_circuit}})
            .then(circuit =>
            {
                circuit.update({published: !circuit.published})
            })
            .then(res.sendStatus(200))
            .catch((err) =>{if(err) res.status(500).send(utils.messages.serverError)});
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    //////////////////////////////////////////////////////////

    deleteCircuit : (req,res,next) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Circuit.destroy({where : {id_circuit : req.body.id_circuit}})
            .then(a => res.sendStatus(204))
            .catch((err) =>{if(err) res.status(500).send(utils.messages.serverError)});
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    //////////////////////////////////////////////////////////

    publishedCircuits : (req,res,next) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Circuit.findAll({where : {published : true}})
            .then(a => res.sendStatus(200))
            .catch((err) =>{if(err) res.status(500).send(utils.messages.serverError)});
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    //////////////////////////////////////////////////////////

    updateCircuit : (req, res, next) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Circuit.findByPk(req.params.id_circuit).then(circuit => 
                {
                if(circuit.id_user === id_user) 
                {
                    circuit.update(req.body).then(() => res.status(200).send(circuit));
                }
            })
            .catch((err) =>{if(err) res.status(500).send(utils.messages.serverError)});
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    }
}


