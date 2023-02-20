// import "../css/App.css";
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
import AdminLogin from "./AdminLogin";
import ChatPreview from "./ChatPreview";
import AdminPage from "./AdminPage";
import AdminScenarioManagement from "./AdminScenarioManagement";
import ScenarioReactions from '../components/ScenariosReactions'
import Messages from "./Messages";

const queryClient = new QueryClient();

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<SignIn/>}/>
                        <Route path="adminlogin" element={<AdminLogin/>}/>
                        <Route path="chatpreview" element={<ChatPreview/>}/>
                        <Route path="rooms/:roomId" element={<Chat/>}/>
                        <Route path="adminpage" element={<AdminPage/>}/>
                        <Route path="scenariomanagement" element={<AdminScenarioManagement/>}/>
                        <Route path="scenarioReactions">
                            <Route index element={<ScenarioReactions/>}/>
                            <Route path=":scenarioId" element={<Messages/>}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>

            {/*{/<QueryClientProvider client={queryClient}>/}*/}
            {/*    <Example/>*/}
            {/*{/</QueryClientProvider>/}*/}
            {/*{/</div>/}*/}
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