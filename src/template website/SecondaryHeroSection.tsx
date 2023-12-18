// SecondaryHeroSection.tsx
import React from "react";
import styled from "styled-components";
import { CallToAction } from "./HeroSection";
import CardSection from "./CardSection";

const SecondaryHeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background-color: #48347c;
  color: white;
  text-align: center;
`;

const SecondaryHeroTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
`;

const SecondaryHeroSubtitle = styled.p`
  font-size: 18px;
  max-width: 600px;
`;

const SecondaryHeroButton = styled(CallToAction)``;

const SecondaryHeroSection: React.FC = () => (
  <>
    <SecondaryHeroContainer>
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
