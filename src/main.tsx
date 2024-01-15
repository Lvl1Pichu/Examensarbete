import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./template website/Pages/HomePage.tsx";
import Login from "./template website/Pages/LogInPage.tsx";
import { CometChatProvider } from "./CometChat/CometChatContext.tsx";
import { SupportContextProvider } from "./Support Engine/MessageContext.tsx";
import { SupportPage } from "./template website/Pages/SupportPage.tsx";

interface PrivateRouteProps {
  children: React.ReactNode;
}

// PrivateRoute component
// eslint-disable-next-line react-refresh/only-export-components
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
};

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
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/supportPage"
                      element={
                        <PrivateRoute>
                          <SupportPage />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </>
              }
            />
          </Routes>
        </Router>
      </SupportContextProvider>
    </CometChatProvider>
  </React.StrictMode>
);
