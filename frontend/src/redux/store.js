import React from "react";
import { Provider } from "react-redux";
import {
  setCurrentUser,
  authSuccess,
  getCurrentUser,
} from "./authSlice/login.slice";
import { isEmpty } from "../utils/utils";
import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";

let store;
const Root = ({ children, initialState = {} }, props) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });
  // check localStorage
  if (!isEmpty(localStorage.getItem("token"))) {
    store.dispatch(authSuccess(localStorage.getItem("token")));
    store.dispatch(getCurrentUser());
  }
  // if (!isEmpty(localStorage.getItem("user"))) {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   store.dispatch(setCurrentUser(user));
  // }

  return <Provider store={store}>{children}</Provider>;
};
export { store };
export default Root;
