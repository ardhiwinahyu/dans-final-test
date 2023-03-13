const Sequelize = require("sequelize");
const db = require("../configs/database");
const dataType = Sequelize.DataTypes;
const User = require("./user.model");

const Overtime = db.define(
	"overtime",
	{
		overtime_id: {
			type: dataType.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},

		user_email: {
			type: dataType.STRING(50),
			allowNull: false,
			references: {
				model: User,
				key: "user_email",
			},
		},

		user_name: {
			type: dataType.STRING(50),
			allowNull: false,
		},

		isApproved: {
			type: dataType.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},

		overtime_reason: {
			type: dataType.STRING,
			allowNull: false,
		},

		startTime: {
			type: dataType.DATE,
			allowNull: false,
		},

		endTime: {
			type: dataType.DATE,
			allowNull: false,
		},

		isHandled: {
			type: dataType.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = Overtime;
