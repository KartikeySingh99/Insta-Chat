import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import socketIO from "socket.io-client";
import Login from "./Components/Login";
import Chat from "./Components/Chat";
import "./App.css";
function App() {
  return (
    <><BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
