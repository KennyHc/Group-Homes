import React, { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap";
import axios from "axios";

function Tables(props) {
  const endpoint = "http://localhost:4000/";
  const api = axios.create({ baseURL: endpoint });

  const requestData = async (table) => {
    const response = await api.get("/select/" + table);
    //console.log(response.data);
    return response.data;
  };

  const [candidateData, setCandidateData] = useState([]);
  const [columns, setColumns] = useState([]);

  //useEffect hook to render all the data on refresh
  useEffect(async () => {
    let candidateTable = await requestData("Candidates");
    setCandidateData(candidateTable);
    setColumns(Object.keys(candidateTable[0]));
    console.log(candidateTable, "useEffect");
  }, []);

  return (
    <div>
      <Card border="secondary" style={{ margin: "70px" }}>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                {columns.map((key, i) => (
                  <th key={i}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {candidateData.map((row, i) => (
                <tr key={i}>
                  {columns.map((column, j) => (
                    <td key={j}>{row[column]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Tables;
