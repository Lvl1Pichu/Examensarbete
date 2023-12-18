// Header.tsx
import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  background-color: #fff; // or any color you prefer
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // subtle shadow to lift the header off the page
`;

const Logo = styled.div`
  font-size: 24px;
  color: #4b0082; // darker purple color for the logo text
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px; // space between navigation items
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #4b0082; // darker purple color for the navigation links
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

const Header: React.FC = () => (
  <HeaderContainer>
    <Logo>dPay.</Logo>
    <Nav>
      <NavLink href="#">Features</NavLink>
      <NavLink href="#">Testimonials</NavLink>
      <NavLink href="#">Pricing</NavLink>
      <NavLink href="#">Contact Sales</NavLink>
    </Nav>
  </HeaderContainer>
);

export default Header;
