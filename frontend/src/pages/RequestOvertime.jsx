import React, { useState } from "react";
import { Form } from "react-router-dom";

function RequestOvertime() {
	const defaultData = {
		startdate: null,
		enddate: null,
		reason: null,
	};

	const [data, setData] = useState(defaultData);

	const handleChange = (e) => {
		let val = e.target.value;

		setData((prevState) => {
			return { ...prevState, [e.target.name]: val };
		});

		console.log(val);
		console.log(data);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
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
