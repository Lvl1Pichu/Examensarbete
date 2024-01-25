import {
  CometChatMessages,
  MessageComposerConfiguration,
  MessageHeaderConfiguration,
} from "@cometchat/chat-uikit-react";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { CustomerInformation } from "../CustomerInformation";
import { useSupportContext } from "../../Support Engine/SupportContext";
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
  background-color: #cb99e9;
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InformationAndChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const Loader = styled.div`
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const SupportPage: React.FC = () => {
  const [ChattingWithGroup, setChattingWithGroup] = useState<
    Group | undefined
  >();
  const SupportContext = useSupportContext();
  let fetchedGroup: Group;
  const [groupGUID, setGroupGUID] = useState<string>("");
  const [IsInGroup, setIsInGroup] = useState<boolean>(false);

  useEffect(() => {
    const retrieveConnectedGroup = async () => {
      const savedGroup = localStorage.getItem("chattingWithGroup");
      if (savedGroup) {
        const groupID = JSON.parse(savedGroup);
        const Group = await CometChat.getGroup(groupID);
        setChattingWithGroup(Group);
        setIsInGroup(true);
      }
    };

    retrieveConnectedGroup();
  }, []);

  const handleStartChat = async () => {
    const UID = SupportContext.getUID();

    if (!UID) {
      console.error("UID is null. Unable to start chat.");
      return;
    }

    try {
      fetchedGroup = await SupportContext.connectSupportAgentToChat(UID);
      if (fetchedGroup) {
        setChattingWithGroup(fetchedGroup);
        setGroupGUID(fetchedGroup.getGuid());
        setIsInGroup(true);
        SupportContext.saveCustomerInfo(fetchedGroup.getGuid());
        localStorage.setItem(
          "chattingWithGroup",
          JSON.stringify(fetchedGroup.getGuid())
        );
      } else {
        console.error("Failed to join the group");
      }
    } catch (error) {
      console.error("Error joining the group:", error);
    }
  };

  const messageComposerConfig = new MessageComposerConfiguration({
    hideLiveReaction: false,
    hideVoiceRecording: false,
    AIIconURL: "",
  });

  const emptyComponent = <></>;

  const messageHeaderConfig = new MessageHeaderConfiguration({
    subtitleView: false,
    menu: emptyComponent,
  });

  const handleEndChat = async () => {
    try {
      await CometChat.leaveGroup(groupGUID);
      console.log("Left CometChat group");

      await fetch("http://localhost:3001/removeGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ GUID: groupGUID }),
      });

      console.log("Group removed from backend");
      setIsInGroup(false);
    } catch (error) {
      console.error("Error ending the chat:", error);
    }
  };

  return (
    <>
      <SupportPageContainer>
        <SupportEngineContainer>
          <HeaderButtonContainer>
            <StyledButton onClick={handleStartChat}>Start</StyledButton>
            <StyledButton onClick={handleEndChat}>End Chat</StyledButton>
          </HeaderButtonContainer>
          <InformationAndChatContainer>
            <CustomerInformationContainer>
              <CustomerInformation></CustomerInformation>
            </CustomerInformationContainer>

            <ChatWindow>
              {!IsInGroup ? (
                <Loader />
              ) : (
                <CometChatMessages
                  group={ChattingWithGroup}
                  messageComposerConfiguration={messageComposerConfig}
                  messageHeaderConfiguration={messageHeaderConfig}
                />
              )}
            </ChatWindow>
          </InformationAndChatContainer>
        </SupportEngineContainer>
      </SupportPageContainer>
    </>
  );
};
