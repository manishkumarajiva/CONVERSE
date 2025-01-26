import { Container } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import "./App.css";

function App() {
  return (
    <Container fluid id="image" className="vh-100 position-absolute p-0">
      <Routes>
        <Route path="/" element={<Home/>} exact/>
        <Route path="/chat" element={<ChatPage/>} />
      </Routes>
    </Container>
  )
}

export default App;


//lottifiles 