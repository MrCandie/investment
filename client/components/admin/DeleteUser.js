import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { deleteUser } from "../../util/auth";

export default function DeleteUser({ setShow, user }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function deleteUserHandler() {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await deleteUser(user.id, token);
      console.log(response);
      setLoading(false);
      alert("User deleted successfully");
      setShow(false);
      router.replace("/admin/user");
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
            onClick={deleteUserHandler}
            className="button"
          >
            {loading ? "loading..." : "delete user"}
          </button>
        </div>
      </div>
    </Fragment>
  );
}
