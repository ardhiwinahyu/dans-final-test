const User = require("../models/user.model");
const Role = require("../models/role.model");

const getProfile = async function (req, res, next) {
	try {
		const findId = await User.findOne({
			where: {
				user_id: req.body.id,
			},
		});

		const findIdRole = await Role.findOne({
			where: {
				role_id: findId.user_role,
			},
		});

		res.status(200).json({
			id: findId.user_id,
			role: findIdRole.nama_role,
			email: findId.user_email,
		});
	} catch (error) {
		res.status(400).json({
			message: "User tidak ditemukan",
		});
	}
};

module.exports = getProfile;
