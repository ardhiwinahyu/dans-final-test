const User = require("../models/user.model");
const Reimbursement = require("../models/reimbursement.model");
const { sendToHrReimbursement, sendAprrovedReimbursement } = require("../services/smtp");

const createReimbursement = async function (req, res, next) {
	try {
		const user = await User.findOne({ where: { user_id: req.body.id } });
		await Reimbursement.create({
			user_email: user.user_email,
			user_name: user.user_name,
			isApproved: false,
			reimbursement_reason: req.body.reason,
			isHandled: false,
		});

		await sendToHrReimbursement(user);

		res.status(201).json({ message: "Berhasil membuat Reimbursement" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "Tidak berhasil membuat Reimbursement" });
	}
};

const listReimbursement = async function (req, res, next) {
	try {
		const listReimbursement = await Reimbursement.findAll({ where: { isHandled: false }, raw: true, nest: true });
		res.status(200).json({ reimbursementData: listReimbursement });
	} catch (error) {
		res.status(400).json({ message: "Tidak dapat mendapatkan data" });
	}
};

const handledReimbursement = async function (req, res, next) {
	const reqId = Number(req.body.id);
	const reimbursement = await Reimbursement.findOne({ where: { reimbursement_id: reqId } });

	if (reimbursement === null) {
		res.status(400).json({ message: "Id reimbursement tidak ditemukan" });
		return;
	}

	const isApproved = req.body.isApproved;

	if (isApproved === true) {
		await Reimbursement.update({ isApproved: true, isHandled: true }, { where: { reimbursement_id: reqId } });
		sendAprrovedReimbursement(reimbursement, true);
		res.json({ message: "Reimbursement berhasil di update ke approved" });
	}

	if (isApproved === false) {
		await Reimbursement.update({ isApproved: false, isHandled: true }, { where: { reimbursement_id: reqId } });
		sendAprrovedReimbursement(reimbursement, false);
		res.json({ message: "Reimbursement berhasil di update ke reject" });
	}
};

const historyReimbursement = async function (req, res, next) {
	try {
		console.log("email", req.body.user_email);
		const listReimbursement = await Reimbursement.findAll({ where: { user_email: req.body.user_email }, raw: true, nest: true });
		if (listReimbursement === null) {
			res.status(400).json({ list: [] });
		}

		res.status(200).json({ list: listReimbursement });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "Tidak dapat mengambil data" });
	}
};

module.exports = {
	createReimbursement,
	listReimbursement,
	handledReimbursement,
	historyReimbursement,
};
