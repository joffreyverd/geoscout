'use_strict';
const db = require('../models')
module.exports = 
{
    // TODO : Implémenter le système de TOKEN !

    circuits : (req,res,next) => 
    {
        db.Circuit.findAll()
        .then((circuit) => res.json(circuit));
    },

    //////////////////////////////////////////////////////////

    createCircuit : (req,res,next) =>
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
        .then(res.send(201));
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
