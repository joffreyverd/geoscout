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
    },

    distanceBetweenPoints : (lat1,lat2,lon1,lon2) =>
    {
        let R = 6371e3; // metres
        let φ1 = Math.radians(lat1);
        let φ2 = Math.radians(lat2)
        let Δφ = Math.radians(lat2-lat1);
        let Δλ = Math.radians(lon2-lon1);
        let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return Math.round((R * c)/1000);
    },

    messages : 
    {
        serverError : 'Il y a eu un problème avec le serveur',
        incorrectPassword : 'Le mot de passe est incorrect',
        invalidToken : 'Vous n\'avez pas fourni vos informations de connexion'
    }
}

Math.radians = function(degrees) 
{
    return degrees * Math.PI / 180;
};
   
Math.degrees = function(radians) 
{
    return radians * 180 / Math.PI;
};