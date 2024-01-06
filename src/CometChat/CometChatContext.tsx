import { ReactNode, createContext, useContext } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";

type CometChatContextType = {
  loginUser: () => void;
  sendMessage: (groupId: string, text: string) => void;
  createUser: () => void;
  createGroup: () => Promise<CometChat.Group>;
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
  const loginUser = async () => {
    try {
      const userId = "user12";
      const user = await CometChat.login(
        userId,
        "64b7d20f19139473eb976616d751e447b3a8f516"
      );
      return user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const createUser = () => {
    const authKey: string = "64b7d20f19139473eb976616d751e447b3a8f516",
      UID: string = "user12",
      name: string = "Kevin";

    const user = new CometChat.User(UID);

    user.setName(name);

    CometChat.createUser(user, authKey).then(
      (user: CometChat.User) => {
        console.log("user created", user);
      },
      (error: CometChat.CometChatException) => {
        console.log("error", error);
      }
    );
  };

  const createGroup = async () => {
    const GUID: string = "GUID";
    const groupName: string = "Hello Group!";
    const groupType: string = CometChat.GROUP_TYPE.PRIVATE;

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
      value={{ loginUser, sendMessage, createUser, createGroup }}
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
