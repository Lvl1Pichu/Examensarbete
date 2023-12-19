import React from "react";
import styled from "styled-components";
import CardSection from "./CardSection";
import { CallToAction } from "./HeroSection";

const SecondaryHeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  color: white;
  text-align: center;
  position: relative;
  background-color: #f0f0f7;
  z-index: -2;
`;

const SecondaryHeroTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
  margin-top: 5rem;
`;

const SecondaryHeroSubtitle = styled.p`
  font-size: 18px;
  max-width: 600px;
`;

const SecondaryHeroButton = styled(CallToAction)``;

const SecondaryHeroSection: React.FC = () => (
  <>
    <SecondaryHeroContainer>
      <CardSection></CardSection>
      <div
        style={{
          position: "absolute",
          width: "100%",
          bottom: "0",
          top: "30%",
          backgroundColor: "#48347c",
          zIndex: "-1",
        }}
      ></div>
      <SecondaryHeroTitle>Join Our Platform</SecondaryHeroTitle>
      <SecondaryHeroSubtitle>
        Get access to all the resources and a network of like-minded individuals
        to increase your workflow efficiency.
      </SecondaryHeroSubtitle>
      <SecondaryHeroButton>Contact Sales</SecondaryHeroButton>
    </SecondaryHeroContainer>
  </>
);

export default SecondaryHeroSection;
