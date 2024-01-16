import { CometChatMessages } from "@cometchat/chat-uikit-react";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { styled } from "styled-components";
import { CustomerInformation } from "../CustomerInformation";
import { useSupportContext } from "../../Support Engine/MessageContext";
import { Group } from "@cometchat/chat-sdk-javascript";

const SupportPageContainer = styled.div`
  background-color: #f0f0f7;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SupportEngineContainer = styled.div`
  border: 1px solid black;
  width: 80vh; // You might want to adjust the width as well
  height: 500px;
  display: flex;
  flex-direction: column; // Changed to column
`;

const HeaderButtonContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  padding: 10px; // Add padding for visual comfort
  text-align: center; // Center the content if needed
`;

const CustomerInformationContainer = styled.div`
  flex: 1;
  border: 1px solid black;
  width: 100%;
  height: 100%;
`;

const ChatWindow = styled.div`
  flex: 2;
  border: 1px solid black;
  width: 100%;
  height: 100%;
`;

const InformationAndChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const TimeStoodInCurrentStatusContainer = styled.div``;

export const SupportPage: React.FC = () => {
  const [ChattingWithGroup, setChattingWithGroup] = useState<
    Group | undefined
  >();
  const SupportContext = useSupportContext();

  const handleStartChat = async () => {
    const fetchedGroup = await SupportContext.connectSupportAgentToChat();
    setChattingWithGroup(fetchedGroup);
  };

  return (
    <>
      <SupportPageContainer>
        <SupportEngineContainer>
          {/* Place the ButtonContainer on top */}
          <HeaderButtonContainer>
            <Button onClick={handleStartChat}>Start</Button>
            <Button>End Chat</Button>
            <Button>Pause</Button>
            <TimeStoodInCurrentStatusContainer></TimeStoodInCurrentStatusContainer>
          </HeaderButtonContainer>
          <InformationAndChatContainer>
            <CustomerInformationContainer>
              <CustomerInformation groupId={""}></CustomerInformation>
            </CustomerInformationContainer>
            <ChatWindow>
              <CometChatMessages group={ChattingWithGroup} />
            </ChatWindow>
          </InformationAndChatContainer>
        </SupportEngineContainer>
      </SupportPageContainer>
    </>
  );
};
