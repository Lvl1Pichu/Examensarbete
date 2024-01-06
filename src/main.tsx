import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HomePage } from "./template website/Pages/HomePage.tsx";
import Register from "./template website/Register.tsx";
import Login from "./template website/LogIn.tsx";
import { CometChatProvider } from "./CometChat/CometChatContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CometChatProvider>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <App />
                <Routes>
                  <Route index element={<HomePage />} />
                </Routes>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </CometChatProvider>
  </React.StrictMode>
);
