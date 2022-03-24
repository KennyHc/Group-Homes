import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Button from "@mui/material/Button";
import { CardContent } from "@mui/material";

function Contact(props) {
  return (
    <Container className="justify-content-md-center">
      <Col className="spaced">
        <Row className="justify-content-md-center">
          <div className="justify-content-md-center">
            <Card variant="outlined">AAAA</Card>
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
          </div>
        </Row>
      </Col>
    </Container>
  );
}

export default Contact;
