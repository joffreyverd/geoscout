const jwt = require('jsonwebtoken');
const config = require('./configUser');
module.exports = 
{
    verifToken : (token) =>
    {
        if(token)
        {
            let id = jwt.verify(token.split(' ')[1], config.secret, (err, decoded) =>
            {
                if (err) return null
                else return decoded.id_user
            });

            return id;

        }
        else
            return null;
    }
}