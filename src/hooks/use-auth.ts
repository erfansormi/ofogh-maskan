import { jwtDecode } from "jwt-decode";
import { useUserContext } from "../context/user-context";
import { AuthServiceAPI } from "../services/auth";
import { useEffect } from "react";

export const useAuth = () => {
  const { setUser, setLoading } = useUserContext();
  const removeToken = () => {
    setLoading(false);
    localStorage.removeItem("token");
  };

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

    setLoading(true);
    AuthServiceAPI.getUserData(decodedData.sub)
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
        removeToken();
      })
      .finally(() => setLoading(false));
  }, []);
};
