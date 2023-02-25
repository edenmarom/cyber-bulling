import axios from "axios";

// export default axios.create({
//     baseURL: "http://localhost:3000",
//     headers: {
//         'Content-Type': 'application/json',
//         'accept': '"*/*"',
//         'Access-Control-Allow-Origin': "http://localhost:3000",
//         'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
//     }
// })


export default axios.create({
    baseURL: "https://cyber-bullying-server.onrender.com/",
    headers: {
        'Content-Type': 'application/json',
        'accept': '"*/*"',
        'Access-Control-Allow-Origin': "https://cyber-bullying-server.onrender.com/",
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    }
})
