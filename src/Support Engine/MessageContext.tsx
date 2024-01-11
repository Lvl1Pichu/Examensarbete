/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";

type SupportContextType = {
  saveGUIDToArray: (GUID: string) => void;
  getFirstInLineChat: () => string | null;
  getsupportQueueLength: () => number;
  connectSupportAgentToChat: () => void;
};

type SupportContextProviderProps = {
  children: ReactNode;
};

const SupportContext = createContext<SupportContextType | undefined>(undefined);

export const SupportContextProviderType: React.FC<
  SupportContextProviderProps
> = ({ children }) => {
  const supportQueue: string[] = [];

  const saveGUIDToArray = (GUID: string) => {
    supportQueue.push(GUID);
  };

  const getFirstInLineChat = (): string | null => {
    if (supportQueue.length > 0) {
      return supportQueue[supportQueue.length - 1];
    } else {
      return null;
    }
  };

  const getsupportQueueLength = (): number => {
    if (supportQueue.length > 0) {
      return supportQueue.length;
    } else {
      return 0;
    }
  };

  const connectSupportAgentToChat = async () => {
    try {
      const GUID = getFirstInLineChat();
      await CometChat.joinGroup(GUID, CometChat.GroupType.Public);
      if (GUID) {
        const fetchedGroup = await CometChat.getGroup(GUID);
        return fetchedGroup;
      }
    } catch (error) {
      console.error("An error has ocurred when joining the group", Error);
    }
  };

  return (
    <SupportContext.Provider
      value={{
        saveGUIDToArray,
        getFirstInLineChat,
        getsupportQueueLength,
        connectSupportAgentToChat,
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
