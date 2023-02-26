import React, { Fragment, useState } from "react";
import Header from "../../UI/header/Header";

import { BsArrowLeft } from "react-icons/bs";

import { useRouter } from "next/router";
import EditUser from "./EditUser";
import Spinner from "../../UI/spinner/Spinner";
import Delete from "../Delete";
import { deleteUser } from "../../../util/auth";

export default function UserDetails({ user }) {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  if (!user) {
    return <Spinner />;
  }

  const router = useRouter();

  return (
    <Fragment>
      <Header />
      <div className="bg-mobile">
        <div className="mobile h-[700px] bg-orange-600 flex flex-col space-y-6">
          <div className="user-detail">
            <span
              onClick={() => router.replace("/admin/user")}
              className="nav-icon"
            >
              <BsArrowLeft />
            </span>
            <p className="text text-white">
              {user.name?.split(" ")[0]}'s details
            </p>
          </div>
          <hr />
          <div className="flex flex-col space-y-6">
            <div className="user-detail">
              <div className="flex items-start w-[50%] flex-col space-y-2">
                <p className="h2">name</p>
                <p className="h4">{user.name}</p>
              </div>
              <div className="flex w-[50%] items-end flex-col space-y-2">
                <p className="h2">email</p>
                <p className="h4">{user.email}</p>
              </div>
            </div>

            <div className="user-detail">
              <div className="flex items-start w-[50%] flex-col space-y-2">
                <p className="h2">role</p>
                <p className="h4">{user.role}</p>
              </div>
              <div className="flex w-[50%] items-end flex-col space-y-2">
                <p className="h2">verified</p>
                <p className="h4">{user.emailIsVerified ? "true" : "false"}</p>
              </div>
            </div>

            <div className="user-detail">
              <div className="flex items-start w-[50%] flex-col space-y-2">
                <p className="h2">profile ID</p>
                <p className="h4">{user.profileId}</p>
              </div>
              <div className="flex w-[50%] items-end flex-col space-y-2">
                <p className="h2">referral code</p>
                <p className="h4">{user.referralCode}</p>
              </div>
            </div>

            <div className="user-detail">
              <div className="flex items-start w-[50%] flex-col space-y-2">
                <p className="h2">created At</p>
                <p className="h4">{user.createdAt}</p>
              </div>
              <div className="flex w-[50%] items-end flex-col space-y-2">
                <p className="h2">database ID</p>
                <p className="h4">{user._id}</p>
              </div>
            </div>
            <hr className="hr" />
            <div className="action ">
              <button
                onClick={() => setShow(true)}
                className="bg-transparent border hover:opacity-75 transition-all duration-300 text-white hover:bg-white hover:text-orange-600 hover:shadow-xl font-bold p-2  capitalize rounded-lg"
              >
                edit user
              </button>
              <button onClick={() => setShow1(true)} className="button">
                delete user
              </button>
            </div>
          </div>
        </div>
      </div>
      {show && <EditUser setShow={setShow} user={user} />}
      {show1 && (
        <Delete
          deleteFn={deleteUser}
          path="/admin/user"
          setShow={setShow1}
          data={user}
        />
      )}
    </Fragment>
  );
}
