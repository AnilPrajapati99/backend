import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/songs",
  withCredentials: true,
});

export async function getSong({ mood }) {
  try {
    const response = await api.get("/get", {
      params: mood ? { mood } : {},
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching song:", error);
    throw error;
  }
}

export async function getAllSong({ mood }) {
  const url = mood ? `/getAll?mood=${mood}` : "/getAll";

  const response = await api.get(url);

  return response.data;
}
