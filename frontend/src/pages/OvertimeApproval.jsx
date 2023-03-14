import axios from "axios";
import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";

function OvertimeApproval() {
	//const { id } = useSelector((store) => store.user);
	const [data, setData] = useState();
	const [isData, setIsData] = useState(false);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		const getListOvertime = async () => {
			try {
				const list = await axios.get(`http://localhost:5000/overtime/listovertime`);
				const res = await list.data;
				setData(res.overtimeData);
				setIsData(true);
				console.log(res.overtimeData);
			} catch (error) {
				console.log(error);
			}
		};

		getListOvertime();
	}, [refresh]);

	const handleApprove = function (e) {
		const overId = e.target.dataset.id;
		const sendApprove = async () => {
			try {
				const data = await axios.put(
					`http://localhost:5000/overtime/handleovertime`,
					{
						isApproved: true,
						id: overId,
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
		const overId = e.target.dataset.id;
		const sendReject = async () => {
			try {
				const data = await axios.put(
					`http://localhost:5000/overtime/handleovertime`,
					{
						isApproved: false,
						id: overId,
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
			<h2>Overtime Approval</h2>

			{isData &&
				data.map((item) => {
					return (
						<div className="border-black" key={item.overtime_id}>
							<ul>
								<li>Nama: {item.user_name}</li>
								<li>Email: {item.user_email}</li>
								<li>Overtime id : {item.overtime_id}</li>
								<li>Alasan lembur: {item.overtime_reason}</li>
								<li>Waktu mulai : {dateFormat(new Date(item.startTime), "yyyy-mm-dd HH:MM:ss")}</li>
								<li>Waktu selesai: {dateFormat(new Date(item.endTime), "yyyy-mm-dd HH:MM:ss")}</li>
								<button onClick={handleApprove} data-id={item.overtime_id}>
									Terima
								</button>
								<button onClick={handleReject} data-id={item.overtime_id}>
									Tolak
								</button>
							</ul>
						</div>
					);
				})}
		</div>
	);
}

export default OvertimeApproval;
