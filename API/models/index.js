/* eslint-disable no-undef */
'use strict';

// eslint-disable-next-line no-undef
const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require('../config/config.json')[env];
const db        = {};
const utils = require('../controllers/utils');

var sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		var model = sequelize['import'](path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync(/*{force : true }*/); // ATTENTION !!!

const lol = async () =>
{
	let c = await db.Circuit.findAll({attributes : ['id_circuit']});
	let u = await db.User.findAll({attributes : ['id_user']});

	c.map(async c =>
	{
		await utils.createFolder(c.id_circuit,1);
	});

	u.map(async u =>
	{
		await utils.createFolder(u.id_user,0);
	});
};

lol();

module.exports = db;
