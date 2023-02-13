import React, { Fragment, useState } from "react";
import Balance from "./Balance";
import History from "./History";
import Withdraw from "./Withdraw";

export default function Dashboard() {
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      <div className="w-full h-[90vh] lg:h-full flex items-center justify-center pb-10 bg-orange-200">
        <div className="mobile h-[700px] bg-orange-600 flex flex-col space-y-6">
          <Balance setShow={setShow} />
          <History />
        </div>
      </div>
      {show && <Withdraw setShow={setShow} />}
    </Fragment>
  );
}
