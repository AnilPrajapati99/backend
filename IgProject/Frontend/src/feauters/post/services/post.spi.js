import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export async function getFeed() {
  const response = await api.get("/post/feed");
  return response.data;
}

export async function createPost(imagefile, caption) {
  const formData = new FormData();
  formData.append("image", imagefile);
  formData.append("caption", caption);
  const response = await api.post("/post", formData);
  return response.data;
}

export async function likePost(postId) {
  const response = await api.post("/post/likes/" + postId);
  return response.data;
}
export async function unlikePost(postId) {
  const response = await api.post("/post/unlikes/" + postId);
  return response.data;
}
