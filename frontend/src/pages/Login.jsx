import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";

export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const defaultData = {
		email: null,
		password: null,
	};

	const [data, setData] = useState(defaultData);

	const handleSubmit = (e) => {
		e.preventDefault();
		const sendData = async () => {
			try {
				const send = await axios.post(
					`http://localhost:5000/user/login`,
					{
						email: data.email,
						password: data.password,
					},
					{ headers: { "content-type": "application/json" } }
				);

				const dataRes = await send.data;

				const dataModified = { ...dataRes, isLoading: false, isLogin: true };
				console.log(dataModified);

				dispatch(addUser(dataModified));
			} catch (error) {
				console.log(error);
			}
		};

		sendData();
		navigate("/dashboard");
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
		<div className="login">
			<div className="login">
				<h2>Login</h2>
				<Form method="post" onSubmit={handleSubmit}>
					<label htmlFor="email">
						<span>User Name</span>
						<input type="email" name="email" required onChange={handleChange} />
					</label>

					<label htmlFor="password">
						<span>Password</span>
						<input type="password" name="password" required onChange={handleChange} />
					</label>

					<button type="submit">Login</button>
				</Form>
			</div>
		</div>
	);
}
