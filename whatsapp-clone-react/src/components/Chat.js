import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "@material-ui/core";
import "../css/Chat.css";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

function Chat() {

  const [input, setInput] = useState("");
  const [participants, setParticipants] = useState([]);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [firstMessageTime, setFirstMessageTime] = useState();

  const chatName = "הקבוצה הכי טובה בעולם";
  const delayTimeToSendToServerUserMessages = 5000;
  const defaultUserDisplayColor = "black";
  const currentUser = useSelector((state) => state.user);
  const messages = useSelector((state) => state.scenario.messages);
  const displayedMessagesRef = useRef(displayedMessages);
  displayedMessagesRef.current = displayedMessages;
  const userColors = new Map();


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
      const displayedMsg = { ...message };
      displayedMsg.displayTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12:false,
      });

      if (!userColors.has(message.nickname)) {
        userColors.set(message.nickname, getRandomReadableColor());
      }

      displayedMsg.color = userColors.get(message.nickname);
      setDisplayedMessages((prev) => [...prev, displayedMsg]);
  };

  const createParticipantList = () => {
      const fakeUsersNicknames = messages.map((msg) => msg.nickname);
      let uniquefakeUsersNicknames = [...new Set(fakeUsersNicknames)];
      let randomIndex = Math.floor(
        Math.random() * uniquefakeUsersNicknames.length
      );
      uniquefakeUsersNicknames.splice(randomIndex, 0, currentUser.nickname);
      setParticipants(uniquefakeUsersNicknames);
  };

  const sendUserMesegesToServer = () =>
    setTimeout(() => {
      const userMessages = displayedMessagesRef.current.filter(
        (message) => message.nickname === currentUser.nickname
      );
      console.log(userMessages);
      // TODO send to server
    }, messages[messages.length - 1].timeOffset + delayTimeToSendToServerUserMessages);

    const getRandomReadableColor = () => {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      return `rgb(${red}, ${green}, ${blue})`;
    };

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
            <h3 className="chat-room-name">{chatName}</h3>
            <p className="chat-room-last-seen">{participants.join(", ")}</p>
          </div>
          <div className="chat_headerRight"></div>
        </div>
        <div className="chat_body">
          {displayedMessages.map((message, index) => (
            <p
              key={index}
              className={`chat_message ${
                message.nickname === currentUser.nickname && "chat_receiver" 
              }`}
            >
              <span
                className={`chat_name ${message.nickname === currentUser.nickname && "hide"}`}
                style={{
                  color:
                    message.nickname !== currentUser.nickname
                      ? message.color
                      : defaultUserDisplayColor,
                }}
              >
                {message.nickname}
              </span>
              <div>{message.text}</div>
              <span className="chat_timestemp">{message.displayTime}</span>
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
