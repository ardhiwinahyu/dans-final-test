import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";

export default function Dashboard() {
	const { isLoading, username, email, id_role } = useSelector((store) => store.user);

	const [user, setUser] = useState({});

	useEffect(() => {
		setUser(username);
	}, [isLoading, username]);

	console.log(username);

	if (isLoading) {
		return <h2>Login atau Sign Up Terlebih dahulu</h2>;
	}

	return (
		<div className="listProducts">
			<h2>Halo, nama lengkap saya {username}</h2>
			<h2>Email saya {email}</h2>
			<h2>Kode role saya : {id_role}</h2>
		</div>
	);
}
