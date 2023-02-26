import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import DepositDetails from "../../../../components/admin/deposit/DepositDetails";
import { getDeposit } from "../../../../util/auth";

export default function DepositDetail() {
  const router = useRouter();
  const [deposit, setDeposit] = useState("");

  const depositId = router.query.depositId;

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      try {
        const response = await getDeposit(depositId, token);
        setDeposit(response.data.deposit);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <Fragment>
      <DepositDetails deposit={deposit} />
    </Fragment>
  );
}
