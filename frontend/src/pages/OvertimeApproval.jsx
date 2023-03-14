import axios from "axios";
import React, { useState, useEffect } from "react";

function OvertimeApproval() {
	const [data, setData] = useState();

	useEffect(() => {
		const getListOvertime = async () => {
			try {
				const list = await axios.get(`http://localhost:5000/overtime/listovertime`);
				const res = await list.data;
				setData(res);
				console.log(res.overtimeData);
			} catch (error) {
				console.log(error);
			}
		};

		getListOvertime();
	}, []);

	return (
		<div>
			<h2>Overtime Approval</h2>
		</div>
	);
}

export default OvertimeApproval;
