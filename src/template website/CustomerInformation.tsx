import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CustomerInfoContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
`;

const Label = styled.span`
  font-weight: bold;
`;

const InfoText = styled.p`
  margin: 5px 0;
  padding: 5px;
  width: 100%;
  border-radius: 5px;
  background-color: #f5f5f5;
`;

interface CustomerInformationProps {
  groupId: string;
}

// CustomerInformation component
export const CustomerInformation: React.FC<CustomerInformationProps> = ({
  groupId,
}) => {
  const [name, setName] = useState("");
  const [problem, setProblem] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchGroupInfo = async () => {
      // Simulating fetching group data
      const groupData = {
        name: "John Doe",
        problem: "Issue with payment processing",
        email: "johndoe@example.com",
      };
      setName(groupData.name);
      setProblem(groupData.problem);
      setEmail(groupData.email);
    };

    fetchGroupInfo();
  }, [groupId]);

  return (
    <CustomerInfoContainer>
      <Label>Name:</Label>
      <InfoText>{name}</InfoText>

      <Label>Problem:</Label>
      <InfoText>{problem}</InfoText>

      <Label>Email:</Label>
      <InfoText>{email}</InfoText>
    </CustomerInfoContainer>
  );
};
