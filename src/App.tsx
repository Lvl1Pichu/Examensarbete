import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./template website/Header";

function App() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
}

export default App;
