'use_strict';
const db = require('../models')

module.exports = 
{
    test : (req,res,next) => 
    {
        db.Test.findAll()
        .then((test) =>res.json(test));
    }
}