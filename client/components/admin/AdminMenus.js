import React, { Fragment, useState } from "react";
import Link from "next/link";

import { FaGreaterThan } from "react-icons/fa";
import TransactionModal from "./TransactionModal";

export default function AdminMenus() {
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      <div className="flex flex-col mt-6">
        <Link className="admin-link" href="/admin/user">
          <p className="h2">manage users</p>
          <p className="h2">
            <FaGreaterThan />
          </p>
        </Link>
        <div onClick={() => setShow(true)} className="admin-link">
          <p className="h2">manage transactions</p>
          <p className="h2">
            <FaGreaterThan />
          </p>
        </div>
      </div>
      {show && <TransactionModal setShow={setShow} />}
    </Fragment>
  );
}
