import React, { Fragment, useEffect, useState } from "react";
import Deposit from "../../../../components/admin/deposit/Deposit";
import { getAllDeposits } from "../../../../util/auth";

export default function Index() {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    async function fetchData() {
      try {
        const response = await getAllDeposits(id, token);
        setDeposits(response.data.deposits);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [deposits]);

  return (
    <Fragment>
      <Deposit deposits={deposits} />
    </Fragment>
  );
}
