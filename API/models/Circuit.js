module.exports = (sequelize,DataTypes) =>
{
    const Circuit = sequelize.define(
        'Circuit',
        {
            id_circuit : {
                type : DataTypes.INTEGER,
                allowNull : false,
                primaryKey : true
            },
            name : {
                type : DataTypes.STRING,
                allowNull : true
            },
            description : {
                type : DataTypes.STRING,
                allowNull : true
            },
            lenght : {
                type : DataTypes.FLOAT,
                allowNull : true
            },
            duration : {
                type : DataTypes.DATE,
                allowNull : true
            },
            need_internet : {
                type : DataTypes.BOOLEAN,
                allowNull : true
            },
            published : {
                type : DataTypes.BOOLEAN,
                allowNull : true
            }
        },
        {
            createdAt: false,
            updatedAt: false
        }
    );
    return Circuit;
}
