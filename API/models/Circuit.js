/* eslint-disable no-undef */
module.exports = (sequelize,DataTypes) =>
{
	const Circuit = sequelize.define(
		'Circuit',
		{
			id_circuit : {type : DataTypes.INTEGER, autoIncrement : true, allowNull : false, primaryKey : true},
			name : {type : DataTypes.STRING, allowNull : true, unique : true},
			description : {type : DataTypes.STRING, allowNull : true},
			length : {type : DataTypes.FLOAT, allowNull : true},
			duration : {type : DataTypes.INTEGER, defaultValue: null, allowNull : true},
			need_internet : {type : DataTypes.BOOLEAN, allowNull : true},
			published : {type : DataTypes.BOOLEAN, allowNull : true},
			version : {type : DataTypes.TINYINT,allowNull : true},
			level : {type : DataTypes.ENUM('0','1','2'), allowNull : true}
		},
	);

	Circuit.associate = (db) =>
	{
		Circuit.hasMany(db.Evaluation,{foreignKey : 'id_circuit',onDelete: 'CASCADE'});
		Circuit.hasMany(db.AchievedCircuit,{foreignKey : 'id_circuit',onDelete: 'CASCADE'});
		Circuit.hasMany(db.Step,{foreignKey : 'id_circuit', onDelete: 'CASCADE'});
		Circuit.belongsTo(db.User,{foreignKey : 'id_user',targetKey:'id_user'});
		Circuit.hasMany(db.Favorite,{foreignKey : 'id_circuit',onDelete: 'CASCADE'});
	};
	
	return Circuit;
};
