import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "@material-ui/core";
import "../css/Chat.css";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { store } from "../Store";

function Chat() {

  const [input, setInput] = useState("");
  const [participants, setParticipants] = useState([]);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [firstMessageTime, setFirstMessageTime] = useState();

  const roomName = "הקבוצה הכי טובה בעולם";
  const currentUser = useSelector((state) => state.user);
  const messages = useSelector((state) => state.scenario.messages);
  const displayedMessagesRef = useRef(displayedMessages);
  displayedMessagesRef.current = displayedMessages;

  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");

  const sendMessage = (event) => {
    event.preventDefault();
    const userMessage = {
      text: input,
      nickname: currentUser.nickname,
      timeOffset: performance.now() - firstMessageTime,
    };
    addMessage(userMessage);
    setInput('');
  };

  const renderMessages = () => {
      if (!firstMessageTime) {
        setFirstMessageTime(performance.now());
      }
      messages.forEach((message) => {
        setTimeout(() => addMessage(message), message.timeOffset);
      });
  };

  const addMessage = (message) => {
      setDisplayedMessages((displayedMessages) => {
        return [...displayedMessages, message];
      });
  };

  const createParticipantList = () => {
      const fakeUsersNicknames = messages.map((msg) => msg.nickname);
      const currentUserNickname = store.getState().user.nickname;
      let randomIndex = Math.floor(Math.random() * fakeUsersNicknames.length);
      fakeUsersNicknames.splice(randomIndex, 0, currentUserNickname);
      setParticipants(fakeUsersNicknames);
  };

  const sendUserMesegesToServer = () => setTimeout(() => {
    const userMessages = displayedMessagesRef.current.filter(
      (message) => message.nickname === currentUser.nickname
    );
    console.log(userMessages);
    // TODO send to server

  }, messages[messages.length - 1].timeOffset + 5000);

  useEffect(() => {
    createParticipantList();
    renderMessages();
    sendUserMesegesToServer();
  }, []);

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
}

export default Chat;
