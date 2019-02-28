module.exports = (sequelize,DataTypes) =>
{
    const Relation = sequelize.define(
        'Relation',
        {
            status : 
            {
                type : DataTypes.ENUM('0','1','2'),
                allowNull : false,
            },
        },
        {
            createdAt: false,
            updatedAt: false
        }
    );

    return Relation;
}
