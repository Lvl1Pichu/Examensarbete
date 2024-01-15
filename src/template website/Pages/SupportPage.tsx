import { CometChatMessages } from "@cometchat/chat-uikit-react";
import { Button } from "@mui/material";
import React from "react";
import Draggable from "react-draggable";
import { styled } from "styled-components";
import { CustomerInformation } from "../CustomerInformation";

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
  return (
    <>
      <SupportPageContainer>
        <Draggable>
          <SupportEngineContainer>
            {/* Place the ButtonContainer on top */}
            <HeaderButtonContainer>
              <Button>Start</Button>
              <Button>End Chat</Button>
              <Button>Pause</Button>
              <TimeStoodInCurrentStatusContainer></TimeStoodInCurrentStatusContainer>
            </HeaderButtonContainer>
            <InformationAndChatContainer>
              <CustomerInformationContainer>
                <CustomerInformation groupId={"Ble"}></CustomerInformation>
              </CustomerInformationContainer>
              <ChatWindow>
                <CometChatMessages />
              </ChatWindow>
            </InformationAndChatContainer>
          </SupportEngineContainer>
        </Draggable>
      </SupportPageContainer>
    </>
  );
};
