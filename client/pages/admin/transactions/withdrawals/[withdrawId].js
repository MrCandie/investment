import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import WithdrawDetails from "../../../../components/admin/withdraw/WithdrawDetails";
import { getWithdraw } from "../../../../util/auth";

export default function WithdrawDetail() {
  const router = useRouter();
  const [withdraw, setWithdraw] = useState("");

  const withdrawId = router.query.withdrawId;

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      try {
        const response = await getWithdraw(withdrawId, token);
        setWithdraw(response.data.withdraw);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <Fragment>
      <WithdrawDetails withdraw={withdraw} />
    </Fragment>
  );
}
