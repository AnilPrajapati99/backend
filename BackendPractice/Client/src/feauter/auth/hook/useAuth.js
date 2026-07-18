import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from "../auth.slice";
import { getmeUser, loginUser, registerUser } from "../services/auth.api";

export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister({ name, email, age, add, password }) {
    try {
      dispatch(setLoading(true));
      const data = await registerUser({ name, email, age, add, password });
      console.log(data);
      return true;
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Registration Failed"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await loginUser({ email, password });
      dispatch(setUser(data));
      return true;
    } catch (error) {
      dispatch(error.response?.data?.message || "Login Failed");
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetme() {
    console.log("run");
    const data = await getmeUser();
    console.log(data);
    dispatch(setUser(data));
    dispatch(setLoading(false));
  }

  return {
    handleRegister,
    handleLogin,
    handleGetme,
  };
};
