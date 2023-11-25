const express = require("express");
const cors = require("cors");
const longPolling = require("./long-polling");
const eventSourcing = require("./event-sourcing");

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-transform");
  next();
});

// Long Polling
longPolling.setupLongPollingRoutes(app);

// Event Sourcing
app.get("/connect-event-sourcing", eventSourcing.setupEventStream);

app.post("/new-messages-event-sourcing", (req, res) => {
  const message = req.body;
  eventSourcing.emitNewMessage(message);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
