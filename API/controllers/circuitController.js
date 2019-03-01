'use_strict';
const db = require('../models');
const utils = require('./utils');
module.exports = 
{
    

    circuits : (req,res,next) => 
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Circuit.findAll()
            .then((circuit) => res.json(circuit))
            .catch((err) => {if(err) res.sendStatus(500)})
        }
        else
            res.sendStatus(401)
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
            })
            .then((circuit) =>
            {
                if(circuit)
                    res.sendStatus(201)
                else
                    throw "err"
            })
            .catch((err) => {if(err) res.sendStatus(500)})
        }
        else
            res.sendStatus(401)
    },

    //////////////////////////////////////////////////////////

    publicationCircuit : (req,res,next) =>
    {
        db.Circuit.findOne({where : {id_circuit : req.body.id_circuit}})
        .then(circuit =>
        {
            circuit.update({published: !circuit.published})
        })
        .then(res.send(200))
    },

    //////////////////////////////////////////////////////////

    deleteCircuit : (req,res,next) =>
    {
        db.Circuit.destroy({where : {id_circuit : req.body.id_circuit}})
        .then(a => res.send(a))
        .catch(res.send(404))
    },

    //////////////////////////////////////////////////////////

    publishedCircuits : (req,res,next) =>
    {
        db.Circuit.findAll({where : {published : true}})
    }

}
