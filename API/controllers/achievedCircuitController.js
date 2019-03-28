'use strict';
const db = require('../models');
const utils = require('./utils');
const Promise = require('bluebird')
module.exports=
{
    createAchievement: (req,res,next) =>
    {
        if (utils.verifToken(req.headers['authorization']))
        {
            let date = new Date();
            db.AchievedCircuit.create(
            {
                score: req.body.score,
                max_score : req.body.max_score,
                statut_circuit : req.body.statut_circuit,
                version: req.body.version,
                achievedDate: date,
                id_user: req.body.id_user,
                id_circuit: req.body.id_circuit,
                id_step: req.body.id_step

            }).then((achievement) =>
            {
                return res.status(201).send(achievement);
            }).catch((err) => {if(err) res.sendStatus()});
        }
        else
        {
            res.status(401).send(utils.messages.invalidToken);
        }
    },

    //////////////////////////////////////////////////////////
}
 