import axios from "axios";
import React, { useState, useEffect } from "react";

function ReimbursementApproval() {
	//const { id } = useSelector((store) => store.user);
	const [data, setData] = useState();
	const [isData, setIsData] = useState(false);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		const getListOvertime = async () => {
			try {
				const list = await axios.get(`http://localhost:5000/reimbursement/listreimbursement`);
				const res = await list.data;
				setData(res.reimbursementData);
				setIsData(true);
				console.log(res.reimbursementData);
			} catch (error) {
				console.log(error);
			}
		};

		getListOvertime();
	}, [refresh]);

	const handleApprove = function (e) {
		const reimId = e.target.dataset.id;
		const sendApprove = async () => {
			try {
				const data = await axios.put(
					`http://localhost:5000/reimbursement/handlereimbursement`,
					{
						isApproved: true,
						id: reimId,
					},
					{ headers: { "content-type": "application/json" } }
				);
				const res = await data.data;
				setRefresh(!refresh);
				console.log(res);
			} catch (error) {
				console.log(error);
			}
		};

		sendApprove();
	};

	const handleReject = function (e) {
		const reimId = e.target.dataset.id;
		const sendReject = async () => {
			try {
				const data = await axios.put(
					`http://localhost:5000/reimbursement/handlereimbursement`,
					{
						isApproved: false,
						id: reimId,
					},
					{ headers: { "content-type": "application/json" } }
				);
				const res = await data.data;
				setRefresh(!refresh);
				console.log(res);
			} catch (error) {
				console.log(error);
			}
		};

		sendReject();
	};

	return (
		<div>
			<h2>Reimbursement Approval</h2>

			{isData &&
				data.map((item) => {
					return (
						<div className="border-black" key={item.reimbursement_id}>
							<ul>
								<li>Nama: {item.user_name}</li>
								<li>Email: {item.user_email}</li>
								<li>Reimbursement id : {item.reimbursement_id}</li>
								<li>List Reimbursement: {item.reimbursement_reason}</li>

								<button onClick={handleApprove} data-id={item.reimbursement_id}>
									Terima
								</button>
								<button onClick={handleReject} data-id={item.reimbursement_id}>
									Tolak
								</button>
							</ul>
						</div>
					);
				})}
		</div>
	);
}

export default ReimbursementApproval;
