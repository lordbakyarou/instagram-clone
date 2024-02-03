import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    username: "",
    fullname: "",
    email: "",
    description: "",
    profile: "",
    _id: "",
  },
  followers: [],
  following: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      // console.log(state, "this is action");

      state.userInfo.username = action.payload.username;
      state.userInfo.fullname = action.payload.fullname;
      state.userInfo.email = action.payload.email;
      state.userInfo.description = action.payload.description;
      state.userInfo.profile = action.payload.profile;
      state.userInfo._id = action.payload._id;
    },
    setFollowers: (state, action) => {
      // console.log(action, "this is followers");
      state.followers = [...action.payload.followers];
    },
    addRemoveFollowing: (state, action) => {
      if (!state.following.includes(action.payload)) {
        state.following = [...state.following, action.payload];
      } else {
        const newFollowing = [];
        for (let i = 0; i < state.following.length; i++) {
          if (action.payload != state.following[i]) {
            newFollowing.push(state.following[i]);
          }
        }
        state.following = [...newFollowing];
      }

      // console.log(state.following);
    },
    setFollowing: (state, action) => {
      state.following = [...action.payload.followings];
    },
  },
});

export const { setUserInfo, setFollowers, setFollowing, addRemoveFollowing } =
  userSlice.actions;

export default userSlice.reducer;
