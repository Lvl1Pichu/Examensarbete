import React from "react";
import HeroSection from "./HeroSection";
import SecondaryHeroSection from "./SecondaryHeroSection";
import Header from "./Header";

export const Home: React.FC = () => {
  return (
    <>
      <Header></Header>
      <HeroSection></HeroSection>
      <SecondaryHeroSection></SecondaryHeroSection>
    </>
  );
};
