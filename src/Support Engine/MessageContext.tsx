/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";

type SupportContextType = {
  connectSupportAgentToChat: () => Promise<CometChat.Group>;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  saveUID: (uid: string) => void;
  getUID: () => string;
};

type SupportContextProviderProps = {
  children: ReactNode;
};

const SupportContext = createContext<SupportContextType | undefined>(undefined);

export const SupportContextProvider: React.FC<SupportContextProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    return isAuth === "true";
  });

  const connectSupportAgentToChat = async () => {
    try {
      const response = await fetch("http://localhost:3001/getFromQueue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: getUID() }), // Assuming getUID() is a function you've defined to get the UID
      });

      // Expecting a JSON response
      const { GUID, needsToJoinGroup } = await response.json();

      if (!GUID) {
        throw new Error("No GUID available for connecting to chat");
      }

      if (needsToJoinGroup) {
        // If the support agent needs to join the group
        await CometChat.joinGroup(GUID, CometChat.GroupType.Public);
      }
      // Whether the agent joined now or had already joined, get the group details
      const fetchedGroup = await CometChat.getGroup(GUID);
      return fetchedGroup;
    } catch (error) {
      console.error("An error has occurred when joining the group", error);
      throw error;
    }
  };

  let supportAgentUid = "";

  const saveUID = (uid: string) => {
    supportAgentUid = uid;
  };

  const getUID = () => {
    return supportAgentUid;
  };

  return (
    <SupportContext.Provider
      value={{
        connectSupportAgentToChat,
        isAuthenticated,
        setIsAuthenticated,
        saveUID,
        getUID,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export const useSupportContext = () => {
  const context = useContext(SupportContext);
  if (!context) {
    throw new Error(
      "useSupportContext must be used within a SupportContextProviderType"
    );
  }
  return context;
};
