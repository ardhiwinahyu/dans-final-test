const Sequelize = require("sequelize");
const db = require("../configs/database");
const dataType = Sequelize.DataTypes;

const Menu = db.define(
	"menu",
	{
		menu_id: {
			type: dataType.STRING(50),
			allowNull: false,
			primaryKey: true,
		},

		menu_name: {
			type: dataType.STRING(50),
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = Menu;
