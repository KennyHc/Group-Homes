import React from "react";
import { Card, Container } from "react-bootstrap";

function AddPage({ message }) {
  return (
    <Container className="d-flex justify-content-center">
      <Card border="secondary" style={{ width: "35rem", margin: "100px" }}>
        <Card.Header>System feedback</Card.Header>

        <Card.Body>{message}</Card.Body>
      </Card>
    </Container>
  );
}

export default AddPage;
