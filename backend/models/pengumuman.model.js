const Sequelize = require("sequelize");
const db = require("../configs/database");
const dataType = Sequelize.DataTypes;

const Pengumuman = db.define(
	"pengumuman",
	{
		pengumuman_id: {
			type: dataType.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},

		isi_pengumuman: {
			type: dataType.TEXT,
			allowNull: false,
		},

		publish_data: {
			type: dataType.DATE,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = Pengumuman;
