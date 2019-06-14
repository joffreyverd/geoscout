/* eslint-disable no-undef */
module.exports = (sequelize,DataTypes) =>
{
	const Evaluation = sequelize.define(
		'Evaluation',
		{
			comment : {type : DataTypes.STRING, allowNull : true},
			stars :{type : DataTypes.TINYINT, allowNull : true},
			version : {type : DataTypes.TINYINT, allowNull : true,defaultValue : 0}
		},
	);

	Evaluation.associate = (db) =>
	{
		Evaluation.belongsTo(db.User,{foreignKey : 'id_user'});    
		Evaluation.belongsTo(db.Circuit,{foreignKey : 'id_circuit'});
	};

	return Evaluation;
};
