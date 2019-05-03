module.exports = (sequelize,DataTypes) =>
{
    const AchievedCircuit = sequelize.define(
        'AchievedCircuit',
        {
            id_route : {type : DataTypes.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true},
            score : {type : DataTypes.INTEGER, allowNull : true},
            max_score : {type : DataTypes.INTEGER, allowNull : true}, 
            statut_circuit : {type : DataTypes.ENUM('0','1','2'), allowNull : true},      
            version : {type : DataTypes.TINYINT, allowNull : true},
            achievedDate : {type : DataTypes.DATE, allowNull : true},
            achievedTime :  {type : DataTypes.INTEGER, allowNull : true}, 
        },

        {createdAt: false, updatedAt: false}
    );

    AchievedCircuit.associate = (db) =>
    {
        AchievedCircuit.belongsTo(db.User,{foreignKey : 'id_user'});    
        AchievedCircuit.belongsTo(db.Circuit,{foreignKey : 'id_circuit'});
        AchievedCircuit.belongsTo(db.Step,{foreignKey : 'id_step'});
    }

    return AchievedCircuit;
}
