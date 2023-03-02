import axios from "axios";
export const serverAddr = "https://cyber-bullying-server.onrender.com";
//export const serverAddr = "http://localhost:3000";

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
