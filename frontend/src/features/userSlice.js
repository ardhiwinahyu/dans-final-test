import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id: null,
	email: null,
	username: null,
	id_role: null,
	isLoading: true,
	isLogin: false,
	listMenu: {
		dashboard: false,
		absensi: false,
		requestOvertime: false,
		requestReimburstment: false,
		pengumuman: false,
		historyOvertime: false,
		historyReimburstment: false,
		overtimeApproval: false,
		reimbursementApproval: false,
	},
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		addUser: (state, action) => {
			console.log(state);
			state.id = action.payload.id;
			state.email = action.payload.email;
			state.id_role = action.payload.id_role;
			state.username = action.payload.username;
			state.isLoading = action.payload.isLoading;
			state.isLogin = action.payload.isLogin;
			state.listMenu = action.payload.listMenu;
		},
	},
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
