import React, { useEffect, useState } from "react";

import Notification from "../../UI/notification/Notification";
import { createDeposit } from "../../../util/auth";
import Basic from "./Basic";
import Golden from "./Golden";
import Silver from "./Silver";
import Starter from "./Starter";

export default function Deposit() {
  const [plan, setPlan] = useState("starter");
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState({
    text: "",
    title: "",
    status: "",
  });

  async function planDepositHandler(data) {
    try {
      setLoading(true);
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      const response = await createDeposit(id, token, data);
      console.log(response);
      setLoading(false);
      setShow(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setNotification({
        title: "error",
        text: err.response.data.message,
        status: "error",
      });
      setModal(true);
    }
  }

  let screen;

  if (plan === "starter") {
    screen = (
      <Starter
        confirmDeposit={planDepositHandler}
        show={show}
        setShow={setShow}
        modal={modal}
        setModal={setModal}
        loading={loading}
      />
    );
  } else if (plan === "basic") {
    screen = (
      <Basic
        confirmDeposit={planDepositHandler}
        show={show}
        setShow={setShow}
        modal={modal}
        setModal={setModal}
        loading={loading}
      />
    );
  } else if (plan === "silver") {
    screen = (
      <Silver
        confirmDeposit={planDepositHandler}
        show={show}
        setShow={setShow}
        modal={modal}
        setModal={setModal}
        loading={loading}
      />
    );
  } else if (plan === "golden") {
    screen = (
      <Golden
        confirmDeposit={planDepositHandler}
        show={show}
        setShow={setShow}
        modal={modal}
        setModal={setModal}
        loading={loading}
      />
    );
  }

  return (
    <div className="w-full h-[90vh] lg:h-full flex items-center justify-center bg-orange-200">
      <div className="w-[90%] my-8  h-[700px] md:w-[60%] lg:w-[40%] p-4 bg-orange-500 rounded-xl">
        <h1 className="capitalize text-lg lg:text-xl text-white font-bold text-start">
          make a deposit
        </h1>
        <div className="w-full p-4 flex flex-col space-y-4">
          <label className="label">select a plan</label>
          <select onChange={(e) => setPlan(e.target.value)} className="select">
            <option className="capitalize" value="starter">
              Starter
            </option>
            <option className="capitalize" value="basic">
              basic
            </option>
            <option className="capitalize" value="silver">
              silver
            </option>
            <option className="capitalize" value="golden">
              golden
            </option>
          </select>
        </div>
        {screen}
      </div>
    </div>
  );
}
