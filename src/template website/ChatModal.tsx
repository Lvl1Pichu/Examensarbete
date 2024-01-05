import { TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";

// import { CometChat } from "@cometchat/chat-sdk-javascript";

export const ChatModal = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    problem: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    console.log(formData);
    // try {
    //   const user = await CometChat.login();
    //   const group = new CometChat.createGroup(group);

    //   const textMessage = new CometChat.TextMessage(
    //     formData.problem,
    //     CometChat.MESSAGE_TYPE.TEXT,
    //     CometChat.RECEIVER_TYPE.GROUP
    //   );

    //   await CometChat.sendMessage(textMessage);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <ChatContainer>
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
    </ChatContainer>
  );
};

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
