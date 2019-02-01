module.exports = (sequelize,DataTypes)=>
{
    const Test = sequelize.define(
        'Test',
        {
            Test_ID : {type : DataTypes.INTEGER,allowNull : false,primaryKey : true},
            Texte : {type : DataTypes.STRING,allowNull : true},
        }
    
    );

    
    return Test;
}


