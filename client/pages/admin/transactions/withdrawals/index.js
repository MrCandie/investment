import React, { Fragment, useEffect, useState } from "react";
import Withdraw from "../../../../components/admin/withdraw/Withdraw";
import { getAllWithdraws } from "../../../../util/auth";

export default function Index() {
  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    async function fetchData() {
      try {
        const response = await getAllWithdraws(id, token);
        setWithdraws(response.data.withdraws);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Fragment>
      <Withdraw withdraws={withdraws} />
    </Fragment>
  );
}
