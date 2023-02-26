import React, { Fragment, useContext, useEffect, useState } from "react";
import Login from "../../components/auth/Login";
import Dashboard from "../../components/dashboard/Dashboard";
import {
  getAllDashboard,
  getAllDeposits,
  getAllWithdraws,
} from "../../util/auth";
import Notification from "../../components/UI/notification/Notification";

import { AppContext } from "../../util/context";
import Spinner from "../../components/UI/spinner/Spinner";

export default function Index() {
  const ctx = useContext(AppContext);
  const [dashboard, setDashboard] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const [allDeposits, setAllDeposits] = useState(0);
  const [allWithdrawal, setAllWithdrawal] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    async function fetchData() {
      try {
        const response = await getAllDashboard(id, token);
        const deposit = await getAllDeposits(id, token);
        const withdraw = await getAllWithdraws(id, token);

        /////////////////
        // withdrawal data

        const userWithdraw = withdraw.data.withdraws.filter((item) => {
          const user = item.user?.find((el) => el);
          return user?._id === id;
        });

        ////////////
        // deposit data
        const userDeposit = deposit.data.deposits.filter((item) => {
          const user = item.user?.find((el) => el);
          return user?._id === id;
        });

        const confirmedWithdraw = userWithdraw.filter(
          (item) => item.status === "success"
        );

        const confirmedDeposit = userDeposit.filter(
          (item) => item.status === "success"
        );

        const depositAmounts = confirmedDeposit.map((item) => item.amount);
        const withdrawAmounts = confirmedWithdraw.map((item) => item.amount);

        const totalDeposits = depositAmounts.reduce((acc, sum) => acc + sum, 0);
        const totalWithdraw = withdrawAmounts.reduce(
          (acc, sum) => acc + sum,
          0
        );
        setAllDeposits(totalDeposits);
        setAllWithdrawal(totalWithdraw);
        const accBal = totalDeposits - totalWithdraw;
        setBalance(accBal);

        const allTransactions = [...userWithdraw, ...userDeposit];
        setTransactions(allTransactions.reverse());

        ///////////////////
        // dashboard data
        const userData = response.data.dashboards;

        const userDashboard = userData.filter((item) => {
          const user = item.user?.find((el) => el);
          return user?._id === id;
        });
        const userDashboardDetail = userDashboard.find((el) => el);
        setDashboard(userDashboardDetail);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    fetchData();
  }, [dashboard, transactions, balance, allDeposits, allWithdrawal]);
  if (!dashboard) {
    return <Spinner />;
  }

  return (
    <Fragment>
      {ctx.isLoggedIn ? (
        <Dashboard
          balance={balance}
          deposits={transactions}
          dashboard={dashboard}
          totalDeposit={allDeposits}
          allWithdraw={allWithdrawal}
        />
      ) : (
        <Login />
      )}
    </Fragment>
  );
}
