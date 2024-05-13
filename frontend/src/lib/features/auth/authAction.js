import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: 0,
  isAuthenticated: false,
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {},
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isAuthenticated = true;
      // Access user data directly from the payload
      state.user = action.payload;
    },
    logout(state) {
      localStorage.removeItem("user");
      state.isAuthenticated = false;
      state.user = {};
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    updateNotification(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { login, logout, updateUser, updateNotification } = auth.actions;

export default auth.reducer;
