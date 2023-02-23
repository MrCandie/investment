import React, { Fragment, useContext, useState } from "react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

import Link from "next/link";
import { createDashboard, signup } from "../../util/auth";
import Notification from "../UI/notification/Notification";
import Spinner from "../UI/spinner/Spinner";
import { AppContext } from "../../util/context";

export default function Register() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const authCtx = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({
    text: "",
    title: "",
    status: "",
  });

  async function signupHandler(e) {
    e.preventDefault();

    const data = {
      email: email.toLowerCase(),
      name: fullName.toLowerCase(),
      password,
      passwordConfirm,
    };

    try {
      setLoading(true);
      const response = await signup(data);
      localStorage.setItem("token", response.token);
      setCookie("token", "Bearer " + response.token);
      localStorage.setItem("id", response.data.user._id);
      const userId = localStorage.getItem("id");
      const dashboard = await createDashboard(userId, {}, response.token);

      authCtx.login(response.token, response.data.user);
      setLoading(false);
      setNotification({
        title: "success",
        text: "sign up successful",
        status: "success",
      });

      setShow(true);
      setTimeout(() => setShow(false), 1000);
      router.replace("/start");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setNotification({
        title: "sign up error",
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
          <h1 className="text-orange-800 text-center text-lg lg:text-3xl capitalize font-bold">
            sign up
          </h1>
          <form onSubmit={signupHandler} className="flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between md:space-x-6 lg:space-x-6 md:space-y-0 lg:space-y-0 space-y-6">
              <input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                className="w-full input"
                type="text"
                placeholder="Full Name"
              />
            </div>
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
            <input
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
              className="input"
              type="password"
              placeholder="Confirm Password"
            />
            <div className="flex items-center cursor-pointer space-x-2 justify-center">
              <input className="md:input" type="checkbox" id="accept" />
              <label
                className="capitalize text-white text-xs md:text-lg font-normal"
                htmlFor="accept"
              >
                i accept the term of use & privacy policy
              </label>
            </div>
            <button disabled={loading} className="button">
              {loading ? "Loading..." : "sign up"}
            </button>
          </form>
          <p className="flex items-center capitalize text-white text-sm md:text-lg space-x-2 justify-center ">
            already have an account?
            <Link href="/account/login" className="text-white underline">
              login here
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
    </Fragment>
  );
}
