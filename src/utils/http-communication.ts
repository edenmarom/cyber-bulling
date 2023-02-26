import axios from "axios";

export default axios.create({
  baseURL: "https://cyber-bullying-server.onrender.com/",
  headers: {
    "Content-Type": "application/json charset=utf-8",
    accept: '"*/*"',
    "Access-Control-Allow-Origin":
      "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  },
});
