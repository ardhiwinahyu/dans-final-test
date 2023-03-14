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
import Reimbursement from "./pages/Reimbursement";
import OvertimeApproval from "./pages/OvertimeApproval";
import ReimbursementApproval from "./pages/ReimbursementApproval";
import HistoryReimbursement from "./pages/HistoryReimbursement";
import HistoryLembur from "./pages/HistoryLembur";
import Pengumuman from "./pages/Pengumuman";

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
							<NavLink to="">Dashboard</NavLink>
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

					{requestReimburstment && (
						<li>
							<NavLink to="requestreimbursement">Klaim Reimbursement</NavLink>
						</li>
					)}

					{pengumuman && (
						<li>
							<NavLink to="pengumuman">Pengumuman</NavLink>
						</li>
					)}

					{historyOvertime && (
						<li>
							<NavLink to="historyovertime">History Lembur</NavLink>
						</li>
					)}

					{historyReimburstment && (
						<li>
							<NavLink to="historyreimburstment">History Reimbursement</NavLink>
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
					)}
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
				<Route path="requestreimbursement" element={<Reimbursement />} />
				<Route path="overtimeapproval" element={<OvertimeApproval />} />
				<Route path="reimbursementapproval" element={<ReimbursementApproval />} />
				<Route path="historyreimburstment" element={<HistoryReimbursement />} />
				<Route path="historyovertime" element={<HistoryLembur />} />
				<Route path="pengumuman" element={<Pengumuman />} />
			</Route>
		</>
	)
);

export default App;
