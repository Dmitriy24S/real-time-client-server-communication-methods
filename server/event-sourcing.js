const events = require("events");

const emitter = new events.EventEmitter();

function setupEventStream(req, res) {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });

  emitter.on("newMessage", (message) => {
    // console.log("1 on newMessage", message);
    res.write(`data: ${JSON.stringify(message)} \n\n`);
  });
}

function emitNewMessage(message) {
  // console.log("2 newMessage", message);
  emitter.emit("newMessage", message);
}

module.exports = {
  setupEventStream,
  emitNewMessage,
};

// const express = require("express");
// const cors = require("cors");
// const events = require("events");
// const PORT = 5000;

// const emitter = new events.EventEmitter();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use((req, res, next) => {
//   res.setHeader("Cache-Control", "no-cache, no-transform");
//   next();
// });

// app.get("/connect-event-sourcing", (req, res) => {
//   res.writeHead(200, {
//     Connection: "keep-alive",
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//   });
//   emitter.on("newMessage", (message) => {
//     console.log("1 on newMessage", message);
//     res.write(`data: ${JSON.stringify(message)} \n\n`);
//   });
//   // res.end();
// });

// app.post("/new-messages-event-sourcing", (req, res) => {
//   const message = req.body;
//   emitter.emit("newMessage", message);
//   console.log("2 newMessage", message);
//   res.status(200);
//   res.end();
// });

// app.listen(PORT, () => console.log(`server started on port ${PORT}`));
