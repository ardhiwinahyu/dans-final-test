import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";

function HistoryLembur() {
	const { email } = useSelector((store) => store.user);
	const [data, setData] = useState();
	const [isData, setIsData] = useState(false);

	useEffect(() => {
		const getListReimbursement = async () => {
			try {
				const list = await axios.post(
					`http://localhost:5000/overtime/historyovertime`,
					{
						user_email: email,
					},
					{ headers: { "content-type": "application/json" } }
				);
				const res = await list.data;
				setData(res.list);
				setIsData(true);
				console.log(res.list);
			} catch (error) {
				console.log(error);
			}
		};

		getListReimbursement();
	}, []);

	return (
		<div>
			<h2>History Lembur</h2>

			{isData &&
				data.map((item) => {
					return (
						<div className="border-black" key={item.overtime_id}>
							<ul>
								<li>Nama: {item.user_name}</li>
								<li>Email: {item.user_email}</li>
								<li>Overtime ID : {item.overtime_id}</li>
								<li>Alasan Lembur: {item.overtime_reason}</li>
								<li>Jam Mulai : {dateFormat(new Date(item.startTime), "yyyy-mm-dd HH:MM:ss")}</li>
								<li>Jam Selesai : {dateFormat(new Date(item.endTime), "yyyy-mm-dd HH:MM:ss")}</li>
								<li>{item.isHandled === 1 ? "Sudah di tangani oleh HR" : "Belum ditangani oleh HR"}</li>
								<li>{item.isApproved === 1 ? "Ajuan Lembur diterima oleh HR" : ""}</li>
								<li>{item.isHandled === 1 && item.isApproved === 0 ? "Ajuan Lembur ditolak oleh HR" : ""}</li>
							</ul>
						</div>
					);
				})}
		</div>
	);
}

export default HistoryLembur;
