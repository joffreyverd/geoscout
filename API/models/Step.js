/* eslint-disable no-undef */
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
			instruction : {type : DataTypes.STRING, allowNull : true},
			validation : {type : DataTypes.BOOLEAN, allowNull : true}
		},
		{createdAt: false, updatedAt: false}
	);

	Step.associate = (db) =>
	{
		Step.hasMany(db.Question,{foreignKey : 'id_step', targetKey : 'id_step'});
	};

	return Step;
};
