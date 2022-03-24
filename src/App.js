import logo from "./logo.svg";
import "./style.css";
import Header from "./components/Header";
import Contact from "./components/Contact";
import { Container, Row, Col } from "react-bootstrap";
function App() {
  return (
    <div className="App">
      <Header className="App-header"></Header>

      <Contact />
    </div>
  );
}

export default App;
