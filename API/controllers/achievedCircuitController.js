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
                return res.status(200).send(achievement);
            }).catch((err) => {if(err) res.sendStatus()});
        }
        else
        {
            res.status(401).send(utils.messages.invalidToken);
        }
    },

    //////////////////////////////////////////////////////////

    deleteAchievement: (req,res,next) =>
    {
        if (utils.verifToken(req.headers['authorization']))
        {
            db.AchievedCircuit.destroy({where : {id_route : req.params.id_route}})
            .then(a => res.sendStatus(204))
            .catch((err) =>{if(err) res.status(500).send(utils.messages.serverError)});
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    //////////////////////////////////////////////////////////

    getAchievements: (req,res,next) =>
    {
        let id = utils.verifToken(req.headers['authorization'])
        if (id)
        {
            db.AchievedCircuit.findAll({where : {id_user : id}})
            .then(achievements => res.status(200).send(achievements))
            .catch((err) => {if(err) res.status(500).send(utils.messages.serverError)})
        }
        else
        res.status(401).send(utils.messages.invalidToken);
    }

}
