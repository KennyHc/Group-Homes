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

  const [queryData, setQueryData] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState("");

  //useEffect hook to render all the data on refresh
  useEffect(() => {}, []);

  return <div></div>;
}

export default Tables;
