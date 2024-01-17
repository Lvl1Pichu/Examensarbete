/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const cors = require("cors");
const session = require("express-session"); // Import express-session
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

const supportQueue = [];

app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with the URL of your React app
  })
);

// Use express-session middleware
app.use(
  session({
    secret: "your_secret_key", // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use true if you are using https
  })
);

const SupportAgent = {
  email: "Linus.supportAgent@gmail.com",
  password: "support123",
};

app.post("/queue", (req, res) => {
  const GUID = req.body;
  console.log(req.body, "Request body");
  supportQueue.push(GUID);
  res.status(200).json({ message: "User has been added to Queue" });
});

app.get("/getFromQueue", (req, res) => {
  if (supportQueue.length > 0) {
    console.log(supportQueue);
    res.status(200);
    res.send(supportQueue[0]);
  } else {
    res.status(401).send();
  }
});

// Login route
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
  req.session.destroy(); // Destroying the session
  res.send("Logged out");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
