import React, { Fragment, useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Notification from "../UI/notification/Notification";
import Spinner from "../UI/spinner/Spinner";
import { createWallet } from "../../util/auth";
import { AppContext } from "../../util/context";

export default function Wallet() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({
    text: "",
    title: "",
    status: "",
  });

  const ctx = useContext(AppContext);

  const [bitcoin, setBitcoin] = useState("");
  const [eth, setEth] = useState("");
  const [ltc, setLtc] = useState("");
  const [usdt, setUsdt] = useState("");

  async function skipHandler() {
    const token = localStorage.getItem("token");
    const data = {
      bitcoin: "",
      ethereum: "",
      litecoin: "",
      usdt: "",
    };
    try {
      setLoading(true);
      const response = await createWallet(ctx.user.id, data, token);
      setLoading(false);
      router.replace("/dashboard");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setNotification({
        title: "error",
        text: err.response.data.message || "something went wrong",
        status: "error",
      });
      setShow(true);
    }
  }

  async function walletHandler(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!bitcoin || !eth || !ltc || !usdt) {
      setNotification({
        title: "error",
        text: "please fill in necessary fields",
        status: "error",
      });
      setShow(true);
      return;
    }

    const data = {
      bitcoin,
      ethereum: eth,
      litecoin: ltc,
      usdt: usdt,
    };
    try {
      setLoading(true);
      const response = await createWallet(ctx.user.id, data, token);
      setLoading(false);
      setNotification({
        title: "success",
        text: "wallet details added",
        status: "success",
      });
      setShow(true);
      setTimeout(() => setShow(false), 1000);
      router.replace("/dashboard");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setNotification({
        title: "error",
        text: err.response.data.message,
        status: "error",
      });
      setShow(true);
    }
  }
  return (
    <Fragment>
      <div className="bg-orange-200 p-4 md:p-6 lg:p-10 h-[100vh] flex items-center justify-center">
        <div className="mobile bg-orange-600 flex flex-col space-y-6">
          <h1 className="text text-white">add your withdrawal addresses</h1>
          <hr className="hr" />
          <form
            className="flex flex-col space-y-6 p-4"
            onSubmit={walletHandler}
          >
            <div className="input-container">
              <label className="label-white-bg text-white">
                bitcoin wallet address
              </label>
              <input
                onChange={(e) => setBitcoin(e.target.value)}
                value={bitcoin}
                className="input"
                type="text"
                placeholder="n1ASgQbgmiZYEYtb19unXukMhsG59FSjmj"
              />
            </div>
            <div className="input-container">
              <label className="label-white-bg text-white">
                ethereum wallet address
              </label>
              <input
                className="input"
                onChange={(e) => setEth(e.target.value)}
                value={eth}
                type="text"
                placeholder="0xD504CC45320C93FACF651D75BC3A89B88CBCB650"
              />
            </div>
            <div className="input-container">
              <label className="label-white-bg text-white">
                litecoin wallet address
              </label>
              <input
                className="input"
                onChange={(e) => setLtc(e.target.value)}
                value={ltc}
                type="text"
                placeholder="myTWjmq8BAtTjH79UQ8ZTSVnVdwSm7Ao8e"
              />
            </div>
            <div className="input-container">
              <label className="label-white-bg text-white">
                USDT wallet address
              </label>
              <input
                className="input"
                onChange={(e) => setUsdt(e.target.value)}
                value={usdt}
                type="text"
                placeholder="0xB748CEC2E2D87E60E4C6BDF68C398D0618D5B375"
              />
            </div>
            <div className="action">
              <button
                type="button"
                disabled={loading}
                onClick={skipHandler}
                className="button"
              >
                {loading ? "Loading..." : "skip"}
              </button>
              <button disabled={loading} className="button">
                {loading ? "Loading..." : "proceed"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading && <Spinner />}
      {show && (
        <Notification
          setShow={setShow}
          title={notification.title}
          text={notification.text}
          status={notification.status}
        />
      )}
    </Fragment>
  );
}
