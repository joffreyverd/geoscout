'use strict';
const db = require('../models');
const utils = require('./utils');
const Promise = require('bluebird')
module.exports=
{
    createAchievement: async (req,res) =>
    {
        let id_user = utils.verifToken(req.headers['authorization']);
        if (id_user)
        {
            try
            {
                let achievement = await db.AchievedCircuit.create(
                {
                    score: req.body.score,
                    max_score : req.body.max_score,
                    statut_circuit : req.body.statut_circuit,
                    version: req.body.version,
                    achievedDate: date,
                    id_user: id_user,
                    id_circuit: req.body.id_circuit,
                    id_step: req.body.id_step
    
                });

                res.status(200).send(achievement);
            }

            catch(err)
            {
                console.log(err)
                res.status(500).send(utils.messages.serverError);
            }
        }
        else
        {
            res.status(401).send(utils.messages.invalidToken);
        }
    },

    //////////////////////////////////////////////////////////

    deleteAchievement: async (req,res) =>
    {
        if (utils.verifToken(req.headers['authorization']))
        {
            try
            {
                await db.AchievedCircuit.destroy({where : {id_route : req.params.id_route}});
                res.sendStatus(204);
            }

            catch
            {
                res.status(500).send(utils.messages.serverError)
            }
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    //////////////////////////////////////////////////////////

    getAchievements: async (req,res) =>
    {
        let id = utils.verifToken(req.headers['authorization'])
        if (id)
        {
            try
            {
                let achievements = await  db.AchievedCircuit.findAll({where : {id_user : id}});
                res.status(200).send(achievements)
            }

            catch(err)
            {
                console.log(err)
                res.status(500).send(utils.messages.serverError);
            }
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    }
}
