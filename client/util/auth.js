import axios from "axios";

const APIURLUSER = "http://localhost:8000/api/v1/users";

export async function signup(data) {
  const response = await axios.post(APIURLUSER + "/register", data);
  return response.data;
}

export async function login(data) {
  const response = await axios.post(APIURLUSER + "/login", data);
  return response.data;
}
