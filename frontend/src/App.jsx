import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Absensi from "./pages/Absensi";
import RequestOvertime from "./pages/RequestOvertime";

function App() {
	const { dashboard, absensi, requestOvertime, requestReimburstment, pengumuman, historyOvertime, historyReimburstment, overtimeApproval, reimbursementApproval } = useSelector(
		(store) => store.user.listMenu
	);
	const [count, setCount] = useState(0);

	return (
		<div className="root-layout">
			<div className="nav">
				<ul>
					{dashboard && (
						<li>
							<NavLink to="/">Dashboard</NavLink>
						</li>
					)}

					{absensi && (
						<li>
							<NavLink to="absensi">Absensi</NavLink>
						</li>
					)}

					{requestOvertime && (
						<li>
							<NavLink to="requestovertime">Form Lembur</NavLink>
						</li>
					)}

					{/* {requestReimburstment && (
						<li>
							<NavLink to="requestovertime">Klaim Reimbursement</NavLink>
						</li>
					)}

					{pengumuman && (
						<li>
							<NavLink to="pengumuman">Pengumuman</NavLink>
						</li>
					)}

					{historyOvertime && (
						<li>
							<NavLink to="historyovertime">List Lembur</NavLink>
						</li>
					)}

					{historyReimburstment && (
						<li>
							<NavLink to="historyreimbursement">List Reimbursement</NavLink>
						</li>
					)}

					{overtimeApproval && (
						<li>
							<NavLink to="overtimeapproval">Overtime Approval</NavLink>
						</li>
					)}

					{reimbursementApproval && (
						<li>
							<NavLink to="reimbursementapproval">Reimbursement Approval</NavLink>
						</li>
					)} */}
				</ul>
			</div>

			<main className="outlet">
				<Outlet />
			</main>
		</div>
	);
}

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/dashboard" element={<App />}>
				<Route index element={<Dashboard />} />
				<Route path="absensi" element={<Absensi />} />
				<Route path="requestovertime" element={<RequestOvertime />} />
			</Route>
		</>
	)
);

export default App;