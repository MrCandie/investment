import React, { Fragment, useContext, useState, useEffect } from "react";
import Login from "../../components/auth/Login";
import Setting from "../../components/setting/Setting";
import Header from "../../components/UI/header/Header";
import Navigation from "../../components/UI/navigation/Navigation";
import { getAllWallets } from "../../util/auth";
import { AppContext } from "../../util/context";

export default function Index() {
  const ctx = useContext(AppContext);

  const [wallet, setWallet] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    async function fetchData() {
      try {
        const response = await getAllWallets(ctx.user.id || id, token);

        const userData = response.data.wallets;
        const userWallet = userData.filter((item) => {
          const user = item.user.find((el) => el);
          return user._id === id;
        });
        const userWalletDetail = userWallet.find((el) => el);

        setWallet(userWalletDetail);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [wallet]);

  return (
    <Fragment>
      {ctx.isLoggedIn ? (
        <>
          <Header />
          <Setting wallet={wallet} />
          <Navigation />
        </>
      ) : (
        <Login />
      )}
    </Fragment>
  );
}
