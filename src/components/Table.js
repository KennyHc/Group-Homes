import React, { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

function TableComponent({ content, deleteRow, title, noDeleteCol }) {
  //useEffect hook to render all the data on refresh

  if (content.length === 0) {
    return (
      <Card border="secondary" style={{ margin: "70px" }}>
        <Card.Header>{title}</Card.Header>
        <Card.Body>Empty Set</Card.Body>
      </Card>
    );
  }
  const columns = Object.keys(content[0]);
  const deleteColumn = (rowToDelete) => {
    if (noDeleteCol) {
      return;
    } else {
      return (
        <td className="justify-content-center">
          <Button className="btn-danger">
            <Trash
              onClick={async () => {
                await deleteRow(rowToDelete);
              }}
            />
          </Button>
        </td>
      );
    }
  };

  return (
    <div>
      <Card border="secondary" style={{ margin: "70px" }}>
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                {columns.map((key, i) => (
                  <th key={i}>{key}</th>
                ))}
                {!noDeleteCol && <th>Delete</th>}
              </tr>
            </thead>
            <tbody>
              {content.map((row, i) => (
                <tr key={i}>
                  {columns.map((column, j) => (
                    <td key={j}>{row[column]}</td>
                  ))}
                  {deleteColumn(row[columns[0]])}
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
