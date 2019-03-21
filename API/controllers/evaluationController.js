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
            .then(() => res.sendStatus(201))
            .catch((err => {if(err)res.status(500).send(utils.messages.serverError)}));
        }
        else
            res.status(401).send(utils.messages.invalidToken);
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
            .catch((err) => {if(err) res.status(500).send(utils.messages.serverError)});
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },
}