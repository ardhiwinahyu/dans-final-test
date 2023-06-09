import React, { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import dateFormat from "dateformat";
import axios from "axios";
import { useSelector } from "react-redux";

function RequestOvertime() {
	const { id } = useSelector((store) => store.user);

	const [userId, setUserId] = useState("");

	useEffect(() => {
		setUserId(id);
	}, [id, userId]);

	const defaultData = {
		startdate: null,
		enddate: null,
		reason: null,
	};

	const [data, setData] = useState(defaultData);

	const handleSubmit = (e) => {
		e.preventDefault();
		const sendData = async () => {
			try {
				const send = await axios.post(
					`http://localhost:5000/overtime/createovertime`,
					{
						startTime: dateFormat(new Date(data.startdate), "yyyy-mm-dd HH:MM:ss"),
						endTime: dateFormat(new Date(data.enddate), "yyyy-mm-dd HH:MM:ss"),
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
			<h2>RequestOvertime</h2>
			<Form method="post" onSubmit={handleSubmit}>
				<label htmlFor="startdate">
					Start
					<input type="datetime-local" name="startdate" onChange={handleChange} />
				</label>
				<label htmlFor="enddate">
					End
					<input type="datetime-local" name="enddate" onChange={handleChange} />
				</label>
				<label htmlFor="reason">
					<input type="text" name="reason" onChange={handleChange} />
				</label>

				<button type="submit">Sumbit</button>
			</Form>
		</div>
	);
}

export default RequestOvertime;
