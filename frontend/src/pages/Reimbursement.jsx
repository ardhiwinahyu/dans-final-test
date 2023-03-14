import React, { useState, useEffect } from "react";
import { Form } from "react-router-dom";

import axios from "axios";
import { useSelector } from "react-redux";

function Reimbursement() {
	const { id } = useSelector((store) => store.user);

	const [userId, setUserId] = useState("");

	useEffect(() => {
		setUserId(id);
	}, [id, userId]);

	const defaultData = {
		reason: null,
	};

	const [data, setData] = useState(defaultData);

	const handleSubmit = (e) => {
		e.preventDefault();
		const sendData = async () => {
			try {
				const send = await axios.post(
					`http://localhost:5000/reimbursement/createreimbursement`,
					{
						reason: data.reason,
						id: userId,
					},
					{ headers: { "content-type": "application/json" } }
				);

				const dataRes = await send.data;
				console.log(dataRes);
			} catch (error) {
				console.log(error);
			}
		};

		sendData();
	};

	const handleChange = (e) => {
		let val = e.target.value;

		setData((prevState) => {
			return { ...prevState, [e.target.name]: val };
		});

		console.log(val);
		console.log(data);
	};

	return (
		<div>
			<h2>Reimbursement</h2>

			<Form method="post" onSubmit={handleSubmit}>
				<label htmlFor="reason">
					<textarea name="reason" rows="5" cols="33" onChange={handleChange} />
				</label>

				<button type="submit">Sumbit</button>
			</Form>
		</div>
	);
}

export default Reimbursement;
