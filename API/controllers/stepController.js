'use_strict';
const db = require('../models')

module.exports = 
{
    step : (req,res,next) => 
    {
        db.Step.findAll()
        .then((step) => res.json(step));
    }
}
