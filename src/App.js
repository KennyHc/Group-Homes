// import logo from "./logo.svg";
//import "./style.css";
import "./bootstrap.css";
import Header from "./components/Header";
// import Contact from "./components/Contact";
import ChildFormComponent from "./components/ChildForm";
import Tables from "./components/Tables";
import HomePage from "./components/HomePage";
import Queries from "./components/Queries";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FormComponent from "./components/Form";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/can" element={<FormComponent />} />
          <Route path="/child" element={<ChildFormComponent />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/queries" element={<Queries />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
