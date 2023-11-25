import React, { useState } from "react";
import "./app.css";
import LongPolling from "./LongPolling";
import EventSourcing from "./EventSourcing";

export const EVENT_SOURCING = "EventSourcing";
export const LONG_POLLING = "LongPolling";

function App() {
  const [communcationMethod, setCommuncationMethod] = useState(EVENT_SOURCING);

  const updateCommuncationMethod = (method) => {
    setCommuncationMethod(method);
  };

  return (
    <>
      {/* Toggle Communication Method */}
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="checkbox-input">
          <input
            type="checkbox"
            name="LongPolling"
            id="long-polling-toggle"
            checked={communcationMethod === LONG_POLLING}
            onChange={(e) => {
              e.target.checked && updateCommuncationMethod(LONG_POLLING);
            }}
          />
          <label htmlFor="long-polling-toggle">Long Polling</label>
        </div>
        <div className="checkbox-input">
          <input
            type="checkbox"
            name="EventSourcing"
            id="event-sourcing-toggle"
            checked={communcationMethod === EVENT_SOURCING}
            onChange={(e) => {
              e.target.checked && updateCommuncationMethod(EVENT_SOURCING);
            }}
          />
          <label htmlFor="event-sourcing-toggle">Event Sourcing</label>
        </div>
      </div>

      {/* Input & Messages */}
      <div className="container">
        <LongPolling communcationMethod={communcationMethod} />
        <EventSourcing communcationMethod={communcationMethod} />
      </div>
    </>
  );
}

export default App;
