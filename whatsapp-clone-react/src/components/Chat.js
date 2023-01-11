import React, {useState, useEffect} from 'react';
import {Avatar} from '@material-ui/core';
import "../css/Chat.css";
import {useParams} from 'react-router-dom';
import Sidebar from "./Sidebar";
import { updateUserID } from "../Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { store } from '../Store';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [participants, setParticipants] = useState([]);
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user);

    useEffect(() => {
          setRoomName("הקבוצה הכי טובה בעולם");
          setMessages([]);
          setSeed(Math.floor(Math.random() * 5000));
          createParticipantsList();
          setMessages(store.getState().scenario.messages);


    }, []);

    const sendMessage = (e) => {
        dispatch(updateUserID("23423423425"));
    }

    return (
      <div className="app_body">
        <Sidebar participants={participants} />
        <div className="chat">
          <div className="chat_header">
            <Avatar/>
            <div className="chat_headerInfo">
              <h3 className="chat-room-name">{roomName}</h3>
              <p className="chat-room-last-seen">{participants.join(", ")}</p>
            </div>
            <div className="chat_headerRight"></div>
          </div>
          <div className="chat_body">
            {messages.map((message, index) => (
              <p
                key={index}
                className={`chat_message ${
                  message.user === currentUser.id && "chat_receiver"
                }`}
              >
                {/* TODO: get user name by id*/}
                <span className="chat_name">{message.user}</span>
                {message.text}
                <span className="chat_timestemp">
                  {/* TODO: use offset */}
                  {new Date(Date.now()).toUTCString().slice(-12, -4)}
                </span>
              </p>
            ))}
          </div>
          <div className="chat_footer">
            <form>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="הקלד הודעה"
              />
              <button type="submit" onClick={sendMessage}>
                {" "}
                Send a Message
              </button>
            </form>
          </div>
        </div>
      </div>
    );

  function createParticipantsList() {
    const fakeUsers = store.getState().scenario.fakeUsers;
    const fakeUsersNicknames = fakeUsers.map((user) => user.nickname);
    const currentUserNickname = store.getState().user.nickname;
    let randomIndex = Math.floor(Math.random() * fakeUsersNicknames.length);
    fakeUsersNicknames.splice(randomIndex, 0, currentUserNickname);
    setParticipants(fakeUsersNicknames);
  }
}

export default Chat
