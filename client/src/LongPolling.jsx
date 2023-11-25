import React, { useEffect, useState } from "react";
import axios from "axios";
import { LONG_POLLING } from "./App";

const LongPulling = ({ communcationMethod }) => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const isActiveMethod = communcationMethod === LONG_POLLING;

  useEffect(() => {
    if (communcationMethod === LONG_POLLING) {
      subscribe();
    }
  }, [communcationMethod]);

  const subscribe = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/get-messages-long-polling",
        {
          headers: {
            "Cache-Control": "no-cache, no-transform",
          },
        }
      );
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (error) {
      console.log("subscribe error long-polling", error);
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:5000/new-messages-long-polling",
      {
        message: value,
        id: Date.now(),
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-transform",
        },
      }
    );
    setValue("");
  };

  return (
    <div className="center">
      <h2>Long Polling {isActiveMethod ? "(active)" : ""}</h2>
      <div>
        <form className="form" onSubmit={sendMessage}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            disabled={!isActiveMethod}
            // minLength={1}
            // required
          />
          <button type="submit" disabled={!isActiveMethod}>
            Send
          </button>
        </form>
        <div className="messages">
          {messages.map((messsage) => (
            <div className="message" key={messsage.id}>
              {messsage.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LongPulling;
