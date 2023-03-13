const Sequelize = require("sequelize");
const db = require("../configs/database");
const dataType = Sequelize.DataTypes;
const User = require("./user.model");

const Absensi = db.define(
	"absensi",
	{
		absensi_id: {
			type: dataType.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
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
		attendance_hour: {
			type: dataType.DATE,
		},
		leave_hour: {
			type: dataType.DATE,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = Absensi;
