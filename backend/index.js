const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const User = require("./models/user.model");
const Role = require("./models/role.model");
const Absensi = require("./models/absensi.model");
const Menu = require("./models/menu.model");
const Overtime = require("./models/overtime.model");
const Pengumuman = require("./models/pengumuman.model");
const Reimbursement = require("./models/reimbursement.model");
const Roles_to_menus = require("./models/roles_to_menus.model");
const schedule = require("node-schedule");
const { sendToHr } = require("./cron");

const userRoute = require("./routes/user.route");
const presenceRoute = require("./routes/presence.route");
const overtimeRoute = require("./routes/overtime.route");

const cors = require("cors");
const db = require("./configs/database");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

(async () => {
	try {
		await db.authenticate();
		console.log("Database connected");
		//await Absensi.sync();
		// await Role.sync();
		// await Absensi.sync();
		// await Menu.sync();
		// await Overtime.sync();
		//await Pengumuman.sync();
		// await Reimbursement.sync();
		//await Roles_to_menus.sync();

		// await Menu.create({
		// 	menu_id: "02_absensi",
		// 	menu_name: "absensi",
		// });
	} catch (error) {
		console.log(error);
	}
})();

app.use("/user", userRoute);
app.use("/presence", presenceRoute);
app.use("/overtime", overtimeRoute);

schedule.scheduleJob("0 0 * * *", async function () {
	try {
		await sendToHr();
		console.log("Email terkirim");
	} catch (error) {
		console.log(error);
	}
});

app.listen(5000, () => {
	console.log("Helo");
});
