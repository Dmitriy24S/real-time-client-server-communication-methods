import React, { useState } from "react";
import "./app.css";
import LongPolling from "./LongPolling";
import EventSourcing from "./EventSourcing";
import { Checkbox } from "./components/Checkbox";

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
        <Checkbox
          name="long-polling"
          label="Long Polling"
          checked={communcationMethod === LONG_POLLING}
          onChange={(e) => {
            e.target.checked && updateCommuncationMethod(LONG_POLLING);
          }}
        />
        <Checkbox
          name="event-sourcing"
          label="Event Sourcing"
          checked={communcationMethod === EVENT_SOURCING}
          onChange={(e) => {
            e.target.checked && updateCommuncationMethod(EVENT_SOURCING);
          }}
        />
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
