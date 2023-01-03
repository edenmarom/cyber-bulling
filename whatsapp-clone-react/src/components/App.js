import "../css/App.css";
import React, {useState} from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Login from "./Login";
import {BrowserRouter ,Route , Routes} from "react-router-dom";
import {useStateValue} from "../StateProvider";
import axios from "axios";
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
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" >
                        <Route index element={<SignIn/>} />
                        <Route path="admin" element={<Admin/>} />
                        <Route path="chatpreview" element={<ChatPreview />} />
                        <Route path="rooms" element={<Chat />} />
                    </Route>
                </Routes>
            </BrowserRouter>
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
        </div>
    );
}

function Example() {
    const {isLoading, error, data, isFetching} = useQuery(["repoData"], () =>
        axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.data)
    );

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    return (
        <div>
            <h1>{"query example"}</h1>
            <p>{"id: " + data[9].id}</p>
            <p>{data[9].title}</p>
        </div>
    );
}

export default App;
