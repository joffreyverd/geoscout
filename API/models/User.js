module.exports = (sequelize,DataTypes) =>
{
    const User = sequelize.define(
        'User',
        {
            id_user : {
                type : DataTypes.INTEGER,
                allowNull : false,
                primaryKey : true
            },
            firstname : {
                type : DataTypes.STRING,
                allowNull : true
            },
            lastname : {
                type : DataTypes.STRING,
                allowNull : true
            },
            picture : {
                type : DataTypes.STRING,
                allowNull : true
            },
            email : {
                type : DataTypes.STRING,
                allowNull : true
            },
            password : {
                type : DataTypes.STRING,
                allowNull : true
            }
        },
        {
            createdAt: false,
            updatedAt: false
        }
    );
    return User;
}
