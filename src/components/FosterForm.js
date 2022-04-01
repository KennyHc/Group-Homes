import React, { useEffect } from "react";
import { useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";

function FosterFormComponent() {
  const [childId, setChildId] = useState();
  const [candidateId, setCandidateId] = useState();
  const [date, setDate] = useState();
  const [childIds, setChildIds] = useState([]);
  const [candidateIds, setCandidateIds] = useState([]);

  const endpoint = "http://localhost:4000/";

  const api = axios.create({ baseURL: endpoint });

  const addRelation = async () => {
    //const connect = await database();
    const response = await api.post("/addRelation", {
      childId: childId,
      candidateId: candidateId,
      date: date,
    });
    //console.log(connect.data);
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    const getCandidateIds = async () => {
      const ids = await api.post("/query", {
        query: "SELECT id FROM Candidates;",
      });
      setCandidateIds(ids.data.map((obj) => obj.id));
      return ids;
    };

    const getChildIds = async () => {
      const ids = await api.post("/query", {
        query: "SELECT child_ID FROM Child_info_and_relations;",
      });
      setChildIds(ids.data.map((obj) => obj.child_ID));

      return ids;
    };

    getChildIds().catch((e) => e.message);
    getCandidateIds().catch((e) => e.message);
  }, []);

  return (
    <Container className="d-flex justify-content-center">
      <Card
        border="secondary"
        className="align-content-center "
        style={{ width: "35rem", margin: "70px" }}
      >
        <Card.Header>Add adoption relation</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Select Child ID</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={childId}
                    onChange={(e) => {
                      setChildId(e.target.value);
                    }}
                  >
                    <option>Select ID</option>
                    {childIds.map((id) => (
                      <option key={id} value={id}>
                        {id}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Select Candidate ID</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={candidateId}
                    onChange={(e) => {
                      setCandidateId(e.target.value);
                    }}
                  >
                    <option>Select ID</option>
                    {candidateIds.map((id) => (
                      <option key={id} value={id}>
                        {id}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Date of adoption</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter date"
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="info"
                  className="float-end"
                  onClick={async () => {
                    await addRelation();
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

export default FosterFormComponent;
