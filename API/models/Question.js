/* eslint-disable no-undef */
module.exports = (sequelize,DataTypes) =>
{
	const Question = sequelize.define(
		'Question',
		{
			id_question : {type : DataTypes.INTEGER,autoIncrement : true, allowNull : false, primaryKey : true},
			wording : {type : DataTypes.TEXT, allowNull : true},
			response : {type : DataTypes.TEXT,allowNull : true},
			type_of : {type : DataTypes.TINYINT, allowNull : true},
			points : {type : DataTypes.INTEGER, allowNull : true},
			difficulty : {type : DataTypes.TINYINT, allowNull : true}
		},
		{
			createdAt: false,
			updatedAt: false
		}
	);

	/*Question.associate = (db) =>
	{
		Question.belongsTo(db.Step,{foreignKey : 'id_step', targetKey : 'id_step'})
	}*/

	return Question;
};