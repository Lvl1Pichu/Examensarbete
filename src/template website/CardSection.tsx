import React from "react";
import styled from "styled-components";
import BusinessIntelligence from "../resources/BusinessIntelligence.png"; // Adjust the path as necessary
import BusinessManager from "../resources/BusinesManager.png"; // Adjust the path as necessary

const CardsContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 170px;
  padding: 20px;
  position: relative; // Add relative positioning
  margin-top: -100px; // Pull the container up to overlap with the section above. Adjust value as needed.
  z-index: 10; // Ensure the cards are above the sections
`;

const Card = styled.div`
  flex-basis: 35%;
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
  width: 25%; // Set image width or max-width as required
  margin-bottom: 20px; // Add some space between the image and the text
`;

const CardTitle = styled.h2`
  font-size: 24px;
  color: #4b0082;
`;

const CardText = styled.p`
  font-size: 16px;
  color: #666;
`;

const CardSection: React.FC = () => (
  <CardsContainer>
    <Card>
      <CardImage src={BusinessIntelligence} alt="Business Intelligence" />
      <CardTitle>Your Special Finance Manager</CardTitle>
      <CardText>
        Short description or pitch for the finance manager feature.
      </CardText>
    </Card>
    <Card>
      <CardImage src={BusinessManager} alt="Business Manager" />
      <CardTitle>Receive Payment for Everything</CardTitle>
      <CardText>
        Short description or pitch for the payment receiving feature.
      </CardText>
    </Card>
  </CardsContainer>
);

export default CardSection;
