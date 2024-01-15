import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HomePage } from "./template website/Pages/HomePage.tsx";
import Login from "./template website/Pages/LogInPage.tsx";
import { CometChatProvider } from "./CometChat/CometChatContext.tsx";
import { SupportContextProvider } from "./Support Engine/MessageContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CometChatProvider>
      <SupportContextProvider>
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
          </Routes>
        </Router>
      </SupportContextProvider>
    </CometChatProvider>
  </React.StrictMode>
);
