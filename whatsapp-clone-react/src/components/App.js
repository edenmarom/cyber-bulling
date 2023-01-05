import "../css/App.css";
import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import http from "../utils/http-communication.ts";
import {
    useQuery,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import SignIn from "./SignIn";
import Admin from "./Admin";
import ChatPreview from "./ChatPreview";

const queryClient = new QueryClient();

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<SignIn/>}/>
                        <Route path="admin" element={<Admin/>}/>
                        <Route path="chatpreview" element={<ChatPreview/>}/>
                        <Route path="rooms/:roomId" element={<Chat/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>

            {/*<QueryClientProvider client={queryClient}>*/}
            {/*    <Example/>*/}
            {/*</QueryClientProvider>*/}
            {/*</div>*/}
        </div>
    );
}

function Example() {
    const {isLoading, error, data, isFetching} = useQuery(["repoData"], () =>
        http
            .get("/users")
            .then((res) => res.data
            ));
    console.log(data);

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    return (
        <div>
            <h1>{"query example"}</h1>
            <p>{data.data[0].nickname}</p>
        </div>
    );
}

export default App;
