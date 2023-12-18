import React from "react";
import styled from "styled-components";

const HeroSection: React.FC = () => (
  <HeroContainer>
    <HeroTitle>The New Smart Finance & Payment Platform</HeroTitle>
    <Container>
      <HeroSubtitle>
        Network effects pitch holy grail niche market non-disclosure agreement
        long tail assets. Bandwidth branding seed round vesting period
        technology.
      </HeroSubtitle>
    </Container>
    <CallToAction>Contact Sales</CallToAction>
  </HeroContainer>
);

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background-color: #f0f0f7;
  min-height: 70vh;
`;

const HeroTitle = styled.h1`
  font-size: 60px;
  text-align: center;
  color: #48347c;
`;

const Container = styled.div`
  width: 70%;
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  text-align: center;
`;

export const CallToAction = styled.button`
  margin-top: 20px;
  padding: 10px 25px;
  border-radius: 10px;
  border: none;
  background-color: #48347c;
  color: white;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: #6c63ff;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    background-color: #5a52e0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

export default HeroSection;
