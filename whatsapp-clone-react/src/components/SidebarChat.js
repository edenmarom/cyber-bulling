import React, {useEffect, useState} from 'react';
import {Avatar} from "@material-ui/core";
import "../css/SidebarChat.css";

function SidebarChat({id,name}) {
    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));   
    }, []);

    return true ? (
      <div className="sidebarChat">
        <Avatar/>
        <div className="sidebarChat_info">
          <h2>{name}</h2>
        </div>
      </div>
    ) : (
      <div></div>
    );
}

export default SidebarChat
