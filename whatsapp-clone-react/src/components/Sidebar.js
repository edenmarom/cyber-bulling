import React, { useState, useEffect } from "react";
import "../css/Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "../StateProvider";
import { useDispatch, useSelector } from "react-redux";

function Sidebar(props) {
  const [rooms, setRooms] = useState([]);
      const dispatch = useDispatch();
      const currentUser = useSelector((state) => state.user.nickname);
  // const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
    //     setRooms(snapshot.docs.map(doc => (
    //         {
    //             id: doc.id,
    //             data: doc.data()
    //         }
    //     )
    //     ))
    // ));
    // return () => {
    //     unsubscribe();
    // }
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        {/* <Avatar src={user?.photoURL} /> */}
        <Avatar />
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
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          // <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          <SidebarChat key={2} id={2} name={"room2"} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
