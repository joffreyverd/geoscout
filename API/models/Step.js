module.exports = (sequelize,DataTypes) =>
{
    const Step = sequelize.define(
        'Step',
        {
            id_step : {type : DataTypes.INTEGER,autoIncrement : true, allowNull : false, primaryKey : true},
            name : {type : DataTypes.STRING, allowNull : true},
            latitude : {type : DataTypes.FLOAT, allowNull : true},
            longitude : {type : DataTypes.FLOAT, allowNull : true},
            description : {type : DataTypes.TEXT, allowNull : true},
            order : {type : DataTypes.INTEGER, allowNull : true},
            instruction : {type : DataTypes.STRING, allowNull : true}
        },
        {createdAt: false, updatedAt: false}
    );

    return Step;
}
