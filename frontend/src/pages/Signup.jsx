import React, { useState } from "react";
import { useNavigate, Form } from "react-router-dom";
import axios from "axios";

function Signup() {
	const navigate = useNavigate();

	const defaultData = {
		username: null,
		email: null,
		password: null,
	};

	const [data, setData] = useState(defaultData);

	const handleSubmit = (e) => {
		e.preventDefault();
		const sendData = async () => {
			try {
				const send = await axios.post(
					`http://localhost:5000/users/signup`,
					{
						user_name: data.username,
						user_password: data.password,
						user_email: data.email,
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
		navigate("/login");
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
			<h2>Sign Up</h2>
			<Form method="post" onSubmit={handleSubmit}>
				<label htmlFor="username">
					<span>Nama</span>
					<input type="text" name="username" required onChange={handleChange} />
				</label>

				<label htmlFor="email">
					<span>Email</span>
					<input type="email" name="email" required onChange={handleChange} />
				</label>

				<label htmlFor="password">
					<span>Password</span>
					<input type="password" name="password" required onChange={handleChange} />
				</label>
				<button type="submit">Sign Up</button>
			</Form>
		</div>
	);
}

export default Signup;
