import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/songs",
  withCredentials: true,
});

export async function getSong({ mood }) {
  console.log(mood);
  const responce = await api.get("/get?mood=" + mood);
  console.log(responce);
  return responce.data;
}
