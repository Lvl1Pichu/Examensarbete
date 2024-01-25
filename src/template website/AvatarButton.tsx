import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ChatModal } from "./ChatModal";
import Draggable from "react-draggable";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useCometChat } from "../CometChat/CometChatContext";
import { useSupportContext } from "../Support Engine/SupportContext";

export const ChatAvatarButton = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [minimized, setMinimized] = useState(false);
  const draggableRef = useRef(null);
  const cometChatContext = useCometChat();
  const supportContext = useSupportContext();

  useEffect(() => {
    localStorage.setItem("chatModalPosition", JSON.stringify(position));
  }, [position]);

  const openChat = () => {
    if (minimized) {
      setPosition({ x: position.x, y: position.y });
      setMinimized(false);
    } else {
      setPosition({ x: 0, y: 0 });
      setChatOpen(true);
    }
  };

  const closeChat = () => {
    setChatOpen(false);
    const ID = supportContext.getCustomerInfo();

    if (ID) {
      console.log(ID);
      cometChatContext.logout(ID);
    }
  };

  const minimizeChat = () => {
    setMinimized(true);
  };

  const restorePosition = () => {
    const savedPosition = localStorage.getItem("chatModalPosition");
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
  };

  return (
    <>
      {minimized && (
        <MinimizedChat onClick={openChat}>
          <QuestionAnswerIcon style={{ color: "white" }} />
        </MinimizedChat>
      )}
      {!chatOpen && !minimized && (
        <AvatarButton onClick={openChat}>
          <AvatarImage src="src\resources\ChatPicture.png" alt="User Avatar" />
        </AvatarButton>
      )}

      {chatOpen && !minimized && (
        <Draggable
          defaultPosition={position}
          handle=".handle"
          nodeRef={draggableRef}
          onStop={(_e, data) => {
            setPosition({ x: data.x, y: data.y });
          }}
        >
          <ModalOverlay ref={draggableRef}>
            <ChatModalContainer>
              <HeaderContainer className="handle">
                <QuestionAnswerIcon style={{ color: "white" }} />
                <h4 style={{ color: "white" }}>Chat with us</h4>
                <ButtonContainer>
                  <Button
                    onClick={() => {
                      minimizeChat();
                      restorePosition();
                    }}
                  >
                    <RemoveIcon />
                  </Button>
                  <Button onClick={closeChat}>
                    <CloseIcon />
                  </Button>
                </ButtonContainer>
              </HeaderContainer>
              <ChatModal />
            </ChatModalContainer>
          </ModalOverlay>
        </Draggable>
      )}
    </>
  );
};

const MinimizedChat = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: 2px solid #6f03fc;
  border-radius: 50%;
  background-color: #6f03fc;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #68347c;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div``;

const Button = styled.button`
  border: none;
  background-color: #6f03fc;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #6c63ff;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    background-color: #5a52e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const AvatarButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 80px;
  height: 80px;
  border: 2px solid #6f03fc;
  border-radius: 50%;
  background-color: #6f03fc;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #68347c;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ModalOverlay = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: auto;
  height: auto;
`;

const ChatModalContainer = styled.div`
  background-color: #6f03fc;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
`;
