'use_strict';
const db = require('../models')

module.exports = 
{
    question : (req,res,next) => 
    {
        db.Question.findAll()
        .then((question) => res.json(question));
    }
}
