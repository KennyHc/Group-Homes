import React from "react";
//import PropTypes from "prop-types";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {
  PersonPlusFill,
  PersonPlus,
  Table,
  Search,
} from "react-bootstrap-icons";

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="/home.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Missing"
          />{" "}
          &nbsp; Group Homes
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/can">
            Register a candidate &nbsp; <PersonPlusFill />
          </Nav.Link>
          <Nav.Link href="/child">
            Register a child &nbsp; <PersonPlus />
          </Nav.Link>
          <Nav.Link href="/tables">
            Tables &nbsp; <Table />
          </Nav.Link>
          <Nav.Link href="/queries">
            Queries &nbsp; <Search />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
