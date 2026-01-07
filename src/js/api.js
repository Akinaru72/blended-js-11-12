import axios from "axios";
import { LS_KEY } from "./refs";

axios.defaults.baseURL = "https://connections-api.goit.global/";

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(LS_KEY, token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem(LS_KEY);
    delete axios.defaults.headers.common.Authorization;
  }
};

export const signupUser = async ({ name, email, password }) => {
  const response = await axios.post("/users/signup", { name, email, password });
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await axios.post("/users/login", { email, password });
  return response.data;
};

export const logoutUser = async () => {
  await axios.post("/users/logout");
  setAuthToken(null);
};

export const fetchContacts = async () => {
  const response = await axios.get("/contacts");
  return response.data;
};

export const addContact = async ({ name, number }) => {
  const response = await axios.post("/contacts", { name, number });
  return response.data;
};

export const deleteContact = async (contactId) => {
  await axios.delete(`/contacts/${contactId}`);
};
