module.exports = (sequelize,DataTypes) =>
{
    const Evaluation = sequelize.define(
        'Evaluation',
        {
            comment : {type : DataTypes.STRING, allowNull : true},
            stars :{type : DataTypes.TINYINT, allowNull : true}
        },
    );

    Evaluation.associate = (db) =>
    {
        Evaluation.belongsTo(db.User);    
        Evaluation.belongsTo(db.Circuit);
    }

    return Evaluation;
}
