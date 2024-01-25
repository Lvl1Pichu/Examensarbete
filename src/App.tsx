import { useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./template website/Header";

function App() {
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:3001/validate-session");
        const data = await response.json();
        localStorage.setItem("isAuthenticated", data.isAuthenticated);
        if (!data.isAuthenticated) {
          localStorage.setItem("isAuthenticated", "false");
        }
      } catch (error) {
        console.error("Error checking session", error);
      }
    };

    checkSession();
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
