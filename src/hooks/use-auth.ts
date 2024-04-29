import { User } from "../types/user";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../lib/axios";
import { useEffect } from "react";
import { useUserContext } from "../context/user-context";

export const useAuth = () => {
  const { setUser, user } = useUserContext();
  const removeToken = () => localStorage.removeItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      removeToken();
      return;
    }

    // CHECK IF EXPIRED TOKEN
    const decodedData = jwtDecode(token);
    if (decodedData.exp && Date.now() >= decodedData.exp * 1000) {
      setUser(null);
      removeToken();
      return;
    }

    // CHECK DECODE TOKEN DATA
    if (!decodedData.sub) {
      setUser(null);
      removeToken();
      return;
    }

    axiosInstance
      .get<User>(`/660/users/${decodedData.sub}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
        removeToken();
      });
  }, []);

  return user;
};
