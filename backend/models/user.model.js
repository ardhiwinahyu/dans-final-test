const Sequelize = require("sequelize");
const db = require("../configs/database");
const dataType = Sequelize.DataTypes;
const Role = require("./role.model");

const User = db.define(
	"user",
	{
		user_id: {
			type: dataType.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		user_role: {
			type: dataType.INTEGER,
			allowNull: false,
			references: {
				model: Role,
				key: "role_id",
			},
		},
		user_email: {
			type: dataType.STRING(50),
			allowNull: false,
			unique: true,
		},
		user_name: {
			type: dataType.STRING(50),
			allowNull: false,
		},
		user_password: {
			type: dataType.STRING(255),
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = User;
