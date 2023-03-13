const User = require("../models/user.model");
const Reimbursement = require("../models/reimbursement.model");
const { sendToHrReimbursement, sendAprrovedReimbursement } = require("../services/smtp");

const createReimbursement = async function (req, res, next) {
	try {
		const user = await User.findOne({ where: { user_id: req.body.id } });
		await Overtime.create({
			user_email: user.user_email,
			user_name: user.user_name,
			isApproved: false,
			reimbursement_reason: req.body.reason,
			isHandled: false,
		});

		await sendToHrReimbursement(user);

		res.json(201).json({ message: "Berhasil membuat Reimbursement" });
	} catch (error) {
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
	const reimbursement = await Reimbursement.findOne({ where: { reimbursement_id: req.body.id } });

	if (reimbursement === null) {
		res.status(400).json({ message: "Id reimbursement tidak ditemukan" });
		return;
	}

	const isApproved = req.body.isAprroved;

	if (isApproved === true) {
		await Reimbursement.update({ isApproved: true, isHandled: true }, { where: { overtime_id: req.body.id } });
		sendAprrovedReimbursement(reimbursement, true);
		res.json({ message: "Overtime berhasil di update ke approved" });
	}

	if (isApproved === false) {
		await Reimbursement.update({ isApproved: false, isHandled: true }, { where: { overtime_id: req.body.id } });
		sendAprrovedReimbursement(reimbursement, false);
		res.json({ message: "Overtime berhasil di update ke reject" });
	}
};

module.exports = {
	createReimbursement,
	listReimbursement,
	handledReimbursement,
};
