const Sequelize = require("sequelize");

const db = new Sequelize("dans_final", "root", "root", {
	host: "localhost",
	dialect: "mysql",
	timezone: "+07:00",
});

module.exports = db;
