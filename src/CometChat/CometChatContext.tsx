// CometChatContext.js
import React, { createContext, useContext } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { COMETCHAT_CONSTANTS } from "./Constants.js";

const CometChatContext = createContext<any>(null);

export const CometChatProvider = ({ children }) => {
  const generateUniqueId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 16;

    let uniqueId = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueId += characters.charAt(randomIndex);
    }

    return uniqueId;
  };

  const loginUser = async () => {
    try {
      const userId = generateUniqueId();
      const user = await CometChat.login(userId, COMETCHAT_CONSTANTS.AUTH_KEY);
      return user;
    } catch (error) {
      console.error("Error logging in:", error);
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
    <CometChatContext.Provider value={{ loginUser, sendMessage }}>
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
