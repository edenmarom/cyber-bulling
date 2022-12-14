import React, {useState, useEffect} from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import "../css/Chat.css";
import {useParams} from 'react-router-dom';
import {useStateValue} from "../StateProvider";
import Sidebar from "./Sidebar";
import { updateUserID } from "../Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";



function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.nickname);




    useEffect(() => {
        if (roomId) {
            // db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
            //     setRoomName(snapshot.data().name);
            // });

            // db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
            //     setMessages(snapshot.docs.map(doc => doc.data()))
            // });

            setRoomName("room1");
            setMessages([]);
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        // e.preventDefault();
        // db.collection('rooms').doc(roomId).collection('messages').add({
        //     message: input,
        //     name: user.displayName,
        //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        // })

        // setInput("");
        dispatch(updateUserID("23423423425"));

    }

    return (
      <div className="app_body">
        <Sidebar />
        <div className="chat">
          <div className="chat_header">
            <Avatar
              src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
            />
            <div className="chat_headerInfo">
              <h3 className="chat-room-name">{roomName}</h3>
              <p className="chat-room-last-seen">
                Last seen{" "}
                {new Date(
                  messages[messages.length - 1]?.timestamp?.toDate()
                ).toUTCString()}
              </p>
            </div>
            <div className="chat_headerRight">
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </div>
          </div>
          <div className="chat_body">
            {messages.map((message) => (
              <p
                className={`chat_message ${
                  message.name === currentUser.displayName && "chat_receiver"
                }`}
              >
                <span className="chat_name">{message.name}</span>
                {message.message}
                <span className="chat_timestemp">
                  {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
              </p>
            ))}
          </div>
          <div className="chat_footer">
            <InsertEmoticonIcon />
            <form>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Type a message"
              />
              {/* <button type="submit" onClick={sendMessage}> Send a Message</button> */}
            </form>
            <button type="submit" onClick={sendMessage}>
              {" "}
              Send a Message
            </button>
            <MicIcon />
          </div>
        </div>
      </div>
    );
}

export default Chat
