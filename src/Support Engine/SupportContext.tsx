/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";

type SupportContextType = {
  connectSupportAgentToChat: (UID: string) => Promise<CometChat.Group>;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  saveUID: (uid: string) => void;
  getUID: () => string | null;
  saveCustomerInfo: (ID: string) => void;
  getCustomerInfo: () => string | undefined;
};

type SupportContextProviderProps = {
  children: ReactNode;
};

const SupportContext = createContext<SupportContextType | undefined>(undefined);

export const SupportContextProvider: React.FC<SupportContextProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    return isAuth === "true";
  });

  const [customerInformation, setCustomerInformation] = useState<
    string | undefined
  >();

  const connectSupportAgentToChat = async (UID: string) => {
    try {
      const response = await fetch("http://localhost:3001/getFromQueue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UID }),
      });
      const { GUID, needsToJoinGroup } = await response.json();

      if (!GUID) {
        throw new Error("No GUID available for connecting to chat");
      }
      if (needsToJoinGroup) {
        const fetchedGroup = await CometChat.joinGroup(
          GUID,
          CometChat.GroupType.Public
        );
        return fetchedGroup;
      } else {
        const fetchedGroup = await CometChat.getGroup(GUID);
        return fetchedGroup;
      }
    } catch (error) {
      console.error("An error has occurred when joining the group", error);
      throw error;
    }
  };

  const saveUID = (uid: string) => {
    localStorage.setItem("UID", uid);
  };

  const getUID = () => {
    return localStorage.getItem("UID");
  };

  const saveCustomerInfo = (ID: string) => {
    setCustomerInformation(ID);
  };

  const getCustomerInfo = () => {
    return customerInformation;
  };

  return (
    <SupportContext.Provider
      value={{
        connectSupportAgentToChat,
        isAuthenticated,
        setIsAuthenticated,
        saveUID,
        getUID,
        saveCustomerInfo,
        getCustomerInfo,
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
