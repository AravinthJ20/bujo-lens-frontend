// import client from "./axiosClient";

// export const uploadPageApi = (formData) =>
//   client.post("/pages/upload", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

// export const getPagesApi = () => client.get("/pages");


import client from "./axiosClient";

export const uploadPageApi = (formData) =>
  client.post("/pages/upload", formData, {
    headers: {
      // ❌ DO NOT SET Content-Type manually
      // Just send Authorization (if needed)
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getPagesApi = () => client.get("/pages");
