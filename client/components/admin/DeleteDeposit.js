import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { deleteDeposit, deleteUser } from "../../util/auth";

export default function DeleteDeposit({ setShow, deposit }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function deleteDepositHandler() {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await deleteDeposit(deposit.id, token);
      setLoading(false);
      alert("deposit deleted successfully");
      setShow(false);
      router.replace("/admin/transactions/deposits");
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message || "something went wrong");
    }
  }

  return (
    <Fragment>
      <div className="overlay"></div>
      <div className="bg-white popup">
        <h1 className="text text-red-600">Are you sure?</h1>
        <hr className="hr" />
        <div className="action">
          <button onClick={() => setShow(false)} className="button">
            cancel
          </button>
          <button
            disabled={loading}
            onClick={deleteDepositHandler}
            className="button"
          >
            {loading ? "loading..." : "delete deposit"}
          </button>
        </div>
      </div>
    </Fragment>
  );
}
