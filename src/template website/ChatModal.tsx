import styled from "styled-components";

export const ChatModal = () => {
  return (
    <ChatContainer>
      <form></form>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
`;

const ChatMessagesContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const ChatComposerContainer = styled.div`
  padding: 10px;
`;

export default ChatModal;
