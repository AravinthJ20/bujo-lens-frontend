import client from "./axiosClient";

export const searchEntriesApi = (params) =>
  client.get("/entries", { params });
