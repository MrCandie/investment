import React, { Fragment, useContext, useState } from "react";
import Link from "next/link";
import { setCookie } from "cookies-next";

import { login } from "../../util/auth";
import Spinner from "../UI/spinner/Spinner";
import Notification from "../UI/notification/Notification";
import { AppContext } from "../../util/context";
import { useRouter } from "next/router";
import ForgotPassword from "./ForgotPassword";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const authContext = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [notification, setNotification] = useState({
    text: "",
    title: "",
    status: "",
  });

  async function loginHandler(e) {
    e.preventDefault();

    const data = {
      email: email.toLowerCase(),
      password,
    };
    try {
      setLoading(true);
      const response = await login(data);

      localStorage.setItem("token", response.token);
      localStorage.setItem("id", response.data.user._id);
      setCookie("token", "Bearer " + response.token);
      authContext.login(response.token, response.data.user);
      router.replace("/dashboard");
      setLoading(false);
      setNotification({
        title: "success",
        text: "login successful",
        status: "success",
      });
      setShow(true);
      setTimeout(() => setShow(false), 1000);
    } catch (err) {
      setLoading(false);
      localStorage.removeItem("token");
      setNotification({
        title: "login error",
        text: err.response.data.message,
        status: "error",
      });
      setShow(true);
    }
  }
  return (
    <Fragment>
      <div className="w-full h-[100vh] flex items-center justify-center bg-orange-100">
        <div className="bg-orange-400 w-[90%] lg:w-[40%] p-8 rounded-lg shadow-xl flex flex-col space-y-10">
          <h1 className="text-orange-800 text-center text-3xl capitalize font-bold">
            log in
          </h1>
          <form onSubmit={loginHandler} className="flex flex-col space-y-6">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="input"
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="input"
              type="password"
              placeholder="Password"
            />
            <p
              onClick={() => setPasswordModal(true)}
              className="m-0 text-white text-lg capitalize font-normal cursor-pointer"
            >
              forgot password?
            </p>
            <button disabled={loading} className="button">
              {loading ? "Loading..." : "login"}
            </button>
          </form>
          <p className="flex items-center capitalize text-white text-sm md:text-lg space-x-2 justify-center ">
            don't have an account?
            <Link href="/account/register" className="text-white underline">
              register here
            </Link>
          </p>
        </div>
      </div>
      {show && (
        <Notification
          setShow={setShow}
          title={notification.title}
          text={notification.text}
          status={notification.status}
        />
      )}
      {loading && <Spinner />}
      {passwordModal && <ForgotPassword setPasswordModal={setPasswordModal} />}
    </Fragment>
  );
}
