import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";

function Absensi() {
	const { id } = useSelector((store) => store.user);

	const [userId, setUserId] = useState("");

	useEffect(() => {
		setUserId(id);
	}, [id, userId]);

	const handleHadir = function (e) {
		e.preventDefault();

		const sendData = async () => {
			try {
				const send = await axios.post(
					`http://localhost:5000/presence/present`,
					{
						id: userId,
					},
					{ headers: { "content-type": "application/json" } }
				);

				const data2 = await send.data;
				console.log(data2);
			} catch (error) {
				console.log(error);
			}
		};

		sendData();

		console.log("id", id);
	};

	const handlePulang = function (e) {
		e.preventDefault();

		const sendData = async () => {
			try {
				const send = await axios.post(
					`http://localhost:5000/presence/leave`,
					{
						id: userId,
					},
					{ headers: { "content-type": "application/json" } }
				);

				const data2 = await send.data;
				console.log(data2);
			} catch (error) {
				console.log(error);
			}
		};

		sendData();
	};

	return (
		<div>
			<h2>Absensi</h2>
			<Form method="post">
				<input type="button" value="Absen Hadir" onClick={handleHadir} />
				<input type="button" value="Absen Pulang" onClick={handlePulang} />
			</Form>
		</div>
	);
}

export default Absensi;
