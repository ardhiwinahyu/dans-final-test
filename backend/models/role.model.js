const Sequelize = require("sequelize");
const db = require("../configs/database");
const dataType = Sequelize.DataTypes;

const Role = db.define(
	"role",
	{
		role_id: {
			type: dataType.INTEGER,
			primaryKey: true,
			allowNull: false,
		},

		nama_role: {
			type: dataType.STRING(50),
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = Role;
