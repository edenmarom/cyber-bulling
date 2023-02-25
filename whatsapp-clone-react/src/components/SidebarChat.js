import {Avatar} from "@material-ui/core";
import "../css/SidebarChat.css";

function SidebarChat({name}) {

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
