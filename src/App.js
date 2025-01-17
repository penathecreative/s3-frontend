// src/App.js
import React from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <div className="App">
      <h1>S3 File Upload</h1>
      <FileUpload />
    </div>
  );
}

export default App;
