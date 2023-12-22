import React from "react";
import styled from "styled-components";
import BusinessIntelligence from "../resources/BusinessIntelligence.png";
import BusinessManager from "../resources/BusinesManager.png";

const CardSection: React.FC = () => (
  <CardsContainer>
    <Card>
      <CardImage src={BusinessIntelligence} alt="Business Intelligence" />
      <CardTitle>Your Special Finance Manager</CardTitle>
      <CardText>
        Churn rate paradigm shift innovator facebook android infographic
        strategy investor social proof. Churn rate paradigm shift innovator
        facebook android.
      </CardText>
      <CallToActionButton>Learn More</CallToActionButton>
    </Card>
    <Card>
      <CardImage src={BusinessManager} alt="Business Manager" />
      <CardTitle>Receive Payment for Everything</CardTitle>
      <CardText>
        Churn rate paradigm shift innovator facebook android infographic
        strategy investor social proof. Churn rate paradigm shift innovator
        facebook android.
      </CardText>
      <CallToActionButton>Learn More</CallToActionButton>
    </Card>
  </CardsContainer>
);

const CardsContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 20px;
  position: relative;
  z-index: 10;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`;

const Card = styled.div`
  flex-basis: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const CardImage = styled.img`
  width: 30%;
  margin-bottom: 20px;
`;

const CardTitle = styled.h2`
  font-size: 32px;
  color: #4b0082;
  font-weight: 500;
`;

const CardText = styled.p`
  font-size: 18px;
  line-height: 30px;
  color: #666;
`;

const CallToActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #6c63ff;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a52e0;
  }

  &:focus {
    outline: none;
  }
`;
export default CardSection;
