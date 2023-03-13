const Sequelize = require("sequelize");
const dataType = Sequelize.DataTypes;

const User = require("../models/user.model");
const Absensi = require("../models/absensi.model");

const leave = async function (req, res, next) {
	try {
		const user = await User.findOne({ where: { user_id: req.body.id } });
		const insertLeave = await Absensi.findOne({ where: { user_email: user.user_email, leave_hour: null } });

		if (insertLeave === null) {
			res.status(400).json({ message: "Anda sudah absen pulang" });
		}

		await Absensi.update(
			{
				leave_hour: Sequelize.fn("NOW"),
			},
			{
				where: {
					user_email: user.user_email,
					leave_hour: null,
				},
			}
		);

		res.status(201).json({ message: "Berhasil absen pulang" });
	} catch (error) {
		res.status(400).json({ message: "Tidak berhasil absen pulang" });
	}
};

module.exports = leave;
