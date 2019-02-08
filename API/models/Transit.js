module.exports = (sequelize,DataTypes) =>
{
    const Transit = sequelize.define(
        'Transit',
        {
            id_transit : {
                type : DataTypes.INTEGER,
                allowNull : false,
                primaryKey : true
            },
            instruction : {
                type : DataTypes.TEXT,
                allowNull : true
            },
            validation : {
                type : DataTypes.TEXT,
                allowNull : true
            }
        },
        {
            createdAt: false,
            updatedAt: false
        }
    );
    return Transit;
}
