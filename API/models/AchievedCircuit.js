module.exports = (sequelize,DataTypes) =>
{
    const AchievedCircuit = sequelize.define(
        'AchievedCircuit',
        {
            score : {type : DataTypes.INTEGER, allowNull : true},
            statut_circuit : {type : DataTypes.ENUM('0','1','2'), allowNull : true},
            last_step : {type : DataTypes.TINYINT, allowNull : true},           
            date : {type : DataTypes.DATE, allowNull : true},
            version : {type : DataTypes.TINYINT, allowNull : true},
            score : {type : DataTypes.INTEGER, allowNull : true},
            scoreTotal : {type : DataTypes.INTEGER, allowNull : true},         
        },

        {createdAt: false, updatedAt: false}
    );

    AchievedCircuit.associate = (db) =>
    {
        AchievedCircuit.belongsTo(db.User);    
        AchievedCircuit.belongsTo(db.Circuit);
    }

    return AchievedCircuit;
}
