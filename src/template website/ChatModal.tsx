import {
  CometChatMessageComposer,
  CometChatMessageHeader,
  CometChatMessages,
} from "@cometchat/chat-uikit-react";
import React from "react";

export const ChatModal: React.FC = () => {
  return (
    <>
      <CometChatMessageHeader></CometChatMessageHeader>
      <CometChatMessages />
      <CometChatMessageComposer></CometChatMessageComposer>
    </>
  );
};
