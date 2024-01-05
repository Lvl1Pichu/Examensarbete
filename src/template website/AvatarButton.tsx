import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ChatModal } from "./ChatModal";
import Draggable from "react-draggable";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

export const ChatAvatarButton = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [minimized, setMinimized] = useState(false);
  const draggableRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chatModalPosition", JSON.stringify(position));
  }, [position]);

  const openChat = () => {
    if (minimized) {
      setChatOpen(true);
      setPosition({ x: position.x, y: position.y });
      setMinimized(false);
    } else {
      setPosition({ x: 0, y: 0 });
      setChatOpen(true);
    }
  };

  const closeChat = () => {
    setChatOpen(false);
  };

  const minimizeChat = () => {
    setMinimized(true);
    setChatOpen(false);
  };

  const restorePosition = () => {
    const savedPosition = localStorage.getItem("chatModalPosition");
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
  };

  return (
    <>
      {!chatOpen && (
        <AvatarButton onClick={openChat}>
          <AvatarImage src="src\resources\ChatPicture.png" alt="User Avatar" />
        </AvatarButton>
      )}

      {chatOpen && (
        <Draggable
          defaultPosition={position}
          nodeRef={draggableRef}
          onStop={(_e, data) => {
            setPosition({ x: data.x, y: data.y });
          }}
        >
          <ModalOverlay ref={draggableRef}>
            <ChatModalContainer>
              <HeaderContainer>
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
