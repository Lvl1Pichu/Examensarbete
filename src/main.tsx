import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LogIn } from "./template website/LogIn.tsx";
import { Home } from "./template website/HomePage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<Home />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/registerPage" element={<LogIn />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
