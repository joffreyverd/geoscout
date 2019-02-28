'use_strict';
const db = require('../models')

module.exports = 
{
    createEvaluation : (req,res,next) => 
    {
        db.User.findOne({
            where : {
                id_user : req.body.id_user
            }
        })
        .then(user =>
        {
            db.Circuit.findOne({
                where : {
                    id_circuit : req.body.id_circuit
                }
            })
            .then(circuit =>
            {
                db.Evaluation.create(
                {
                    comment : req.body.comment,
                    stars : req.body.stars,
                    CircuitIdCircuit : circuit.id_circuit,
                    UserIdUser : user.id_user
                })
            });
        })
        .then(() => res.sendStatus(200));
    },

    ////////////////////////////////////////////////////////////////////////////

    evaluationsCircuit : (req,res,next) =>
    {
        db.Evaluation.findAll(
        {
            attributes : ["comment","stars"],
            include :
            [
                {
                    model : db.User,
                    attributes : ["id_user","firstname","lastname"]
                }
            ],
            where : {CircuitIdCircuit : req.body.id_circuit}
        })
        .then(evaluations => {res.json(evaluations)})
    },
}