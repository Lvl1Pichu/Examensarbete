import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSupportContext } from "../Support Engine/MessageContext";

const CustomerInfoContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  background-color: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  font-family: "Arial", sans-serif;
  height: 100%;
`;

const Label = styled.span`
  font-weight: bold;
  color: #333333;
  margin-bottom: 10px;
`;
const InfoText = styled.p`
  margin: 0 0 20px 0;
  padding: 10px;
  width: calc(100% - 20px);
  background-color: #f9f9f9;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #eef2f7;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }
`;
interface CustomerInformationProps {
  groupId: string;
}

export const CustomerInformation: React.FC<CustomerInformationProps> = ({
  groupId,
}) => {
  const [name, setName] = useState("");
  const [problem, setProblem] = useState("");
  const [email, setEmail] = useState("");
  const MessageContext = useSupportContext();

  useEffect(() => {
    const fetchGroupInfo = () => {
      const customerInfo = MessageContext.getCustomerInfo();
      console.log(customerInfo);
      if (customerInfo) {
        setName(customerInfo.name);
        setProblem(customerInfo.problem);
        setEmail(customerInfo.email);
      }
    };

    fetchGroupInfo();
  }, [MessageContext, groupId]);

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
