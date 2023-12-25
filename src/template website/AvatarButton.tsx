import styled from "styled-components";
import { useState } from "react";

export const ChatAvatarButton = () => {
  const [ChatOpen, setChatOpen] = useState(false);

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

      {ChatOpen && (
        <ModalOverlay onClick={closeChat}>
          <ChatModal>
            {/* Content of the chat modal */}
            Chat Window Content
          </ChatModal>
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
  border: 2px solid #48347c;
  border-radius: 50%;
  background-color: #48347c;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatModal = styled.div`
  background-color: #48347c;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
`;
