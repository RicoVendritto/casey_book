import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:1234"
});

// AUTH
// LOGIN
export const loginUser = async loginData => {
  const resp = await api.post(`/auth/login`, loginData);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.auth_token}`;
  LocalStorage(resp);
  return resp.data.user;
};

// REGISTER
export const registerUser = async registerData => {
  try {
    const resp = await api.post("/signup/", registerData);
    api.defaults.headers.common.authorization = `Bearer ${resp.data.auth_token}`;
    LocalStorage(resp);
    return resp.data.user;
  } catch (e) {
    console.log(e.response);
    if (e.response.status === 422) {
      return {
        errorMessage:
          "Email is already associated with a user, please login to continue"
      };
    }
  }
};

const LocalStorage = resp => {
  localStorage.setItem("authToken", resp.data.auth_token);
  localStorage.setItem("name", resp.data.user.name);
  localStorage.setItem("email", resp.data.user.email);
};

// VERIFY
export const verifyUser = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
  }
};

// POSTS
export const indexPosts = async () => {
  const resp = await api.get("/posts");
  return resp.data;
};

// CREATE POSTS
export const createPost = async postData => {
  const resp = await api.post("/posts", postData);
  return resp.data;
};

// UPDATE POSTS
export const updatePost = async (id, postData) => {
  const resp = await api.put(`/posts/${id}`, postData);
  const post = { id: id, title: resp.data.data }
  return post;
};
