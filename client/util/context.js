import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({
  login: () => {},
  logout: () => {},
  isLoggedIn: "",
  token: "",
  user: "",
});

export default function AppProvider({ children }) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    const initialToken = localStorage.getItem("token");
    setToken(initialToken);
  }, []);
  const isLoggedIn = !!token;

  function login(token, user) {
    setToken(token);
    setUser(user);
  }
  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    router.replace("/account/login");
  }
  const value = {
    login,
    logout,
    isLoggedIn,
    token,
    user,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
