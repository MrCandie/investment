import React, { Fragment, useState } from "react";
import Balance from "./Balance";
import History from "./History";
import Withdraw from "./Withdraw";

export default function Dashboard() {
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      <div className="w-full h-[100vh] flex items-center justify-center bg-orange-200">
        <div className="w-[90%] lg:w-[40%] md:w-[60%] h-[700px] bg-orange-600 p-4 flex flex-col space-y-6">
          <Balance setShow={setShow} />
          <History />
        </div>
      </div>
      {show && <Withdraw setShow={setShow} />}
    </Fragment>
  );
}
