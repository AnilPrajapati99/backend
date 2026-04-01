import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function register(username, email, password) {
  try {
    const responce = await api.post("/register", {
      username,
      email,
      password,
    });
    return responce.data;
  } catch (error) {
    throw error;
  }
}

export async function login(username, password) {
  try {
    const responce = await api.post("/login", {
      username,
      password,
    });
    return responce.data;
    // console.log(responce.data);
  } catch (error) {
    throw error;
  }
}

export async function getMe() {
  try {
    const responce = await api.get("/get-me");
    return responce.data;
  } catch (error) {
    throw error;
  }
}
