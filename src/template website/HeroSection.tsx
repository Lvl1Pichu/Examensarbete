import React from "react";
import styled from "styled-components";

const HeroSection: React.FC = () => (
  <HeroContainer>
    <HeroTitle>The New Smart Finance & Payment Platform</HeroTitle>
    <HeroSubtitle>
      Network effects pitch holy grail niche market non-disclosure agreement
      long tail assets. Bandwidth branding seed round vesting period technology.
    </HeroSubtitle>
    <CallToAction>Contact Sales</CallToAction>
  </HeroContainer>
);

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #f0f0f7;
  min-height: 70vh;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 70px;
  text-align: center;
  color: #48347c;
  width: 100%;
  max-width: 900px;
  font-weight: 500;
  margin-top: 10vh;
`;

const HeroSubtitle = styled.p`
  margin-top: 2rem;
  font-size: 20px;
  text-align: center;
  max-width: 800px;
  line-height: 35px;
  color: rgba(102, 102, 102, 0.8);
`;

export const CallToAction = styled.button`
  margin-top: 20px;
  padding: 20px 25px;
  border-radius: 10px;
  border: none;
  background-color: #6f03fc;
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
