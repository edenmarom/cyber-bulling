import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Content-Type': 'application/json',
        'accept': '"*/*"',
        'Access-Control-Allow-Origin': "http://localhost:3000",
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    }
})
