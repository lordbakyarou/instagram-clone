import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const postOpenSlice = createSlice({
  name: "post-open",
  initialState,
  reducers: {
    openPost: (state) => !state,
  },
});

export const { openPost } = postOpenSlice.actions;

export default postOpenSlice.reducer;
