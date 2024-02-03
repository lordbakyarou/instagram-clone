import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");

const initialState = { token: initialToken || null };

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem("token", action.payload);
      return action.payload;
    },

    removeToken: (state) => {
      // Remove from localStorage
      localStorage.removeItem("token");
      return null;
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;
