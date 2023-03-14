const User = require("../models/user.model");
const Overtime = require("../models/overtime.model");
const { sendToHrOvertime, sendAprrovedOvertime } = require("../services/smtp");

const createOvertime = async function (req, res, next) {
	try {
		const user = await User.findOne({ where: { user_id: req.body.id } });
		await Overtime.create({
			user_email: user.user_email,
			user_name: user.user_name,
			isApproved: false,
			overtime_reason: req.body.reason,
			startTime: req.body.startTime,
			endTime: req.body.endTime,
			isHandled: false,
		});

		await sendToHrOvertime(user);

		res.status(201).json({ message: "Berhasil membuat overtime" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "Tidak berhasil membuat overtime" });
	}
};

const listOvertime = async function (req, res, next) {
	try {
		const overtime = await Overtime.findAll({ where: { isHandled: false }, raw: true, nest: true });

		res.status(200).json({ overtimeData: overtime });
	} catch (error) {
		res.status(400).json({ message: "Tidak dapat mendapatkan data" });
	}
};

const handleOvertime = async function (req, res, next) {
	const overtime = await Overtime.findOne({ where: { overtime_id: req.body.id } });

	if (overtime === null) {
		return;
	}

	const isApproved = req.body.isAprroved;

	if (isApproved === true) {
		await Overtime.update({ isApproved: true, isHandled: true }, { where: { overtime_id: req.body.id } });
		sendAprrovedOvertime(overtime, true);
		res.json({ message: "Overtime berhasil di update ke approved" });
	}

	if (isApproved === false) {
		await Overtime.update({ isApproved: false, isHandled: true }, { where: { overtime_id: req.body.id } });
		sendAprrovedOvertime(overtime, false);
		res.json({ message: "Overtime berhasil di update ke reject" });
	}
};

module.exports = {
	createOvertime,
	listOvertime,
	handleOvertime,
};
