import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice/login.slice";
import eventSlice from "./eventsSice/eventSlice";
import userEvents from "./userEventSlice/userEvents";

const rootReducer = combineReducers({
  auth: authSlice,
  events: eventSlice,
  userEvents: userEvents,
});

export default rootReducer;
