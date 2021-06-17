import React, { useState } from "react";
import { Container, NavDropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../constants";

const Header = (props) => {
  // const logout = () => {
  //   localStorage.removeItem("loginData");
  //   window.location.href = PUBLIC_URL + "login";
  // }; 

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Link to={`${PUBLIC_URL}`}>
          <Navbar.Brand>LR LOGO</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to={`${PUBLIC_URL}`}>
              <Nav.Item className="text-white mr-2 ">Home</Nav.Item>
            </Link>            
            <Link to={`${PUBLIC_URL}customers`}>
                <Nav.Item className="text-white mr-2 ">Customers</Nav.Item>
              </Link>
            <Link to={`${PUBLIC_URL}about`}>
              <Nav.Item className="text-white mr-2 ">About</Nav.Item>
            </Link>
            <Link to={`${PUBLIC_URL}contact`}>
              <Nav.Item className="text-white mr-2 ">Contact</Nav.Item>
            </Link>        
          </Nav>          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
