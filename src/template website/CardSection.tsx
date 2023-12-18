// CardSection.tsx
import React from "react";
import styled from "styled-components";

const CardsContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  flex-basis: 45%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
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
      <CardTitle>Your Special Finance Manager</CardTitle>
      <CardText>
        Short description or pitch for the finance manager feature.
      </CardText>
    </Card>
    <Card>
      <CardTitle>Receive Payment for Everything</CardTitle>
      <CardText>
        Short description or pitch for the payment receiving feature.
      </CardText>
    </Card>
  </CardsContainer>
);

export default CardSection;
