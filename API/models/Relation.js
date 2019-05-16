module.exports = (sequelize,DataTypes) =>
{
    const Relation = sequelize.define(
        'Relation',
        {
            status : 
            {
                type : DataTypes.TINYINT,
                allowNull : false,
            },
        },
        {
            createdAt: false,
            updatedAt: false
        }
    );

    Relation.associate = (db) =>
    {
        Relation.belongsTo(db.User,{foreignKey : 'last_action_user_id', targetKey : 'id_user'})
    }

    return Relation;
}
