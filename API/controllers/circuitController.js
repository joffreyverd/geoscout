'use_strict';
const db = require('../models');
const utils = require('./utils');
module.exports = 
{
    circuit : (req,res,next) => 
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Circuit.findByPk(req.params.id_circuit)
            .then((circuit) => res.json(circuit))
            .catch((err) => {if(err) res.sendStatus(500)})
        }
        else
            res.sendStatus(401);
    },

    //////////////////////////////////////////////////////////

    circuits : (req,res,next) => 
    {
        if(utils.verifToken(req.headers['authorization']))
        {
            db.Circuit.findAll()
            .then((circuit) => res.json(circuit))
            .catch((err) => {if(err) res.sendStatus(500)})
        }
        else
            res.sendStatus(401);
    },

    //////////////////////////////////////////////////////////

    myCircuits : (req,res,next) => 
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Circuit.findAll({where : {id_user : id_user}})
            .then((circuit) => res.json(circuit))
            .catch((err) => {if(err) res.sendStatus(500)})
        }
        else
            res.sendStatus(401);
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
                version : 0,
                level : req.body.level,
                id_user : id_user
            })
            .then((circuit) =>
            {
                if(circuit)
                    res.status(201).send(circuit)
                else
                    throw "err"
            })
            .catch((err) => {if(err) res.sendStatus(500)})
        }
        else
            res.sendStatus(401);
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
            .then(res.send(200))
        }
        else
            res.sendStatus(401);
    },

    //////////////////////////////////////////////////////////

    deleteCircuit : (req,res,next) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Circuit.destroy({where : {id_circuit : req.body.id_circuit}})
            .then(a => res.sendStatus(200))
            .catch(res.sendStatus(500))
        }
        else
            res.sendStatus(401); 
    },

    //////////////////////////////////////////////////////////

    publishedCircuits : (req,res,next) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Circuit.findAll({where : {published : true}})
            .then(a => res.sendStatus(200))
            .catch(res.sendStatus(500))
        }
        else
            res.sendStatus(401);
    },

    //////////////////////////////////////////////////////////

    updateCircuit : (req, res, next) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Circuit.findByPk({req.params.id}).then(circuit => {
                if(circuit.id_user === id_user) {
                    circuit.update(req.body);
                }
            })
        }
        else
            res.sendStatus(401);
    }

}
