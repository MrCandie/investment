import React, { Fragment, useState } from "react";
import ChangePassword from "./changePassword";
import EditProfile from "./EditProfile";
import Menu from "./Menu";
import User from "./User";

export default function Profile() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  return (
    <Fragment>
      <div className="bg">
        <div className="flex flex-col w-full">
          <User />
          <Menu setShow1={setShow1} setShow={setShow} />
        </div>
      </div>
      {show && <EditProfile setShow={setShow} />}
      {show1 && <ChangePassword setShow={setShow1} />}
    </Fragment>
  );
}
