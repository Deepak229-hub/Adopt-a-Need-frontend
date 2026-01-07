import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { getUser } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserdata] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(!!token);

  useEffect(() => {
    setLoggedIn(!!token);
  }, [token]);

  useEffect(() => {
    if (!token) return;
    async function fetchData() {
      const response = await getUser(token);
      if (response.ok) {
        setUserdata(response.msg);
      } else {
        logOutUser();
      }
    }

    fetchData();
  }, []);

  const logOutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  }

  const storeToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token)
  };

  return (
    <AuthContext.Provider value={{userData, storeToken, isLoggedIn, logOutUser, token, setUserdata}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
