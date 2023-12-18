import React, { useState } from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  padding: 40px 0 0 0;
  background-color: #f0f0f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 100px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #4b0082;
  font-size: 18px;
  &:hover {
    text-decoration: underline;
  }
`;

const ContactLink = styled(NavLink)`
  padding: 10px 20px;
  border: 2px solid #4b0082;
  border-radius: 8px;
  font-weight: bold;
  &:hover {
    background-color: #4b0082;
    color: white;
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  font-size: 30px;
  cursor: pointer;

  @media (max-width: 700px) {
    display: block;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 50px;
  background-color: #f0f0f7;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: none;
  flex-direction: column;
  gap: 10px;
  z-index: 100;

  &.active {
    display: flex;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <LogoLink href="#">
          <LogoImage
            src="https://cdn.dorik.com/5e373b6c43a72a001f56dbf6/images/dPay_pjbcb488.svg"
            alt="dPay Logo"
          />
        </LogoLink>
        <Nav>
          <NavLink href="#">Features</NavLink>
          <NavLink href="#">Testimonials</NavLink>
          <NavLink href="#">Pricing</NavLink>
          <ContactLink href="#">Contact Sales</ContactLink>
        </Nav>
        <HamburgerIcon onClick={() => setMenuOpen(!isMenuOpen)}>
          &#9776;
        </HamburgerIcon>
        <Dropdown className={isMenuOpen ? "active" : ""}>
          <NavLink href="#" onClick={() => setMenuOpen(false)}>
            Features
          </NavLink>
          <NavLink href="#" onClick={() => setMenuOpen(false)}>
            Testimonials
          </NavLink>
          <NavLink href="#" onClick={() => setMenuOpen(false)}>
            Pricing
          </NavLink>
          <ContactLink href="#" onClick={() => setMenuOpen(false)}>
            Contact Sales
          </ContactLink>
        </Dropdown>
      </HeaderInnerContainer>
    </HeaderContainer>
  );
};

export default Header;
