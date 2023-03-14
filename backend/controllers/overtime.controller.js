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

		if (overtime === null) {
			res.status(200).json({ overtimeData: [] });
		}

		res.status(200).json({ overtimeData: overtime });
	} catch (error) {
		res.status(400).json({ message: "Tidak dapat mendapatkan data" });
	}
};

const handleOvertime = async function (req, res, next) {
	try {
		const reqId = Number(req.body.id);
		const overtime = await Overtime.findOne({ where: { overtime_id: reqId } });

		console.log(typeof reqId);
		if (overtime === null) {
			return;
		}

		const isApproved = req.body.isApproved;
		console.log(isApproved);

		if (isApproved === true) {
			await Overtime.update({ isApproved: true, isHandled: true }, { where: { overtime_id: reqId } });
			sendAprrovedOvertime(overtime, true);
			res.json({ message: "Overtime berhasil di update ke approved" });
		}

		if (isApproved === false) {
			await Overtime.update({ isApproved: false, isHandled: true }, { where: { overtime_id: reqId } });
			sendAprrovedOvertime(overtime, false);
			res.json({ message: "Overtime berhasil di update ke reject" });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "Tidak berhasil mengubah data" });
	}
};

const historyOvertime = async function (req, res, next) {
	try {
		console.log("email", req.body.user_email);
		const listOvertime = await Overtime.findAll({ where: { user_email: req.body.user_email }, raw: true, nest: true });
		if (listOvertime === null) {
			res.status(400).json({ list: [] });
		}

		res.status(200).json({ list: listOvertime });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "Tidak dapat mengambil data" });
	}
};

module.exports = {
	createOvertime,
	listOvertime,
	handleOvertime,
	historyOvertime,
};
