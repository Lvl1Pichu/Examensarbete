import React from "react";
import HeroSection from "./HeroSection";
import SecondaryHeroSection from "./SecondaryHeroSection";
import Header from "./Header";
import { ChatAvatarButton } from "./AvatarButton";

export const Home: React.FC = () => {
  return (
    <>
      <Header></Header>
      <HeroSection></HeroSection>
      <SecondaryHeroSection></SecondaryHeroSection>
      <ChatAvatarButton></ChatAvatarButton>
    </>
  );
};
