import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authAction";
export const Store = configureStore({
  reducer: {
    auth: authReducer,

  },
});
