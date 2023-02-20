import React, { useContext } from "react";
import Login from "../../components/auth/Login";
import Dashboard from "../../components/dashboard/Dashboard";
import { AppContext } from "../../util/context";

export default function Logins() {
  const ctx = useContext(AppContext);
  return <>{ctx.isLoggedIn ? <Dashboard /> : <Login />}</>;
}
