import "../css/App.css";
import React, {useState} from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Login from "./Login";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import {useStateValue} from "../StateProvider";
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
    const [{user}, dispatch] = useStateValue();
    return (
        // <div className="app">
        //     {!user ? (
        //       <Login/>
        //     ):(
        //       <div className="app_body">
        //         <Router>
        //           <Sidebar/>
        //           <Switch>
        //             <Route path="/rooms/:roomId">
        //               <Chat/>
        //             </Route>
        //             <Route path="/">
        //               <Chat/>
        //             </Route>
        //           </Switch>
        //         </Router>
        //       </div>
        //     )}
        // </div>
        <div className="app">{
            <div className="app_body">

                <Router>
                    <Sidebar/>
                    <Routes>
                        <Route index element={<SignIn/>}/>
                        <Route path="admin" element={<Admin/>}/>
                        <Route path="chatpreview" element={<ChatPreview/>}/>
                        <Route path="/rooms/:roomId" element={<Chat/>}/>
                        {/*<Route path="/">*/}
                        {/*    <Chat/>*/}
                        {/*</Route>*/}
                    </Routes>
                </Router>
                <QueryClientProvider client={queryClient}>
                    <Example/>
                </QueryClientProvider>

                {/*<BrowserRouter>*/}
                {/*    <Sidebar />*/}
                {/*    <Routes>*/}
                {/*        <Route path="/">*/}
                {/*            <Route index element={<SignIn/>}/>*/}
                {/*            <Route path="admin" element={<Admin/>}/>*/}
                {/*            <Route path="chatpreview" element={<ChatPreview/>}/>*/}
                {/*            <Route path="rooms" element={<Chat/>}/>*/}
                {/*        </Route>*/}
                {/*    </Routes>*/}

                {/*</BrowserRouter>*/}
                {/*{*/}
                {/*  <div className="app_body">*/}
                {/*    <Router>*/}
                {/*      <Sidebar />*/}
                {/*      <Switch>*/}
                {/*        <Route path="/rooms/:roomId">*/}
                {/*          <Chat />*/}
                {/*        </Route>*/}
                {/*        <Route path="/">*/}
                {/*          <Chat />*/}
                {/*        </Route>*/}
                {/*      </Switch>*/}
                {/*    </Router>*/}
                {/*    <QueryClientProvider client={queryClient}>*/}
                {/*      <Example />*/}
                {/*    </QueryClientProvider>*/}
                {/*  </div>*/}
                {/*}*/}
            </div>}
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
