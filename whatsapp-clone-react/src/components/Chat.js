import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "../css/Chat.css";
import Sidebar from "./Sidebar";
import { updateUserID } from "../Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../Store";

function Chat() {
  const [input, setInput] = useState("");
  const [participants, setParticipants] = useState([]);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const { messages } = store.getState().scenario;
  const roomName = "הקבוצה הכי טובה בעולם";

  useEffect(() => {
    createParticipantList();
    renderMessages();
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    const userMessage = {
      text: input,
      nickname: currentUser.nickname,
    };
    addMessage(userMessage);
    setInput('');
    dispatch(updateUserID("23423423425"));
  };

  // TODO Copy this where needed
  const filterUserMessages = (messages, userNickname) => {
    return messages.filter(message => message.nickname === userNickname);
  };

  return (
    <div className="app_body">
      <Sidebar participants={participants} />
      <div className="chat">
        <div className="chat_header">
          <Avatar />
          <div className="chat_headerInfo">
            <h3 className="chat-room-name">{roomName}</h3>
            <p className="chat-room-last-seen">{participants.join(", ")}</p>
          </div>
          <div className="chat_headerRight"></div>
        </div>
        <div className="chat_body">
          {displayedMessages.map((message, index) => (
            <p
              key={index}
              className={`chat_message ${
                message.user === currentUser.id && "chat_receiver"
              }`}
            >
              <span className="chat_name">{message.nickname}</span>
              {message.text}
              <span className="chat_timestemp">
                {/* TODO: use offset */}
                {`${hours}:${minutes}`}
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

  function renderMessages() {
    messages.forEach((message) => {
      setTimeout(() => addMessage(message), message.timeOffset);
    });
  }

  function addMessage(message) {
    setDisplayedMessages((displayedMessages) => {
      return [...displayedMessages, message];
    });
  }

  function createParticipantList() {
    const fakeUsers = store.getState().scenario.fakeUsers;
    const fakeUsersNicknames = fakeUsers.map((user) => user.nickname);
    const currentUserNickname = store.getState().user.nickname;
    let randomIndex = Math.floor(Math.random() * fakeUsersNicknames.length);
    fakeUsersNicknames.splice(randomIndex, 0, currentUserNickname);
    setParticipants(fakeUsersNicknames);
  }
}

export default Chat;
