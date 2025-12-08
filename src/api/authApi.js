import client from "./axiosClient";

export const loginApi = (data) => client.post("/auth/login", data);
export const registerApi = (data) => client.post("/auth/register", data);
