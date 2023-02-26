import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Users from "../../../components/admin/Users";
import { getAllUsers } from "../../../util/auth";

export default function User() {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchUser() {
      try {
        const response = await getAllUsers(token);
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
        alert(error.response.data.message || "something went wrong");
        router.replace("/dashboard");
      }
    }
    fetchUser();
  }, [users]);

  return <Users user={users} />;
}
