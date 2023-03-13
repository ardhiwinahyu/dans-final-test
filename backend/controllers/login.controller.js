const User = require("../models/user.model");
const Roles_to_menus = require("../models/roles_to_menus.model");
const bcrypt = require("bcrypt");

const loginKaryawan = async (req, res, next) => {
	try {
		const user = await User.findOne({ where: { user_email: req.body.email } });

		if (user === null) {
			res.status(400).json({ message: "User tidak ditemukan" });
		}

		const yes = await bcrypt.compare(req.body.password, user.user_password);
		console.log("hao", yes);

		if (await bcrypt.compare(req.body.password, user.user_password)) {
			const menu = await Roles_to_menus.findAll({ where: { role_id: user.user_role } });

			const listMenu = {};

			const sendUserData = {
				id: user.user_id,
				id_role: user.user_role,
				email: user.user_email,
				username: user.user_name,
				listMenu,
			};

			menu.forEach((item) => {
				listMenu[item.menu_id] = true;
			});

			res.status(200).json(sendUserData);
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "Gagal login" });
	}
};

module.exports = loginKaryawan;
