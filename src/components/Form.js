import React, { useEffect } from "react";
import { useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import axios from "axios";

function FormComponent() {
  const [id, setId] = useState("");
  const [income, setIncome] = useState();
  const [exp, setExp] = useState();
  const [famType, setFamType] = useState();
  const [email, setEmail] = useState();

  const endpoint = "http://localhost:4000/";

  const api = axios.create({ baseURL: endpoint });

  const logInfo = () => {
    console.log("id: ", id);
    console.log("income: ", income);
    console.log("family type ", famType);
    console.log("email: ", email);
    console.log("experience: ", exp);
  };

  const database = async () => {
    const response = await api.get("/use/ForsterCareSystem");
    console.log(response.data);
    return response.data;
  };

  const showTable = async (name) => {
    const response = await api.get("/select/" + name);
    console.log(response.data);
    return response.data;
  };

  const addCandidate = async () => {
    const connect = await database();
    const response = await api.post("/addCandidate", {
      id: id,
      income: income,
      email: email,
      exp: exp,
      famType: famType,
    });
    console.log(connect.data);
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {}, []);

  return (
    <Card border="secondary" style={{ width: "25rem", margin: "70px" }}>
      <Card.Header>Register Candidate</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Government Issued ID</Form.Label>
            <Form.Control
              placeholder="Enter email"
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Family type</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={famType}
              onChange={(e) => {
                setFamType(e.target.value);
              }}
            >
              <option>Select family type</option>
              <option value="single">Single parent</option>
              <option value="common_law">Common law</option>
              <option value="divorced">Divorced</option>
              <option value="other">Other</option>
            </Form.Select>
            <Form.Text className="text-muted">
              We'll never share your personal information with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button
            variant="primary"
            onClick={async () => {
              await addCandidate();
            }}
          >
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default FormComponent;
