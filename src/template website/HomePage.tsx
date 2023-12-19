import React from "react";
import HeroSection from "./HeroSection";
import SecondaryHeroSection from "./SecondaryHeroSection";
import { CometChatUsersWithMessages } from "@cometchat/chat-uikit-react";

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <CometChatUsersWithMessages />
      <SecondaryHeroSection></SecondaryHeroSection>
    </>
  );
};
