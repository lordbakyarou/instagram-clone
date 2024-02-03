import { configureStore, combineReducers } from "@reduxjs/toolkit";

import tokenReducer from "../features/token/tokenSlice";
import userReducer from "../features/user/userSlice";
import postOpenReducer from "../features/post/postOpenSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storyOpenSlice from "../features/storyOpen/storyOpenSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  postOpen: postOpenReducer,
  storyOpen: storyOpenSlice,
  // Add other reducers here if needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
