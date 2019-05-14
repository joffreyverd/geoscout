
const db = require('../models')
const utils = require('./utils');
module.exports = 
{
    createEvaluation : async (req,res) => 
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
            try
            {
                await db.Evaluation.create(
                {
                    comment : req.body.comment,
                    stars : req.body.stars,
                    id_circuit : req.body.id_circuit,
                    id_user : id_user
                });
                
                res.sendStatus(201);
            }

            catch
            {
                res.status(500).send(utils.messages.serverError)
            }
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    ////////////////////////////////////////////////////////////////////////////

    evaluationsCircuit : async (req,res) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if(id_user)
        {
           try
           {
                let evaluations = await db.Evaluation.findAll(
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
                });

                res.json(evaluations);
           }

            catch
            {
                res.status(500).send(utils.messages.serverError)
            }
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },
}