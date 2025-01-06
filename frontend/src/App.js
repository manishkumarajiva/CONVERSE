import { Container } from "react-bootstrap";
import Authentication from "./pages/Authentication";
import "./App.css";

function App() {
  return (
    <Container fluid id="image" className="vh-100 position-absolute">
      <Authentication></Authentication>
    </Container>
  )
}

export default App;
