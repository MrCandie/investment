import React, { Fragment, useContext } from "react";
import Login from "../../components/auth/Login";
import Profile from "../../components/profile/Profile";
import Header from "../../components/UI/header/Header";
import Navigation from "../../components/UI/navigation/Navigation";
import { AppContext } from "../../util/context";

export default function Index() {
  const ctx = useContext(AppContext);
  return (
    <Fragment>
      {ctx.isLoggedIn ? (
        <>
          <Header />
          <Profile />
          <Navigation />
        </>
      ) : (
        <Login />
      )}
    </Fragment>
  );
}
