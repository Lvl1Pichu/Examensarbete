import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSupportContext } from "../Support Engine/SupportContext";
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
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

const Label = styled.span`
  font-weight: bold;
  color: #333333;
  margin-bottom: 10px;
  width: 100%;
`;

const InfoText = styled.p`
  word-break: break-all;
  margin: 0 0 20px 0;
  padding: 10px;
  width: 100%; // Use 100% width for responsiveness
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  font-size: 1em; // Use relative unit for font size

  &:hover {
    background-color: #eef2f7;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 0.9em; // Slightly smaller font size for smaller screens
  }
`;

export const CustomerInformation: React.FC = () => {
  const [customerData, setCustomerData] = useState({
    name: "",
    problem: "",
    email: "",
  });
  const { getCustomerInfo } = useSupportContext();

  useEffect(() => {
    const GUID = getCustomerInfo();
    if (GUID) {
      const localStorageData = localStorage.getItem(`customerData_${GUID}`);
      if (localStorageData) {
        // If data exists in local storage, use it
        setCustomerData(JSON.parse(localStorageData));
      } else {
        // Fetch data from the API
        const fetchCustomerData = async () => {
          try {
            const response = await fetch(
              `http://localhost:3001/GetCustomerData/${GUID}`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCustomerData(data); // Update state with the fetched data
            localStorage.setItem(`customerData_${GUID}`, JSON.stringify(data)); // Store data in local storage
          } catch (error) {
            console.error("Error fetching customer data:", error);
          }
        };

        fetchCustomerData();
      }
    }
  }, [getCustomerInfo]);

  return (
    <CustomerInfoContainer>
      <Label>Name:</Label>
      <InfoText>{customerData.name}</InfoText>

      <Label>Email:</Label>
      <InfoText>{customerData.email}</InfoText>

      <Label>Problem:</Label>
      <InfoText>{customerData.problem}</InfoText>
    </CustomerInfoContainer>
  );
};
