import bodyParser from "body-parser";
import express from "express";

export const app = express();
const port = 3001;

app.use(bodyParser.json());

const dummyUser = {
  email: "Linus.hammarberg@gmail.com",
  password: "support123",
};

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === dummyUser.email && password === dummyUser.password) {
    res.status(200).json({ message: "Logged in successfully" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
