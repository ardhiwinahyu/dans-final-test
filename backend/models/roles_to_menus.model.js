const Sequelize = require("sequelize");
const db = require("../configs/database");
const dataType = Sequelize.DataTypes;
const User = require("./user.model");
const Menu = require("./menu.model");

const Roles_to_menus = db.define(
	"roles_to_menus",
	{
		id: {
			type: dataType.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},

		role_id: {
			type: dataType.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: "role_id",
			},
		},

		menu_id: {
			type: dataType.STRING(50),
			allowNull: false,
			references: {
				model: Menu,
				key: "menu_id",
			},
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = Roles_to_menus;
