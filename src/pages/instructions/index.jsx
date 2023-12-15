import React from "react";
import { Link } from "react-router-dom";
import "./instructions.scss";
function Instructions() {
  return (
    <div className="instruction-layout">
      <div className="instruction-card">
        Instructions
        <Link to={"/quiz"}>Start Quiz</Link>
      </div>
    </div>
  );
}

export default Instructions;
