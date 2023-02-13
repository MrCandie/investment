import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function signupHandler(e) {
    e.preventDefault();

    const data = {
      email,
      firstName,
      lastName,
      password,
      passwordConfirm,
    };
    console.log(data);
    router.push("/start");
  }
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-orange-100">
      <div className="bg-orange-400 w-[90%] lg:w-[40%] p-8 rounded-lg shadow-xl flex flex-col space-y-10">
        <h1 className="text-orange-800 text-center text-lg lg:text-3xl capitalize font-bold">
          sign up
        </h1>
        <form onSubmit={signupHandler} className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between md:space-x-6 lg:space-x-6 md:space-y-0 lg:space-y-0 space-y-6">
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="w-full md:w-1/2 lg:w-1/2 input"
              type="text"
              placeholder="First Name"
            />
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="w-full md:w-1/2 lg:w-1/2 input"
              type="text"
              placeholder="Last Name"
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
          <button className="button">sign up</button>
        </form>
        <p className="flex items-center capitalize text-white text-sm md:text-lg space-x-2 justify-center ">
          already have an account?
          <Link href="/account/login" className="text-white underline">
            login here
          </Link>
        </p>
      </div>
    </div>
  );
}
