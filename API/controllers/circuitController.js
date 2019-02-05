'use_strict';
const db = require('../models')

module.exports = 
{
    circuit : (req,res,next) => 
    {
        db.Circuit.findAll()
        .then((circuit) => res.json(circuit));
    }
}
