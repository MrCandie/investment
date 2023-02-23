import axios from "axios";

// const APIURLUSER = "http://localhost:8000/api/v1/users";
const APIURLUSER = "https://maeve.onrender.com/api/v1/users";

export async function signup(data) {
  const response = await axios.post(APIURLUSER + "/register", data);
  return response.data;
}

export async function login(data) {
  const response = await axios.post(APIURLUSER + "/login", data);
  return response.data;
}

export async function verifyEmail(data) {
  const response = await axios.post(APIURLUSER + "/verify-email", data);
  return response.data;
}

export async function forgotPassword(data) {
  const response = await axios.post(APIURLUSER + "/forgot-password", data);
  return response.data;
}

export async function resetPassword(data, token) {
  const response = await axios.patch(
    APIURLUSER + `/reset-password/${token}`,
    data
  );
  return response.data;
}

export async function verifyRequest(token) {
  const response = await axios.post(
    APIURLUSER + "/send-verify-request",
    {},
    {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    }
  );
  return response.data;
}

export async function updatePassword(id, data, token) {
  const response = await axios.patch(
    APIURLUSER + `/updatePassword/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    }
  );
  return response.data;
}

export async function updateUser(id, data, token) {
  const response = await axios.patch(APIURLUSER + `/updateUser/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
export async function uploadProfilePicture(data, token) {
  const response = await axios.post(APIURLUSER + "/upload", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
export async function getUser(id, token) {
  const response = await axios.get(APIURLUSER + `/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

///////////////////////////////
export async function createWallet(id, data, token) {
  const response = await axios.post(APIURLUSER + `/${id}/wallet`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getAllWallets(id, token) {
  const response = await axios.get(APIURLUSER + `/${id}/wallet`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

const APIURLWALLET = "http://localhost:8000/api/v1/wallets";

export async function updateWallets(id, data, token) {
  const response = await axios.patch(APIURLWALLET + `/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

const APIURLDASHBOARD = "http://localhost:8000/api/v1/dashboards";

export async function createDashboard(id, token, data) {
  const response = await axios.post(APIURLUSER + `/${id}/dashboard`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getAllDashboard(id, token) {
  const response = await axios.get(APIURLUSER + `/${id}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

const APIURLDEPOSIT = "http://localhost:8000/api/v1/deposits";
export async function createDeposit(id, token, data) {
  const response = await axios.post(APIURLUSER + `/${id}/deposit`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getAllDeposits(id, token) {
  const response = await axios.get(APIURLUSER + `/${id}/deposit`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

//////////////////////
// withdrawal

export async function createWithdraw(id, token, data) {
  const response = await axios.post(APIURLUSER + `/${id}/withdraw`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getAllWithdraws(id, token) {
  const response = await axios.get(APIURLUSER + `/${id}/withdraw`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
