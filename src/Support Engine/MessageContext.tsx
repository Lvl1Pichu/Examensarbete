/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";

type SupportContextType = {
  connectSupportAgentToChat: () => Promise<CometChat.Group>;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  saveUID: (uid: string) => void;
  getUID: () => string;
  saveCustomerInfo: (formData: CustomerInfo) => void;
  getCustomerInfo: () => CustomerInfo | undefined;
};

type CustomerInfo = {
  name: string;
  email: string;
  problem: string;
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
    CustomerInfo | undefined
  >();

  const [supportAgentUid, setSupportAgentUid] = useState<string>("");

  const connectSupportAgentToChat = async () => {
    try {
      const response = await fetch("http://localhost:3001/getFromQueue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: getUID() }),
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
    setSupportAgentUid(uid);
  };

  const getUID = () => {
    return supportAgentUid;
  };
  const saveCustomerInfo = (formData: CustomerInfo) => {
    setCustomerInformation(formData);
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
