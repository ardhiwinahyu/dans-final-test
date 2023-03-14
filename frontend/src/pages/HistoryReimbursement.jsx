import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function HistoryReimbursement() {
	const { email } = useSelector((store) => store.user);
	const [data, setData] = useState();
	const [isData, setIsData] = useState(false);

	console.log(email);

	useEffect(() => {
		const getListReimbursement = async () => {
			try {
				const list = await axios.post(
					`http://localhost:5000/reimbursement/historyreimbursement`,
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
			<h2>History Reimbursement</h2>

			{isData &&
				data.map((item) => {
					return (
						<div className="border-black" key={item.reimbursement_id}>
							<ul>
								<li>Nama: {item.user_name}</li>
								<li>Email: {item.user_email}</li>
								<li>List Reimbursement: {item.reimbursement_reason}</li>
								<li>{item.isHandled === 1 ? "Sudah di tangani oleh HR" : "Belum ditangani oleh HR"}</li>
								<li>{item.isApproved === 1 ? "Reimbursement di terima oleh HR" : ""}</li>
								<li>{item.isHandled === 1 && item.isApproved === 0 ? "Reimbursement di tolak oleh HR" : ""}</li>
							</ul>
						</div>
					);
				})}
		</div>
	);
}

export default HistoryReimbursement;
