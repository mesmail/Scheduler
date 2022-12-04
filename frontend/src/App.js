import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Redirect, Route, Switch } from "react-router-dom";
import SignIn from "./layouts/SignIn";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "./layouts/SignUp";
import Navbar from "./components/navbar/navbar.component";
import Home from "./layouts/Home";
import EventBooking from "./layouts/EventBooking";
import RequiredAuth from "./utils/RequiredAuth";

import { GetAllEvents } from "./redux/eventsSice/eventSlice";
import Account from "./layouts/Account";
import UserEvents from "./layouts/UserEvents";
import Help from "./layouts/Help";
import About from "./layouts/About";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllEvents());
  }, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />

      <Box sx={{ bgcolor: "background.default" }} className="main">
        <Navbar />
        <Switch>
          <Route exact component={Home} path="/" />
          <Route exact component={Help} path="/help" />

          <Route exact component={About} path="/about" />

          <Route
            exact
            render={() => (
              <RequiredAuth>
                <Account />
              </RequiredAuth>
            )}
            path="/account/"
          />
          <Route
            render={() => (
              <RequiredAuth>
                <UserEvents />
              </RequiredAuth>
            )}
            path="/account/events"
          />
          <Route
            render={() => (
              <RequiredAuth>
                <EventBooking />
              </RequiredAuth>
            )}
            path="/events/book/:eventId"
          />
          <Route
            exact
            render={() => (isAuthenticated ? <Redirect to="/" /> : <SignIn />)}
            path="/login"
          />
          <Route
            exact
            render={() => (isAuthenticated ? <Redirect to="/" /> : <SignUp />)}
            path="/signup"
          />
        </Switch>
      </Box>
    </>
  );
}

export default App;
