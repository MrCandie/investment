import React, { Fragment } from "react";
import Header from "../UI/header/Header";
import Navigation from "../UI/navigation/Navigation";
import Search from "../UI/Search";
import Userlist from "./Userlist";

export default function Users({ user }) {
  return (
    <Fragment>
      <Header />
      <div className="bg-mobile">
        <div className="mobile  h-[700px] bg-orange-600 flex flex-col space-y-6">
          <Search text="user" />
          <hr />
          <Userlist user={user} />
        </div>
      </div>
      <Navigation />
    </Fragment>
  );
}
