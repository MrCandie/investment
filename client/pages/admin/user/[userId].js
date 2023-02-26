import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import UserDetails from "../../../components/admin/UserDetails";
import { getUser } from "../../../util/auth";

export default function UserDetail() {
  const router = useRouter();

  const [user, setUser] = useState("");

  const userId = router.query.userId;

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchUser() {
      try {
        const response = await getUser(userId, token);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  return (
    <Fragment>
      <UserDetails user={user} />
    </Fragment>
  );
}
