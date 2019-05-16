/* eslint-disable no-undef */
module.exports = (sequelize) =>
{
	const Favorite = sequelize.define(
		'Favorite',
		{},
		{
			indexes: [
				{
					unique: true,
					fields: ['id_user', 'id_circuit']
				}
			]
		},
	);

	Favorite.associate = (db) =>
	{
		Favorite.belongsTo(db.User,{foreignKey : 'id_user',targetKey : 'id_user',constraints : false});
		Favorite.belongsTo(db.Circuit,{foreignKey : 'id_circuit',targetKey : 'id_circuit',constraints : false});
	};
	
	return Favorite;
};
