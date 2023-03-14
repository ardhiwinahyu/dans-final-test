const nodemailer = require("nodemailer");
require("dotenv").config();

const User = require("./models/user.model");
const Overtime = require("./models/overtime.model");
const Reimbursement = require("./models/reimbursement.model");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASS,
	},
});

const sendEmail = (dataUser) => {
	const options = {
		from: "'no-reply-hr-reminder' <no-reply@gmail.com>",
		to: dataUser.hr_email,
		subject: "Penanganan Overtime dan Reimbursement",
		text: `Halo hr, ${dataUser.hr_name}. Ada Overtime / Reimbursement yang belum kamu tangani.`,
	};

	transporter.sendMail(options, (error, info) => {
		if (error) {
			console.log(error);
		}

		console.log(info);
		console.log(`Email telah terkirim ke : ${dataUser.hr_email}`);
	});
};

const isHandledOvertime = async function () {
	try {
		const handledOvertime = await Overtime.findOne({ where: { isHandled: false } });

		if (handledOvertime === null) {
			return true;
		}

		return false;
	} catch (error) {
		console.log(error);
	}
};

const isHandledReimbursement = async function () {
	try {
		const handledReimbursement = await Reimbursement.findOne({ where: { isHandled: false } });

		if (handledReimbursement === null) {
			return true;
		}

		return false;
	} catch (error) {
		console.log(error);
	}
};

//////////////////////////////////////

/////////////////////////////
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

const sendToHr = async function () {
	try {
		const hrData = await getAllHr();
		const overtime = await isHandledOvertime();
		const reimbursement = await isHandledReimbursement();

		// console.log("cek", overtime, reimbursement);
		// console.log(hrData);

		// sendEmail(hrData[0]);
		if (overtime && reimbursement) {
			return;
		}

		if (overtime === false || reimbursement === false) {
			hrData.forEach((item) => {
				sendEmail(item);
			});
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = { sendToHr };
