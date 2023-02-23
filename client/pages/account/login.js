import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import Login from "../../components/auth/Login";
import { AppContext } from "../../util/context";

export default function Logins() {
  const router = useRouter();
  const ctx = useContext(AppContext);

  useEffect(() => {
    if (ctx.isLoggedIn) {
      router.replace("/dashboard");
    }
  }, []);

  return <Login />;
}
