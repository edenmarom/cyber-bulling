import React from "react";
import Chat from "../components/Chat";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import SignIn from "./SignIn";
import AdminLogin from "./AdminLogin";
import ChatPreview from "./ChatPreview";
import AdminPage from "./AdminPage";
import AdminScenarioManagement from "./AdminScenarioManagement";
import ScenarioReactions from '../components/ScenariosReactions'
import Messages from "./Messages";

function App() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="chat" element={<Chat />} />
              <Route path="adminpage" element={<AdminPage />} />
              <Route
                path="scenariomanagement"
                element={<AdminScenarioManagement />}
              />
              <Route path="scenarioReactions">
                <Route index element={<ScenarioReactions />} />
                <Route path=":scenarioId" element={<Messages />} />
              </Route>
            </Route>
            <Route path="/:scenarioId">
              <Route index element={<SignIn />} />
              <Route path="adminlogin" element={<AdminLogin />} />
              <Route path="chatpreview" element={<ChatPreview />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
}


export default App;