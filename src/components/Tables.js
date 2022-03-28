import React, { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap";
import axios from "axios";
import TableComponent from "./Table";

function Tables(props) {
  const endpoint = "http://localhost:4000/";
  const api = axios.create({ baseURL: endpoint });

  const requestData = async (table) => {
    const response = await api.get("/select/" + table);
    //console.log(response.data);
    return response.data;
  };

  const [candidateData, setCandidateData] = useState([]);
  const [childData, setChildData] = useState([]);

  //useEffect hook to render all the data on refresh
  useEffect(() => {
    const getCandidateData = async () => {
      const candidateTable = await requestData("Candidates");
      setCandidateData(candidateTable);
      console.log(candidateTable, "useEffect");
      return candidateTable;
    };

    const getChildData = async () => {
      let childTable = await requestData("Child_info_and_relations");
      setChildData(childTable);
      console.log(childTable, "useEffect");
      return childTable;
    };

    getChildData().catch(console.error);
    getCandidateData().catch(console.error);
  }, []);

  return (
    <div>
      {candidateData.length * childData.length > 0 && (
        <div>
          <TableComponent content={candidateData} />
          <TableComponent content={childData} />
        </div>
      )}
    </div>
  );
}

export default Tables;
