import React, { Fragment, useState } from "react";

import { BsArrowLeft } from "react-icons/bs";

import { useRouter } from "next/router";
import Header from "../../UI/header/Header";
import { deleteWithdraw } from "../../../util/auth";

import Delete from "../Delete";
import UpdateWithdrawal from "./UpdateWithdrawal";

export default function WithdrawDetails({ withdraw }) {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  return (
    <Fragment>
      <Header />
      <div className="bg-mobile">
        <div className="mobile h-[700px] bg-orange-600 flex flex-col space-y-6">
          <div className="user-detail">
            <span
              onClick={() => router.replace("/admin/transactions/withdrawals")}
              className="nav-icon"
            >
              <BsArrowLeft />
            </span>
            <p className="text text-white">withdrawal details</p>
          </div>
          <hr />

          <div className="flex flex-col space-y-6">
            <div className="user-detail">
              <div className="flex items-start w-[50%] flex-col space-y-2">
                <p className="h2">asset</p>
                <p className="h4">{withdraw.asset}</p>
              </div>
              <div className="flex w-[50%] items-end flex-col space-y-2">
                <p className="h2">amount</p>
                <p className="h4">${withdraw.amount}</p>
              </div>
            </div>

            <div className="user-detail">
              <div className="flex items-start w-[50%] flex-col space-y-2">
                <p className="h2">plan</p>
                <p className="h4">{withdraw.plan}</p>
              </div>
              <div className="flex w-[50%] items-end flex-col space-y-2">
                <p className="h2">status</p>
                <p className="h4">{withdraw.status}</p>
              </div>
            </div>

            <div className="user-detail">
              <div className="flex items-start w-[50%] flex-col space-y-2">
                <p className="h2">transaction ID</p>
                <p className="h4">{withdraw.transactionID}</p>
              </div>
              <div className="flex w-[50%] items-end flex-col space-y-2">
                <p className="h2">transaction type</p>
                <p className="h4">{withdraw.type}</p>
              </div>
            </div>

            <div className="user-detail">
              <div className="flex items-start w-[50%] flex-col space-y-2">
                <p className="h2">created At</p>
                <p className="h4">{withdraw.createdAt}</p>
              </div>
              <div className="flex w-[50%] items-end flex-col space-y-2">
                <p className="h2">database ID</p>
                <p className="h4">{withdraw.id}</p>
              </div>
            </div>
            <hr className="hr" />
            <div className="action ">
              <button
                onClick={() => setShow(true)}
                className="bg-transparent border hover:opacity-75 transition-all duration-300 text-white hover:bg-white hover:text-orange-600 hover:shadow-xl font-bold p-2  capitalize rounded-lg"
              >
                approve
              </button>
              <button onClick={() => setShow1(true)} className="button">
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {show && <UpdateWithdrawal setShow={setShow} withdraw={withdraw} />}
      {show1 && (
        <Delete
          deleteFn={deleteWithdraw}
          data={withdraw}
          path="/admin/transactions/withdrawals"
          setShow={setShow1}
        />
      )}
    </Fragment>
  );
}
