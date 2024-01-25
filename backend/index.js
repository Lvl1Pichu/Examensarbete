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
    supportQueue = fileContents.trim().split("\n").filter(line => line);
  } catch (error) {
    console.error("Error reading from supportQueue.txt:", error);
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
    res.status(200).json({ GUID: joinedChat.GUID, needsToJoinGroup: false });
  } else if (supportQueue.length > 0) {
    // Dequeue the GUID
    const GUID = supportQueue.shift();

    // Add to ChatsWithSupportAgent
    ChatsWithSupportAgent.push({ GUID, uid });

    // Write the updated queue back to the file
    try {
      await fs.writeFile("supportQueue.txt", supportQueue.join("\n"), "utf-8");
      res.status(200).json({ GUID, needsToJoinGroup: true });
    } catch (error) {
      console.error("Error writing to supportQueue.txt:", error);
      res.status(500).json({ message: "Error updating queue file" });
    }
  } else {
    res.status(401).json({ error: "No available chats in the queue." });
  }
});

app.post("/SaveGroupData", async (req, res) => {
  const { formData, ID } = req.body;

  try {
    let database = {};

    try {
      const data = await fs.readFile("database.json", "utf8");
      // Initialize database with an empty object if the file is empty
      database = data ? JSON.parse(data) : {};
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log("database.json does not exist, creating new file.");
      } else {
        console.error("Error reading from database.json:", error);
        throw error;
      }
    }

    // Update the database object with new data
    database[ID] = formData;

    // Write the updated database back to database.json
    await fs.writeFile("database.json", JSON.stringify(database, null, 2), "utf8");
    res.status(200).json({ message: "Group data saved successfully" });
  } catch (error) {
    console.error("Error in /SaveGroupData endpoint:", error);
    res.status(500).json({ message: "Error saving group data", error: error.message });
  }
});

app.get('/GetCustomerData/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Read the database.json file
    const data = await fs.readFile('database.json', 'utf8');
    const database = JSON.parse(data);

    // Check if the ID exists in the database
    if (database[id]) {
      res.status(200).json(database[id]);
    } else {
      res.status(404).json({ message: 'Data not found for the given ID' });
    }
  } catch (error) {
    console.error('Error reading from the database:', error);
    res.status(500).json({ message: 'Error retrieving data' });
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
