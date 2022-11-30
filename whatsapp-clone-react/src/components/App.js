import "../css/App.css";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
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
      {
        <div className="app_body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      }
    </div>
  );
}

export default App;
