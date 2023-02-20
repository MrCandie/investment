import React, { Fragment, useEffect, useState, useContext } from "react";
import { getUser } from "../../util/auth";
import { AppContext } from "../../util/context";
import Notification from "../UI/notification/Notification";
import Spinner from "../UI/spinner/Spinner";
import ChangePassword from "./changePassword";
import EditProfile from "./EditProfile";
import Menu from "./Menu";
import User from "./User";

export default function Profile() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    text: "",
    status: "",
  });

  const ctx = useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await getUser(ctx.user.id || id, token);
        setUser(response.data.user);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setMessage({
          title: "Error",
          text: "an unknown error occurred...",
          status: "error",
        });
        setModal(true);
      }
    }
    fetchUser();
  }, [user]);

  return (
    <Fragment>
      <div className="bg">
        <div className="flex flex-col w-full">
          <User user={user} />
          <Menu user={user} setShow1={setShow1} setShow={setShow} />
        </div>
      </div>
      {show && <EditProfile setShow={setShow} />}
      {show1 && <ChangePassword setShow={setShow1} />}
      {modal && (
        <Notification
          title={message.title}
          text={message.text}
          status={message.status}
          setShow={setModal}
        />
      )}
    </Fragment>
  );
}
