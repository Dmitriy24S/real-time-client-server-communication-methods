import React, { useEffect, useState } from "react";
import axios from "axios";

const LongPulling = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/get-messages", {
        headers: {
          "Cache-Control": "no-cache, no-transform",
        },
      });
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (error) {
      console.log("subscribe error", error);
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setValue("");
    // after send 5 - no update? = fixed with res.end() in server
    await axios.post(
      "http://localhost:5000/new-messages",
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
  };

  return (
    <div className="center">
      <div>
        <form className="form" onSubmit={sendMessage}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            // minLength={1}
            // required
          />
          <button type="submit">Send</button>
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
