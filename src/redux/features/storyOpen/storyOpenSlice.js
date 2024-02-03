import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const storyOpenSlice = createSlice({
  name: "story-open",
  initialState,
  reducers: {
    openStory: (state) => !state,
  },
});

export const { openStory } = storyOpenSlice.actions;

export default storyOpenSlice.reducer;
