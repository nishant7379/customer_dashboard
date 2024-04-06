import React from "react";
import "./App.css";
import { Sidebar, Dashboard } from "./components";

const App = () => {
  return (
    <div className="App">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default App;
