const express = require("express");
const cors = require("cors");
const events = require("events");
const PORT = 5000;

// const existingMessages = [
//   {
//     message: "Old message 1",
//     id: 0,
//   },
// ];

const emitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/get-messages", (req, res) => {
  // res.json(existingMessages);
  emitter.once("newMessage", (message) => {
    console.log("message2", message);
    // existingMessages.push(message);
    // res.json(...existingMessages);
    // console.log("existingMessages", existingMessages);
    // only Old message 1 show after send or useEffect recursive calls
    res.json(message);
  });
});

app.post("/new-messages", (req, res) => {
  const message = req.body;
  console.log("message1", message); // { message: 'test', id: 1700833854801 }
  // existingMessages.push(message);
  // console.log("existingMessages", existingMessages);
  emitter.emit("newMessage", message);
  res.status(200);
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
