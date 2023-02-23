import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import HistoryDetail from "../../../components/dashboard/HistoryDetail";
import Navigation from "../../../components/UI/navigation/Navigation";
import { getAllDeposits, getAllWithdraws } from "../../../util/auth";

export default function HistoryDetails() {
  const [history, setHistory] = useState("");

  const router = useRouter();
  const historyId = router.query.historyId;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    async function fetchData() {
      try {
        const deposit = await getAllDeposits(id, token);
        const withdraw = await getAllWithdraws(id, token);

        const userWithdraw = withdraw.data.withdraws.filter((item) => {
          const user = item.user.find((el) => el);
          return user._id === id;
        });

        ////////////
        // deposit data
        const userDeposit = deposit.data.deposits.filter((item) => {
          const user = item.user.find((el) => el);
          return user._id === id;
        });

        const allTransactions = [...userWithdraw, ...userDeposit];

        const transDetail = allTransactions.find(
          (item) => item.id === historyId
        );
        setHistory(transDetail);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <Fragment>
      <HistoryDetail data={history} />
      <Navigation />
    </Fragment>
  );
}
