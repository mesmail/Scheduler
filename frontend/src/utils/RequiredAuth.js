import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../components/loading-component/loading-component";

function RequireAuth({ children }) {
  const history = useHistory();

  const { isAuthenticated, user, AuthSuccessLoading } = useSelector(
    (state) => state.auth
  );
  if (AuthSuccessLoading) return <Loading />;
  if (!isAuthenticated) history.push("/login");

  return children;
}

export default memo(RequireAuth);
