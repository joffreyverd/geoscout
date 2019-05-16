module.exports = (sequelize,DataTypes) =>
{
    const AchievedCircuit = sequelize.define(
        'AchievedCircuit',
        {
            id_achievement : {type : DataTypes.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true},
            score : {type : DataTypes.INTEGER, allowNull : true},
            max_score : {type : DataTypes.INTEGER, allowNull : true}, 
            statut_circuit : {type : DataTypes.TINYINT, allowNull : true},      
            version : {type : DataTypes.TINYINT, allowNull : true},
            achievedDate : {type : DataTypes.DATE, allowNull : true},
            achievedTime :  {type : DataTypes.INTEGER, allowNull : true}, 
        },

        {createdAt: false, updatedAt: false}
    );

    AchievedCircuit.associate = (db) =>
    {
        AchievedCircuit.belongsTo(db.User,{foreignKey : 'id_user'});    
        AchievedCircuit.belongsTo(db.Circuit,{foreignKey :
            {
                name: 'id_circuit',
                allowNull: false
            }
        });
        AchievedCircuit.belongsTo(db.Step,{foreignKey : 'id_step'});
    }

    return AchievedCircuit;
}
