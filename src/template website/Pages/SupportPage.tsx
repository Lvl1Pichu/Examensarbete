import {
  CometChatMessages,
  MessageComposerConfiguration,
  MessageHeaderConfiguration,
} from "@cometchat/chat-uikit-react";
import React, { useState } from "react";
import { styled } from "styled-components";
import { CustomerInformation } from "../CustomerInformation";
import { useSupportContext } from "../../Support Engine/MessageContext";
import { Group, CometChat } from "@cometchat/chat-sdk-javascript";

const SupportPageContainer = styled.div`
  background-color: #f0f0f7;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SupportEngineContainer = styled.div`
  width: 80vh;
  height: 500px;
  display: flex;
  flex-direction: column;
`;

const HeaderButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 10px;
  background-color: #ffffff;
`;

const StyledButton = styled.button`
  margin: 0 5px;
  padding: 6px 15px;
  font-size: 14px;
  text-transform: none;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  color: #555;
  background-color: #fafafa;

  &:hover {
    background-color: #f0f0f0;
    border-color: #c0c0c0;
  }

  &.active {
    border-color: #a0a0a0;
    background-color: #e0e0e0;
  }
`;

const CustomerInformationContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const ChatWindow = styled.div`
  flex: 2;
  width: 100%;
  height: 100%;
  box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const InformationAndChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const SupportPage: React.FC = () => {
  const [ChattingWithGroup, setChattingWithGroup] = useState<
    Group | undefined
  >();
  const SupportContext = useSupportContext();
  let fetchedGroup: Group;

  const handleStartChat = async () => {
    fetchedGroup = await SupportContext.connectSupportAgentToChat();
    setChattingWithGroup(fetchedGroup);
  };

  const messageComposerConfig = new MessageComposerConfiguration({
    hideLiveReaction: false,
    hideVoiceRecording: false,
    AIIconURL: "",
  });

  const emptyComponent = () => null;

  const messageHeaderConfig = new MessageHeaderConfiguration({
    subtitleView: false,
    menu: emptyComponent,
  });

  const handleEndChat = () => {
    CometChat.deleteGroup(fetchedGroup.getGuid());
  };

  return (
    <>
      <SupportPageContainer>
        <SupportEngineContainer>
          <HeaderButtonContainer>
            <StyledButton onClick={handleStartChat}>Start</StyledButton>
            <StyledButton onClick={handleEndChat}>End Chat</StyledButton>
            <StyledButton>Pause</StyledButton>
          </HeaderButtonContainer>
          <InformationAndChatContainer>
            <CustomerInformationContainer>
              <CustomerInformation groupId={""}></CustomerInformation>
            </CustomerInformationContainer>
            <ChatWindow>
              <CometChatMessages
                group={ChattingWithGroup}
                messageComposerConfiguration={messageComposerConfig}
                messageHeaderConfiguration={messageHeaderConfig}
              />{" "}
            </ChatWindow>
          </InformationAndChatContainer>
        </SupportEngineContainer>
      </SupportPageContainer>
    </>
  );
};
