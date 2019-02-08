'use_strict';
const db = require('../models')

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
        db.Step.count({where : {CircuitIdCircuit : req.body.id_circuit}})
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
                CircuitIdCircuit : req.body.id_circuit
            })
        })
        .then(res.send(201))
    }
}
