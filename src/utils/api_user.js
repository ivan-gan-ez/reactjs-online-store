import axios from "axios";

import { API_URL } from "./constants";

export async function userSignup(name, email, password) {
  const response = await axios.post(API_URL + "users/signup", {
    name,
    email,
    password,
  });
  return response.data;
}

export async function userLogin(email, password) {
  const response = await axios.post(API_URL + "users/login", {
    email,
    password,
  });
  return response.data;
}
