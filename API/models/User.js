module.exports = (sequelize,DataTypes) =>
{
    const User = sequelize.define(
        'User',
        {
            id_user : {type : DataTypes.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true},
            firstname : {type : DataTypes.STRING, allowNull : true},
            lastname : {type : DataTypes.STRING, allowNull : true},
            picture : {type : DataTypes.STRING, allowNull : true},
            email : {type : DataTypes.STRING, allowNull : true,unique: true},
            password : {type : DataTypes.STRING, allowNull : true}
        },

        {createdAt: false, updatedAt: false}
    );

    User.associate = (db) =>
    {
        User.belongsToMany( db.User, {through: db.Relation, as :'Relations'});
        User.hasMany(db.Evaluation);
        User.hasMany(db.AchievedCircuit)
    }

    return User;
}
