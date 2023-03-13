const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASS,
	},
});

///Untuk karyawan///
const sendAprrovedReimbursement = async function (karyawan, isApproved) {
	const options = {
		from: "'no-reply' <no-reply@gmail.com>",
		to: karyawan.user_email,
		subject: "Reimbursement anda telah ditangani",
		text: `Halo ${karyawan.user_name}. Reimbursement kamu telah ${isApproved ? "disetujui" : "ditolak"}.`,
	};

	transporter.sendMail(options, (error, info) => {
		if (error) {
			console.log(error);
		}

		console.log(info);
		console.log(`Email telah terkirim ke : ${karyawan.user_email}`);
	});
};

const sendAprrovedOvertime = async function (karyawan, isApproved) {
	const options = {
		from: "'no-reply' <no-reply@gmail.com>",
		to: karyawan.user_email,
		subject: "Overtime anda telah ditangani",
		text: `Halo ${karyawan.user_name}. Overtime kamu telah ${isApproved ? "disetujui" : "ditolak"}.`,
	};

	transporter.sendMail(options, (error, info) => {
		if (error) {
			console.log(error);
		}

		console.log(info);
		console.log(`Email telah terkirim ke : ${karyawan.user_email}`);
	});
};

///Untuk HR
const sendEmailOvertime = (dataHr, dataKaryawan) => {
	const options = {
		from: "'no-reply-hr-overtime' <no-reply@gmail.com>",
		to: dataHr.hr_email,
		subject: "Karyawan Mengajukan Overtime",
		text: `Halo hr, ${dataHr.hr_name}. Karyawan ${dataKaryawan.user_name} Mengajukan Overtime, segera cek listnya`,
	};

	transporter.sendMail(options, (error, info) => {
		if (error) {
			console.log(error);
		}

		console.log(info);
		console.log(`Email telah terkirim ke : ${dataUser.hr_email}`);
	});
};

const sendEmailReimbursement = (dataHr, dataKaryawan) => {
	const options = {
		from: "'no-reply-hr-reimbursement' <no-reply@gmail.com>",
		to: dataHr.hr_email,
		subject: "Karyawan Mengajukan Reimbursement",
		text: `Halo hr, ${dataHr.hr_name}. Karyawan ${dataKaryawan.user_name} Mengajukan Reimbursement, segera cek listnya`,
	};

	transporter.sendMail(options, (error, info) => {
		if (error) {
			console.log(error);
		}

		console.log(info);
		console.log(`Email telah terkirim ke : ${dataUser.hr_email}`);
	});
};

const getAllHr = async function () {
	try {
		const allHr = await User.findAll({ where: { user_role: 150 } });
		const hrObj = [];
		allHr.forEach((item) => {
			hrObj.push({ hr_name: item.user_name, hr_email: item.user_email });
		});

		console.log(hrObj);
		return hrObj;
	} catch (error) {
		console.log(error);
	}
};

const sendToHrOvertime = async function (dataKaryawan) {
	try {
		const hrData = await getAllHr();

		hrData.forEach((item) => {
			sendEmailOvertime(item, dataKaryawan);
		});
	} catch (error) {
		console.log(error);
	}
};

const sendToHrReimbursement = async function (dataKaryawan) {
	try {
		const hrData = await getAllHr();

		hrData.forEach((item) => {
			sendEmailReimbursement(item, dataKaryawan);
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = { sendToHrOvertime, sendToHrReimbursement, sendAprrovedOvertime, sendAprrovedReimbursement };
