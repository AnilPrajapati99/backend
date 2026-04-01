import { useContext } from "react";
import { authContext } from "../auth.context.jsx";
import { register, login } from "../services/auth.api.js";

export function useAuth() {
  const context = useContext(authContext);
  const { user, setUser, loding, setLoding } = context;

  const handleLogin = async (username, password) => {
    setLoding(true);
    try {
      const responce = await login(username, password);
      setUser(responce.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };
  const handleRegister = async (username, email, password) => {
    setLoding(true);
    try {
      const responce = await register(username, email, password);
      setUser(responce.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };

  return { user, loding, handleLogin, handleRegister };
}
