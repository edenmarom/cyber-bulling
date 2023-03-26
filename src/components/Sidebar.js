import React from "react";
import "../css/Sidebar.css";
import { IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SidebarChat from "./SidebarChat";

function Sidebar({ participants }) {

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div></div>
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_chats">
        <h2>משתתפי הקבוצה ({participants.length}):</h2>
        <div className="participantsList">
          {participants.map((user, index) => (
            <div key={index}>
              <SidebarChat name={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
