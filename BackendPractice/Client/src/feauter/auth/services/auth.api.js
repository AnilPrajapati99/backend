import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true,
});

export const registerUser = async ({ name, email, age, add, password }) => {
  try {
    const responce = await api.post("/api/auth/register", {
      name,
      email,
      age,
      add,
      password,
    });
    console.log(responce);
    return responce.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const responce = await api.post("api/auth/login", {
      email,
      password,
    });
    return responce.data;
  } catch (error) {
    throw error;
  }
};

export const getmeUser = async () => {
  const responce = await api.get("api/auth/get-me");
  return responce.data;
};
