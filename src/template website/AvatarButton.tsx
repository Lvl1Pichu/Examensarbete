import styled from "styled-components";
import { useState } from "react";
import { ChatModal } from "./ChatModal";

export const ChatAvatarButton = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const openChat = () => {
    setChatOpen(true);
  };

  const closeChat = () => {
    setChatOpen(false);
  };

  return (
    <>
      <AvatarButton onClick={openChat}>
        <AvatarImage src="src\resources\ChatPicture.png" alt="User Avatar" />
      </AvatarButton>

      {chatOpen && (
        <ModalOverlay>
          <ChatModalContainer>
            <CloseButton onClick={closeChat}>Close</CloseButton>
            <ChatModal />
          </ChatModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

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

const CloseButton = styled.button`
  background-color: #fff;
  color: #6f03fc;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;
