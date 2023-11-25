import React, { useEffect, useState } from "react";
import axios from "axios";
import { EVENT_SOURCING } from "./App";

const EventSourcing = ({ communcationMethod }) => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const isActiveMethod = communcationMethod === EVENT_SOURCING;

  useEffect(() => {
    if (communcationMethod === EVENT_SOURCING) {
      subscribe();
    }
  }, [communcationMethod]);

  const subscribe = async () => {
    console.log("subscribe event-sourcing");
    const eventSource = new EventSource(
      `http://localhost:5000/connect-event-sourcing`
    );
    eventSource.onmessage = function (event) {
      console.log("onmessage event-sourcing event:", event);
      const message = JSON.parse(event.data);
      console.log("onmessage event-sourcing", message);
      setMessages((prev) => [message, ...prev]);
    };
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("sendmessage event-sourcing", value);
    await axios.post(
      "http://localhost:5000/new-messages-event-sourcing",
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
      <h2>Event Sourcing {isActiveMethod ? "(active)" : ""}</h2>
      <div>
        <form
          className="form"
          onSubmit={sendMessage}
          // disabled={!isActiveMethod}
        >
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
          {messages.map((mess) => (
            <div className="message" key={mess.id}>
              {mess.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventSourcing;
