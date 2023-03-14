const Pengumuman = require("../models/pengumuman.model");

const createPengumuman = async function (req, res, next) {
	try {
		const inputPengumuman = await Pengumuman.create({ publish_data: req.body.publish_data, isi_pengumuman: req.body.isi_pengumuman });
		res.status(200).json({ message: "Pengumuman didaftarkan", inputPengumuman });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "Terjadi kesalahan" });
	}
};

module.exports = { createPengumuman };
