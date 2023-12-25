import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./template website/Header";
import { ChatAvatarButton } from "./template website/AvatarButton";

function App() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <ChatAvatarButton></ChatAvatarButton>
    </>
  );
}

export default App;
