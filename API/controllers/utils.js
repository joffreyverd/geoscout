const jwt = require('jsonwebtoken');
const config = require('./configUser');
const db = require('../models')
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
        let R = 6371; // km
        let x1 = lat2 - lat1;
        let dLat = Math.radians(x1);
        let x2 = lon2 - lon1;
        let dLon = Math.radians(x2)
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(Math.radians(lat1)) * Math.cos(Math.radians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c);
    },

    evaluateDistance : (id_circuit) =>
    {
        db.Circuit.findOne({where : {id_circuit:id_circuit},include :[{model : db.Step}]})
        .then(circuit =>
        {
            let lat = circuit.Steps[0].latitude;
            let lon = circuit.Steps[0].longitude;
            let dist = 0;
            circuit.Steps.map(step => 
            {
               dist+= module.exports.distanceBetweenPoints(lat,step.latitude,lon,step.longitude)
            });

            db.sequelize.transaction(t =>
            {
                circuit.length = dist;
                return circuit.save({transaction: t});
            })
        })
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