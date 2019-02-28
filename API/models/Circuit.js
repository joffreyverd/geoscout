module.exports = (sequelize,DataTypes) =>
{
    const Circuit = sequelize.define(
        'Circuit',
        {
            id_circuit : {type : DataTypes.INTEGER,autoIncrement : true, allowNull : false,primaryKey : true},
            name : {type : DataTypes.STRING, allowNull : true},
            description : {type : DataTypes.STRING, allowNull : true},
            length : {type : DataTypes.FLOAT, allowNull : true},
            duration : {type : DataTypes.DATE, allowNull : true},
            need_internet : {type : DataTypes.BOOLEAN, allowNull : true},
            published : {type : DataTypes.BOOLEAN, allowNull : true},
            version : {type : DataTypes.TINYINT,allowNull : true},
            level : {type : DataTypes.ENUM('0','1','2'), allowNull : true}
        },
    );

    Circuit.associate = (db) =>
    {
        Circuit.hasMany(db.Evaluation);
        Circuit.hasMany(db.AchievedCircuit);
        Circuit.hasMany(db.Step,{ onDelete: 'CASCADE' });
        Circuit.belongsTo(db.User,{foreignKey : 'author_id',targetKey:'id_user'})
    }
    
    return Circuit;
}
