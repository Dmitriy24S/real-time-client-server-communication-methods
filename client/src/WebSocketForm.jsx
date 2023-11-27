import React, { useRef, useState } from "react";
import { WEB_SOCKET } from "./App";

const WebSocketForm = ({ communcationMethod, updateCommuncationMethod }) => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const isActiveMethod = communcationMethod === WEB_SOCKET;

  function connect(e) {
    e.preventDefault();

    socket.current = new WebSocket("ws://localhost:5001");

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
      console.log("Socket onopen, msg", message);
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
      console.log("Socket onmessage, msg", message);
    };
    socket.current.onclose = () => {
      console.log("Socket closed");
    };
    socket.current.onerror = () => {
      console.log("Socket error");
    };
  }

  const sendMessage = async (e) => {
    e.preventDefault();

    const message = {
      username,
      message: value,
      id: Date.now(),
      event: "message",
    };
    socket.current.send(JSON.stringify(message));
    setValue("");
    console.log("sendMessage mg", message);
  };

  if (!connected) {
    return (
      <div className="center">
        <h2>
          {WEB_SOCKET}{" "}
          {isActiveMethod ? (
            "(active)"
          ) : (
            <button
              type="button"
              onClick={() => updateCommuncationMethod(WEB_SOCKET)}
            >
              Select
            </button>
          )}
        </h2>

        <form className="form" onSubmit={connect}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter name"
            disabled={!isActiveMethod}
          />
          <button type="submit" disabled={!isActiveMethod}>
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="center">
      <h2>
        {WEB_SOCKET}{" "}
        {isActiveMethod ? (
          "(active)"
        ) : (
          <button
            type="button"
            onClick={() => updateCommuncationMethod(WEB_SOCKET)}
          >
            Select
          </button>
        )}
      </h2>

      <div>
        <form className="form" onSubmit={sendMessage}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            disabled={!isActiveMethod}
          />
          <button disabled={!isActiveMethod}>Send</button>
        </form>
        <div className="messages">
          {messages.map((mess) => (
            <div key={mess.id}>
              {mess.event === "connection" ? (
                <div className="connection_message">
                  User {mess.username} connected
                </div>
              ) : (
                <div className="message">
                  {mess.username}: {mess.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebSocketForm;
