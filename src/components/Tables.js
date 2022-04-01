import React, { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap";
import axios from "axios";
import TableComponent from "./Table";

function Tables(props) {
  const endpoint = "http://localhost:4000/";
  const api = axios.create({ baseURL: endpoint });

  const requestData = async (table) => {
    const response = await api.get("/select/" + table);
    return response.data;
  };

  const [candidateData, setCandidateData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [fosterData, setFosterData] = useState([]);
  const [removed, setRemoved] = useState(0);

  const deleteCandidate = async (id) => {
    if (id !== undefined) {
      const response = await api.post("/delete", {
        id: id,
        table: "candidates",
      });
      setRemoved(removed + 1);
      return response.data;
    }
  };

  const deleteChild = async (id) => {
    if (id !== undefined) {
      const response = await api.post("/delete", { id: id, table: "child" });
      setRemoved(removed + 1);
      return response.data;
    }
  };

  //useEffect hook to render all the data on refresh
  useEffect(() => {
    const getCandidateData = async () => {
      const candidateTable = await requestData("Candidates");
      setCandidateData(candidateTable);
      console.log(candidateTable, "useEffectCandidates");
      return candidateTable;
    };

    const getChildData = async () => {
      let childTable = await requestData("Child_info_and_relations");
      setChildData(childTable);
      console.log(childTable, "useEffectChild");
      return childTable;
    };

    const getFostersFromData = async () => {
      let fosterTable = await requestData("Fosters_From");
      setFosterData(fosterTable);
      console.log(fosterTable, "useEffectFosterFrom");
      return fosterTable;
    };

    getChildData().catch(console.error);
    getCandidateData().catch(console.error);
    getFostersFromData().catch(console.error);
  }, [removed]);

  return (
    <div>
      {candidateData.length > 0 && (
        <div>
          <TableComponent
            content={candidateData}
            title={"Candidate Data"}
            deleteRow={deleteCandidate}
          />
        </div>
      )}
      {childData.length > 0 && (
        <div>
          <TableComponent
            content={childData}
            title={"Children Data"}
            deleteRow={deleteChild}
          />
        </div>
      )}
      {childData.length > 0 && (
        <div>
          <TableComponent
            content={fosterData}
            title={"Foster Relation Data"}
            noDeleteCol={true}
          />
        </div>
      )}
    </div>
  );
}

export default Tables;
