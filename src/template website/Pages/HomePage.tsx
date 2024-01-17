import React from "react";
import HeroSection from "../HeroSection";
import SecondaryHeroSection from "../SecondaryHeroSection";
import { ChatAvatarButton } from "../AvatarButton";

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <SecondaryHeroSection></SecondaryHeroSection>
      <ChatAvatarButton></ChatAvatarButton>
    </>
  );
};
