import React from "react";
import HeroSection from "./HeroSection";
import FinanceManagerCard from "./CardSection";
import SecondaryHeroSection from "./SecondaryHeroSection";

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FinanceManagerCard></FinanceManagerCard>
      <SecondaryHeroSection></SecondaryHeroSection>
    </>
  );
};
