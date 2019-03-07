'use_strict';
const db = require('../models')
const utils = require('./utils');
module.exports = 
{
    createEvaluation : (req,res,next) => 
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            db.Evaluation.create(
            {
                comment : req.body.comment,
                stars : req.body.stars,
                id_circuit : req.body.id_circuit,
                id_user : id_user
            })
            .then(() => res.sendStatus(201));
        }
        else
            res.sendStatus(401);
    },

    ////////////////////////////////////////////////////////////////////////////

    evaluationsCircuit : (req,res,next) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
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
                where : {id_circuit : req.params.id_circuit}
            })
            .then(evaluations => {res.json(evaluations)})
        }
        else
            res.sendStatus(401);
    },
}