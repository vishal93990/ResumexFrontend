import { createSlice } from "@reduxjs/toolkit";


const accessToken = localStorage.getItem("accessToken");
const user = localStorage.getItem("user");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: accessToken || null,
    user: user ? JSON.parse(user) : null,
    loading: false,
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
