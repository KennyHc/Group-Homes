import React, { useEffect } from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";
import AddPage from "./AddPage";

function FormComponent() {
  const [id, setId] = useState();
  const [income, setIncome] = useState();
  const [exp, setExp] = useState();
  const [famType, setFamType] = useState();
  const [email, setEmail] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const endpoint = "http://localhost:4000/";

  const api = axios.create({ baseURL: endpoint });

  const addCandidate = async () => {
    //const connect = await database();
    const response = await api.post("/addCandidate", {
      id: id,
      income: income,
      email: email,
      exp: exp,
      famType: famType,
    });
    console.log(response.data);
    if (response.status === 200) setSubmitted(true);
    return response.data;
  };

  const familyTypes = ["single", "common_law", "divorced", "married", "other"];
  const familyLabels = ["Single", "Common Law", "Divorced", "Married", "Other"];

  const validate = () => {
    setValid(id && email);
  };

  useEffect(() => {
    validate();
  }, [submitted, id, email]);

  if (submitted)
    return (
      <AddPage message={`Successfully added candidate #${id} ${email} !`} />
    );

  return (
    <Container className="d-flex justify-content-center">
      <Card
        border="secondary"
        className="align-content-center "
        style={{ width: "35rem", margin: "70px" }}
      >
        <Card.Header>Register Candidate</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Government Issued ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter ID"
                onChange={(e) => {
                  setId(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Income</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  aria-label="Amount (to the nearest dollar)"
                  onChange={(e) => {
                    setIncome(e.target.value);
                  }}
                />
                <InputGroup.Text>annual</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Row>
              <Col>
                {" "}
                <Form.Group className="mb-3">
                  <Form.Label>Foster Experience</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={exp}
                    onChange={(e) => {
                      setExp(e.target.value);
                    }}
                  >
                    <option>Select foster experience</option>
                    <option value="one">One child</option>
                    <option value="many">Many children</option>
                    <option value="none">None</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group className="mb-3">
                  <Form.Label>Family type</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={famType}
                    onChange={(e) => {
                      setFamType(e.target.value);
                    }}
                  >
                    <option>Select family type</option>
                    {familyTypes.map((e, i) => (
                      <option value={e} key={i}>
                        {familyLabels[i]}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Button
                  variant={valid ? "info" : "secondary"}
                  disabled={!valid}
                  className="float-end"
                  onClick={async () => {
                    await addCandidate();
                  }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default FormComponent;
