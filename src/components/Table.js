import React, { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap";

function TableComponent({ content }) {
  //useEffect hook to render all the data on refresh

  const columns = Object.keys(content[0]);

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
              {content.map((row, i) => (
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

export default TableComponent;
