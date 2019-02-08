'use_strict';
const db = require('../models')

module.exports = 
{
    transit : (req,res,next) => 
    {
        db.Transit.findAll()
        .then((transit) => res.json(transit));
    }
}
