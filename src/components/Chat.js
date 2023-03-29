import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "@material-ui/core";
import "../css/Chat.moudle.css";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import {serverAddr} from "../utils/http-communication";

function Chat() {
  const [input, setInput] = useState("");
  const [participants, setParticipants] = useState([]);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [firstMessageTimestamp] = useState(() => performance.now());

  const chatName = "הקבוצה הכי טובה בעולם";
  const ScenarioEndText = "חדר הצ'אט הסתיים. אנא חזור לשאלון";
  const delayTimeToSendToServerUserMessages = 5000;
  const defaultUserDisplayColor = "black";
  const userColors = new Map();
  const currentUser = useSelector((state) => state.user);
  const messages = useSelector((state) => state.scenario.scenario.messages);
  const displayedMessagesRef = useRef(displayedMessages);
  displayedMessagesRef.current = displayedMessages;
  const lastMessageRef = useRef(null);

  const sendMessage = (event) => {
    event.preventDefault();
    const userMessage = {
      text: input,
      nickname: currentUser.nickname,
      milliseconds_offset: performance.now() - firstMessageTimestamp,
    };
    addMessage(userMessage);
    setInput("");
  };

  const renderMessages = () => {
    messages.forEach((message) => {
      setTimeout(() => addMessage(message), message.milliseconds_offset);
    });
  };

  const addMessage = (message) => {
    const displayedMsg = { ...message };
    displayedMsg.displayTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    if (!userColors.has(message.nickname)) {
      userColors.set(message.nickname, getRandomReadableColor());
    }

    displayedMsg.color = userColors.get(message.nickname);
    setDisplayedMessages((prev) => [...prev, displayedMsg]);
    requestAnimationFrame(() => {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    });
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

  const formatUserMessages = (displayedMessagesRef, currentUser) => {
     const userMessages = displayedMessagesRef.current.filter(
       (message) => message.nickname === currentUser.nickname
     );
     const convertedMessages = userMessages.map((msg) => ({
       text: msg.text,
       milliseconds_offset: (Math.round(msg.milliseconds_offset/100))*100,
     }));
     return convertedMessages;
  };

  const sendUserMessagesToServer = () => {
    let scenarioEndTime = 0;

    if(messages && messages.length > 0){
      scenarioEndTime =
        +messages[messages.length - 1].milliseconds_offset +
        +delayTimeToSendToServerUserMessages;
    }
    setTimeout(async () => {
      const convertedMessages = formatUserMessages(
        displayedMessagesRef,
        currentUser
      );
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: convertedMessages,
        }),
      };

      try {
        let result = await fetch(
          serverAddr + `/users/update-messages/${currentUser.id}`,
          options
        );
        result.json().then((res) => {
          console.log(res);
        });
      } catch {
        console.log("Can't send user messeges to server.");
      }
      alert(ScenarioEndText);
    }, scenarioEndTime);
  };

  const getRandomReadableColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  useEffect(() => {
    createParticipantList();
    renderMessages();
    sendUserMessagesToServer();
  }, []);

  return (
    <div className="chat-full-page">
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
              <div
                key={index}
                className={`chat_message ${
                  message.nickname === currentUser.nickname && "chat_receiver"
                }`}
              >
                <span
                  className={`chat_name ${
                    message.nickname === currentUser.nickname && "hide"
                  }`}
                  style={{
                    color:
                      message.nickname !== currentUser.nickname
                        ? message.color
                        : defaultUserDisplayColor,
                  }}
                >
                  {message.nickname}
                </span>
                <div className="message" ref={lastMessageRef}>
                  {message.text}
                </div>
                <span className="chat_timestemp">{message.displayTime}</span>
              </div>
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
    </div>
  );
}

export default Chat;
