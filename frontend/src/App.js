import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Authentication from "./pages/Authentication";
import ChatPage from "./pages/ChatPage";
import "./App.css";

function App() {
  return (
    <Container fluid id="image" className="vh-100 position-absolute">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication/>} exact/>
        <Route path="/chat" element={<ChatPage/>} />
      </Routes>
    </BrowserRouter>
    </Container>
  )
}

export default App;
