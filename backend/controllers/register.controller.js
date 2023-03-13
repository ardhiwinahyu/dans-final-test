const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const registerKaryawan = async (req, res, next) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const newUser = { user_role: 150, user_email: req.body.email, user_name: req.body.name, user_password: hashedPassword };

		const helo = await User.create(newUser);

		console.log(helo);

		res.status(201).json({ message: "Akun berhasil dibuat" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "Akun tidak berhasil dibuat" });
	}
};

module.exports = registerKaryawan;
