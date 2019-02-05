'use_strict';
const db = require('../models')

module.exports = 
{
    user : (req,res,next) => 
    {
        db.User.findAll()
        .then((user) => res.json(user));
    }
}
