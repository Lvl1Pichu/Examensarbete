/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("node:fs/promises");

const app = express();
const port = 3001;

let supportQueue = [];
let ChatsWithSupportAgent = [];

async function loadSupportQueue() {
  try {
    const fileContents = await fs.readFile("supportQueue.txt", "utf-8");
    supportQueue = fileContents.split("\n");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(
        "supportQueue.txt does not exist, starting with an empty queue."
      );
    } else {
      console.error("Error reading from supportQueue.txt:", error);
    }
  }
}

loadSupportQueue();

app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const SupportAgent = {
  email: "Linus.supportAgent@gmail.com",
  password: "support123",
};

app.post("/queue", async (req, res) => {
  const GUID = req.body;
  supportQueue.push(GUID);
  try {
    await fs.appendFile("supportQueue.txt", GUID + "\n");
    res.status(200).json({ message: "User has been added to Queue" });
  } catch (error) {
    console.error("Error appending to supportQueue.txt:", error);
    res.status(500).json({ message: "Error adding user to queue" });
  }
});

app.post("/getFromQueue", async (req, res) => {
  const { uid } = req.body;
  const joinedChat = ChatsWithSupportAgent.find((chat) => chat.uid === uid);

  if (joinedChat) {
    // If the agent has already joined, just return the GUID without needing to join again
    res.status(200).json({ GUID: joinedChat.GUID, needsToJoinGroup: false });
  } else if (supportQueue.length > 0) {
    // If the agent hasn't joined, they need to join the group now
    const GUID = supportQueue.shift();
    ChatsWithSupportAgent.push({ GUID, uid });
    await fs.writeFile("supportQueue.txt", supportQueue.join("\n"), "utf8");
    res.status(200).json({ GUID, needsToJoinGroup: true });
  } else {
    res.status(401).json({ error: "No available chats in the queue." });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === SupportAgent.email && password === SupportAgent.password) {
    req.session.isAuthenticated = true;
    res.status(200).json({ message: "Logged in successfully" });
  } else {
    req.session.isAuthenticated = false;
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err);
      res.status(500).send("Error logging out");
    } else {
      res.send("Logged out");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
