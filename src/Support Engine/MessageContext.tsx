/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";

type SupportContextType = {
  connectSupportAgentToChat: () => Promise<CometChat.Group>;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
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
        headers: {
          "Content-Type": "text/html",
        },
      });

      const GUID = await response.text();

      if (!GUID) {
        throw new Error("No GUID available for connecting to chat");
      }
      await CometChat.joinGroup(GUID, CometChat.GroupType.Public);
      const fetchedGroup = await CometChat.getGroup(GUID);
      return fetchedGroup;
    } catch (error) {
      console.error("An error has occurred when joining the group", error);
      throw error;
    }
  };

  return (
    <SupportContext.Provider
      value={{
        connectSupportAgentToChat,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export const useSupportContext = () => {
  const context = useContext(SupportContext);
  console.log(context);
  if (!context) {
    throw new Error(
      "useSupportContext must be used within a SupportContextProviderType"
    );
  }
  return context;
};
