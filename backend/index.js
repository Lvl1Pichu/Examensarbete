/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const cors = require("cors");
const session = require("express-session"); // Import express-session
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(bodyParser.json());

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
  email: "Linus.hammarberg@gmail.com",
  password: "support123",
};

const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).send("Not authenticated");
  }
};

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

app.get("/protected-route", isAuthenticated, (req, res) => {
  if (req.session.userRole === "supportAgent") {
    res.send("Welcome, Support Agent!");
  } else {
    res.send("Access Denied");
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy(); // Destroying the session
  res.send("Logged out");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
