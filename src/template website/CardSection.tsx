import React from "react";
import styled from "styled-components";
import BusinessIntelligence from "../resources/BusinessIntelligence.png"; // Adjust the path as necessary
import BusinessManager from "../resources/BusinesManager.png"; // Adjust the path as necessary

const CardsContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 20px;
  position: relative; // Add relative positioning
  margin-top: -200px; // Pull the container up to overlap with the section above. Adjust value as needed.
  z-index: 10; // Ensure the cards are above the sections
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
  width: 30%; // Set image width or max-width as required
  margin-bottom: 20px; // Add some space between the image and the text
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
    </Card>
    <Card>
      <CardImage src={BusinessManager} alt="Business Manager" />
      <CardTitle>Receive Payment for Everything</CardTitle>
      <CardText>
        Churn rate paradigm shift innovator facebook android infographic
        strategy investor social proof. Churn rate paradigm shift innovator
        facebook android.
      </CardText>
    </Card>
  </CardsContainer>
);

export default CardSection;
