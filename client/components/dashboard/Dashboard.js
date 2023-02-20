import React, { Fragment, useState } from "react";
import Header from "../UI/header/Header";
import Navigation from "../UI/navigation/Navigation";
import Balance from "./Balance";
import History from "./History";
import Withdraw from "./Withdraw";

export default function Dashboard({
  dashboard,
  deposits,
  balance,
  totalDeposit,
  allWithdraw
}) {
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      <Header />
      <div className="w-full h-[90vh] lg:h-full flex items-center justify-center pb-10 bg-orange-200">
        <div className="mobile h-[700px] bg-orange-600 flex flex-col space-y-6">
          <Balance
            totalDeposit={totalDeposit}
            balance={balance}
            dashboard={dashboard}
            setShow={setShow}
            allWithdraw={allWithdraw}
          />
          <History deposits={deposits} />
        </div>
      </div>
      {show && <Withdraw dashboard={dashboard} setShow={setShow} />}
      <Navigation />
    </Fragment>
  );
}
