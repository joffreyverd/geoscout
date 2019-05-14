
const db = require('../models')
const utils = require('./utils');
module.exports = 
{
    question : async (req,res,next) => 
    {
        try
        {
            releaseEvents.json(await db.Question.findAll());
        }

        catch
        {
            res.status(500).send(utils.messages.serverError)
        }
    },

    //////////////////////////////////////////////////////////

    getQuestion : async (req, res) =>
    {
        if(utils.verifToken(req.headers['authorization']))
        {

            try
            {
                res.json(await db.Question.findByPk(req.params.id_question,{attributes : ['id_question','wording','points','response']}));
            }

            catch
            {
                res.status(500).send(utils.messages.serverError);
            }
        }
        else
            res.status(401).send(utils.messages.invalidToken);
    },

    //////////////////////////////////////////////////////////

    createQuestion : async (req, res) =>
    {
        if(utils.verifToken(req.headers['authorization']))
        {
            try
            {
                res.json(await db.Question.create(req.body));
            }
            catch
            {
                res.status(500).send(utils.messages.serverError);
            }
        }
        else
            res.sendStatus(401);
    },

    //////////////////////////////////////////////////////////

    updateQuestion : async (req, res) =>
    {
        if(utils.verifToken(req.headers['authorization']))
        {
            try
            {
               let question = await Question.findByPk(req.params.id);
               await question.update(req.body)
               res.status(200).send(question);
            }

            catch
            {
                res.status(500).send(utils.messages.serverError);
            }
        }
        else
            res.sendStatus(401);
    }
}
