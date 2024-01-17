import { CometChatMessages } from "@cometchat/chat-uikit-react";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { styled } from "styled-components";
import { CustomerInformation } from "../CustomerInformation";
import { useSupportContext } from "../../Support Engine/MessageContext";
import { Group, GroupsRequestBuilder } from "@cometchat/chat-sdk-javascript";

const SupportPageContainer = styled.div`
  background-color: #f0f0f7;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SupportEngineContainer = styled.div`
  border: 1px solid black;
  width: 80vh;
  height: 500px;
  display: flex;
  flex-direction: column;
`;

const HeaderButtonContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  padding: 10px;
  text-align: center;
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

  // CHECK WITH COMETCHAT

  const SupportContext = useSupportContext();

  const handleStartChat = async () => {
    try {
      const limit = 30;
      const groupsRequest = new GroupsRequestBuilder()
        .setLimit(limit)
        .joinedOnly(true)
        .build();

      const groupList = await groupsRequest.fetchNext();
      console.log("Groups list fetched successfully", groupList);

      if (groupList && groupList.length > 0) {
        setChattingWithGroup(groupList[0]);
        return;
      }

      // If the user is not in any group, join a new group
      const fetchedGroup = await SupportContext.connectSupportAgentToChat();
      setChattingWithGroup(fetchedGroup);
    } catch (error) {
      console.error("An error occurred during the start chat process", error);
    }
  };

  return (
    <>
      <SupportPageContainer>
        <SupportEngineContainer>
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
