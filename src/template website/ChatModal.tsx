import { TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useCometChat } from "../CometChat/CometChatContext";
import {
  CometChatMessages,
  MessageComposerConfiguration,
  MessageHeaderConfiguration,
} from "@cometchat/chat-uikit-react";
import { CometChat, Group } from "@cometchat/chat-sdk-javascript";
import { useSupportContext } from "../Support Engine/SupportContext";

type FormData = {
  name: string;
  email: string;
  problem: string;
};

export const ChatModal = () => {
  const cometChatContext = useCometChat();
  const MessageContext = useSupportContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    problem: "",
  });

  const [groupCreated, setGroupCreated] = useState(false);
  const [ChattingWithGroup, setChattingWithGroup] = useState<
    Group | undefined
  >();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      return newData;
    });
  };

  useEffect(() => {
    const ID = MessageContext.getCustomerInfo();
    if (ID) {
      checkForExistingGroup(ID);
    }
  }, [MessageContext, cometChatContext]);

  const checkForExistingGroup = async (ID: string) => {
    try {
      const fetchedGroup = await CometChat.getGroup(ID);
      setChattingWithGroup(fetchedGroup);
      setGroupCreated(true);
    } catch (error) {
      console.log("No existing group found for this user:", error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const ID = cometChatContext.formatIDForCometChat(formData.email);

    try {
      await createUserAndHandleGroup(ID).then();
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  const createUserAndHandleGroup = async (ID: string) => {
    try {
      const userCreatedOrLoggedIn = await cometChatContext.createOrLoginUser(
        formData.name,
        ID
      );
      if (userCreatedOrLoggedIn) {
        await handleGroup(ID);
      } else {
        console.error("User creation/login failed");
      }
    } catch (error) {
      console.error("Error in createUserAndHandleGroup:", error);
      throw error; // Re-throw error to be caught in handleSubmit
    }
  };

  const handleGroup = async (ID: string) => {
    try {
      const fetchedGroup = await CometChat.getGroup(ID);
      handleExistingGroup(fetchedGroup);
    } catch {
      await createNewGroup(ID);
    }
  };

  const handleExistingGroup = (group: Group) => {
    setChattingWithGroup(group);
    setGroupCreated(true);
  };

  const createNewGroup = async (ID: string) => {
    const createdGroup = await cometChatContext.createGroup(ID);
    setChattingWithGroup(createdGroup);
    setGroupCreated(true);
    const textMessage = createTextMessage(ID);
    await CometChat.sendMessage(textMessage);
    MessageContext.saveCustomerInfo(ID);

    await sendFormDataToBackend(formData, ID.toLowerCase());
  };

  const sendFormDataToBackend = async (formData: FormData, ID: string) => {
    try {
      const response = await fetch("http://localhost:3001/SaveGroupData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData, ID }),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to the backend");
      }

      console.log("Data sent successfully");
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const createTextMessage = (ID: string) => {
    return new CometChat.TextMessage(
      ID,
      formData.problem,
      CometChat.RECEIVER_TYPE.GROUP
    );
  };

  const messageComposerConfig = new MessageComposerConfiguration({
    secondaryButtonView: null,
    auxilaryButtonView: null,
    hideVoiceRecording: true,
    hideLiveReaction: true,
    AIIconURL: "",
  });

  const emptyComponent = <></>;

  const messageHeaderConfig = new MessageHeaderConfiguration({
    subtitleView: false,
    menu: emptyComponent,
  });

  return (
    <ChatContainer>
      {groupCreated ? (
        <MessagesContainer>
          <CometChatMessages
            group={ChattingWithGroup}
            messageComposerConfiguration={messageComposerConfig}
            messageHeaderConfiguration={messageHeaderConfig}
          />
        </MessagesContainer>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <TextField
              label="Name"
              variant="outlined"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <TextField
              label="Email"
              variant="outlined"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <TextField
              label="Describe the problem"
              variant="outlined"
              id="problem"
              name="problem"
              multiline
              rows={4}
              value={formData.problem}
              onChange={handleChange}
              required
              style={{ width: "100%" }}
            />
          </FormGroup>
          <SubmitButton type="submit">Start Chat</SubmitButton>
        </form>
      )}
    </ChatContainer>
  );
};

const MessagesContainer = styled.div`
  height: 400px;
  width: 320px;
`;

const ChatContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
  }
`;

const SubmitButton = styled.button`
  background-color: #6c63ff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6f03fc;
  }
`;

export default ChatModal;
