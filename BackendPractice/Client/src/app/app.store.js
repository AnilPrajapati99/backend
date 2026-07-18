import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feauter/auth/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
