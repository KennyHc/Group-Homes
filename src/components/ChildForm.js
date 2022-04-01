import React, { useEffect } from "react";
import { useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import axios from "axios";

function ChildFormComponent() {
  const [id, setId] = useState("");
  const [name, setName] = useState();
  const [ethnicity, setEthnicity] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState();
  const [gha, setGha] = useState(); //groupHomeAddress
  const [startDate, setStartDate] = useState();

  const ethnicities = [
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Native Hawaiian or Other Pacific Islander",
    "Hispanic or Latino",
    "White",
  ];

  const genders = [
    "Woman",
    "Man",
    "Non-binary",
    "Transgender Woman",
    "Transgender Man",
    "Two-spirit",
    "Other",
  ];

  const addresses = [
    "2366 Main Mall, Vancouver",
    "6200 University Blvd, Vancouver",
  ];

  const endpoint = "http://localhost:4000/";

  const api = axios.create({ baseURL: endpoint });

  const addChild = async () => {
    const response = await api.post("/addChild", {
      id: id,
      name: name,
      ethnicity: ethnicity,
      birthday: birthday,
      gender: gender,
      gha: gha,
      startDate: startDate,
    });
    //console.log(connect.data);
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {}, []);

  return (
    <Container className="d-flex justify-content-center">
      <Card border="secondary" style={{ width: "45rem", margin: "70px" }}>
        <Card.Header>Register Foster Child</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Government Issued ID</Form.Label>
                  <Form.Control
                    placeholder="Enter Id"
                    onChange={(e) => {
                      setId(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Enter Id"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Date of birth</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter group home address"
                    onChange={(e) => {
                      setBirthday(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ethnicity</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={ethnicity}
                    onChange={(e) => {
                      setEthnicity(e.target.value);
                    }}
                  >
                    <option>Select ethnicity</option>
                    {ethnicities.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option>Select gender</option>
                    {genders.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Group Home Address</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={gha}
                    onChange={(e) => {
                      setGha(e.target.value);
                    }}
                  >
                    <option>Select group home address</option>
                    {addresses.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter start date"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button
              variant="primary"
              onClick={async () => {
                await addChild();
              }}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ChildFormComponent;
