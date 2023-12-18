import React from "react";
import HeroSection from "./HeroSection";
import SecondaryHeroSection from "./SecondaryHeroSection";
import CardSection from "./CardSection";

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <CardSection></CardSection>
      <SecondaryHeroSection></SecondaryHeroSection>
    </>
  );
};
