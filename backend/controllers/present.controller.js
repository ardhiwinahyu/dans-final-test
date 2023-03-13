const Sequelize = require("sequelize");
const dataType = Sequelize.DataTypes;

const User = require("../models/user.model");
const Absensi = require("../models/absensi.model");

const present = async function (req, res, next) {
	try {
		const user = await User.findOne({ where: { user_id: req.body.id } });
		await Absensi.create({
			user_email: user.user_email,
			user_name: user.user_name,
			attendance_hour: Sequelize.fn("NOW"),
		});

		res.status(201).json({ message: "Berhasil absen" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "Tidak berhasil absen" });
	}
};

module.exports = present;
