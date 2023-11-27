import React, { useState } from "react";
import "./app.css";
import LongPolling from "./LongPolling";
import EventSourcing from "./EventSourcing";
import { Checkbox } from "./components/Checkbox";
import WebSocketForm from "./WebSocketForm";

export const EVENT_SOURCING = "Event Stream";
export const LONG_POLLING = "Long Polling";
export const WEB_SOCKET = "Web Socket";

function App() {
  const [communcationMethod, setCommuncationMethod] = useState(EVENT_SOURCING);

  const updateCommuncationMethod = (method) => {
    setCommuncationMethod(method);
  };

  return (
    <>
      {/* Toggle Communication Method */}
      <div className="container" style={{ marginTop: "20px" }}>
        <Checkbox
          name="long-polling"
          label={LONG_POLLING}
          checked={communcationMethod === LONG_POLLING}
          onChange={(e) => {
            e.target.checked && updateCommuncationMethod(LONG_POLLING);
          }}
        />
        <Checkbox
          name="event-sourcing"
          label={EVENT_SOURCING}
          checked={communcationMethod === EVENT_SOURCING}
          onChange={(e) => {
            e.target.checked && updateCommuncationMethod(EVENT_SOURCING);
          }}
        />
        <Checkbox
          name="web-socket"
          label={WEB_SOCKET}
          checked={communcationMethod === WEB_SOCKET}
          onChange={(e) => {
            e.target.checked && updateCommuncationMethod(WEB_SOCKET);
          }}
        />
      </div>

      {/* Input & Messages */}
      <div className="container">
        <LongPolling
          communcationMethod={communcationMethod}
          updateCommuncationMethod={updateCommuncationMethod}
        />
        <EventSourcing
          communcationMethod={communcationMethod}
          updateCommuncationMethod={updateCommuncationMethod}
        />
        <WebSocketForm
          communcationMethod={communcationMethod}
          updateCommuncationMethod={updateCommuncationMethod}
        />
      </div>
    </>
  );
}

export default App;
