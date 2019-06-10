/* eslint-disable no-undef */
module.exports = (sequelize,DataTypes) =>
{
	const User = sequelize.define(
		'User',
		{
			id_user : {type : DataTypes.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true},
			firstname : {type : DataTypes.STRING, allowNull : true},
			lastname : {type : DataTypes.STRING, allowNull : true},
			email : {type : DataTypes.STRING, allowNull : true,unique: true},
			password : {type : DataTypes.STRING, allowNull : true},
			is_admin : {type : DataTypes.BOOLEAN, allowNull : false}
		},

		{createdAt: false, updatedAt: false}
	);

	User.associate = (db) =>
	{
		User.hasMany(db.Favorite,{foreignKey : 'id_user'});
		User.belongsToMany(db.User, {through: db.Relation, as :'Relations'});
		User.hasMany(db.Circuit,{foreignKey : 'id_user',constraints : false});
		User.hasMany(db.Evaluation,{foreignKey : 'id_user'});
		User.hasMany(db.AchievedCircuit,{foreignKey : 'id_user'});
	};

	return User;
};
