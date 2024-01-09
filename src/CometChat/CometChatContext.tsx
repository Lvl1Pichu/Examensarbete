import { ReactNode, createContext, useContext } from "react";
import {
  BaseMessage,
  CometChat,
  CustomMessage,
  MediaMessage,
  TextMessage,
  User,
} from "@cometchat/chat-sdk-javascript";

type CometChatContextType = {
  loginUser: (UID: string) => Promise<User>;
  createUser: (name: string, UID: string) => Promise<void>;
  createGroup: (GUID: string) => Promise<CometChat.Group>;
  formatIDForCometChat: (stringToBeFormatted: string) => string;
  sendMessage: (
    groupId: string,
    text: string
  ) => Promise<TextMessage | MediaMessage | CustomMessage | BaseMessage>;
};

type CometChatProviderProps = {
  children: ReactNode;
};

const CometChatContext = createContext<CometChatContextType | undefined>(
  undefined
);

export const CometChatProvider: React.FC<CometChatProviderProps> = ({
  children,
}) => {
  const loginUser = async (UID: string) => {
    try {
      const authKey = "64b7d20f19139473eb976616d751e447b3a8f516";
      const user = await CometChat.login(UID, authKey);
      console.log("user logged in");
      return user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const createUser = async (name: string, UID: string) => {
    try {
      await loginUser(UID);
    } catch {
      const authKey: string = "64b7d20f19139473eb976616d751e447b3a8f516";
      const user = new CometChat.User(UID);
      user.setName(name);

      try {
        await CometChat.createUser(user, authKey);
        await loginUser(UID);
      } catch (error) {
        console.log("User creation failed with exception:", error);
        throw error;
      }
    }
  };
  const createGroup = async (GUID: string) => {
    const groupName: string = "Hello Group!";
    const groupType: string = CometChat.GROUP_TYPE.PUBLIC;

    const group: CometChat.Group = new CometChat.Group(
      GUID,
      groupName,
      groupType
    );

    try {
      const createdGroup = await CometChat.createGroup(group);
      console.log("Group created successfully:", createdGroup);
      return createdGroup;
    } catch (error) {
      console.log("Group creation failed with exception:", error);
      throw error;
    }
  };

  const formatIDForCometChat = (stringToBeFormatted: string) => {
    const formattedString = stringToBeFormatted.replace(/@|\./g, "_");
    return formattedString;
  };

  const sendMessage = async (groupId: string, text: string) => {
    try {
      const textMessage = new CometChat.TextMessage(
        text,
        groupId,
        CometChat.RECEIVER_TYPE.GROUP
      );
      const message = await CometChat.sendMessage(textMessage);
      return message;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  return (
    <CometChatContext.Provider
      value={{
        loginUser,
        createUser,
        createGroup,
        formatIDForCometChat,
        sendMessage,
      }}
    >
      {children}
    </CometChatContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCometChat = () => {
  const context = useContext(CometChatContext);
  if (!context) {
    throw new Error("useCometChat must be used within a CometChatProvider");
  }
  return context;
};
