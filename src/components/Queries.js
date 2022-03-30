import React, { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap";
import axios from "axios";
import TableComponent from "./Table";
import { Dropdown, Button, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";

function Queries(props) {
  const endpoint = "http://localhost:4000/";
  const api = axios.create({ baseURL: endpoint });

  const requestData = async (table) => {
    const response = await api.get("/select/" + table);
    //console.log(response.data);
    return response.data;
  };

  /**
   * SQL PORTION
   *
   *
   *
   *
   *
   */
  const queryCandidatesWithExp = (exp) => {
    return `SELECT * FROM Candidates WHERE foster_experience=\"${exp}\";\n`;
  };

  const queryCandidates = async (exp) => {
    const res = await api.post("/query", {
      query: queryCandidatesWithExp(exp),
    });
    setQueryData(res.data);
    console.log(queryData);
    setSelectedQuery("candidates");
  };

  const queryMaxIncome = async () => {
    const res = await api.post("/query", {
      query: "SELECT MAX(INCOME) FROM Candidates;",
    });
    setMaxIncome(res.data[0]["MAX(INCOME)"]);
    console.log(res.data[0]["MAX(INCOME)"]);
    setSelectedQuery("max income");
  };

  const queryMaxForEachFamilyType = async () => {
    const res = await api.post("/query", {
      query:
        "SELECT family_type, MAX(INCOME) as MaxIncome FROM Candidates GROUP BY family_type;",
    });
    setQueryData(res.data);
    console.log(res.data);
    setSelectedQuery("candidates");
  };
  /**
   *
   *
   *
   * END OF SQL PORTION
   */

  const [queryData, setQueryData] = useState([]);
  const [maxIncome, setMaxIncome] = useState(0);
  const [selectedQuery, setSelectedQuery] = useState("");

  const numberDataComponent = () => (
    <Card border="secondary" style={{ width: "10rem" }}>
      <Card.Header>Max Income</Card.Header>
      <Card.Body>{maxIncome} $ per year</Card.Body>
    </Card>
  );

  const componentToDisplay = () => {
    if (selectedQuery === "max income") {
      return numberDataComponent();
    } else if (selectedQuery === "candidates") {
      return candidateTable;
    }
  };

  // const candidateTable = <TableComponent content={queryData}></TableComponent>;
  const candidateTable = (
    <TableComponent content={queryData} deleteRow={() => {}}></TableComponent>
  );

  const dropDown = (text1, text2, options, actions) => (
    <Dropdown style={{ margin: "10px" }}>
      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
        {text1} <br /> {text2}
      </Dropdown.Toggle>
      <Dropdown.Menu variant="dark">
        {options.forEach((option, i) => (
          <Dropdown.Item key={i} onClick={actions[i]}>
            {options}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );

  //useEffect hook to render all the data on refresh
  useEffect(() => {}, [selectedQuery]);

  return (
    <div>
      <Container className="d-flex align-items-center justify-content-center customHeight">
        <Dropdown style={{ margin: "10px" }}>
          <Dropdown.Toggle
            id="dropdown-button-dark-example1"
            variant="secondary"
          >
            Show all candidates <br /> with experience
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            <Dropdown.Item
              onClick={async () => {
                await queryCandidates("none");
              }}
            >
              None
            </Dropdown.Item>
            <Dropdown.Item
              onClick={async () => {
                await queryCandidates("one");
              }}
            >
              One child
            </Dropdown.Item>
            <Dropdown.Item
              onClick={async () => {
                await queryCandidates("many");
              }}
            >
              Many children
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown style={{ margin: "10px" }}>
          <Dropdown.Toggle
            id="dropdown-button-dark-example1"
            variant="secondary"
          >
            Select <br />
            column
          </Dropdown.Toggle>

          <Dropdown.Menu variant="dark">
            <Dropdown.Item>ID</Dropdown.Item>
            <Dropdown.Item>Income</Dropdown.Item>
            <Dropdown.Item>Experience</Dropdown.Item>
            <Dropdown.Item>Emails</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown style={{ margin: "10px" }}>
          <Dropdown.Toggle
            id="dropdown-button-dark-example1"
            variant="secondary"
          >
            Find Names of
            <br /> all Children in
          </Dropdown.Toggle>

          <Dropdown.Menu variant="dark">
            <Dropdown.Item>Child Care</Dropdown.Item>
            <Dropdown.Item>Foster Home</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button
          variant="secondary"
          onClick={async () => {
            await queryMaxIncome();
          }}
          style={{ margin: "10px" }}
        >
          Find max <br />
          Income
        </Button>

        <Button
          variant="secondary"
          style={{ margin: "10px" }}
          onClick={async () => {
            await queryMaxForEachFamilyType();
          }}
        >
          Find max income <br />
          for each family type
        </Button>
      </Container>
      <Container className="d-flex align-items-center justify-content-center ">
        {" "}
        <Row>
          <Col>{componentToDisplay()}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default Queries;
