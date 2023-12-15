import React from "react";
import Button from "../../components/buttons/button";
import { useNavigate } from "react-router-dom";
import { instruction } from "../../constants/instructions";
import "./instructions.scss";

function Instructions() {
  const navigate = useNavigate();
  return (
    <div className="instruction-layout">
      <div className="instruction-card">
        <h1>Instructions</h1>
        <div>
          <ul>
            {instruction.map((text, i) => (
              <li key={i} className="instructions">
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div className="button-container">
          <Button
            onClick={() => navigate("/quiz")}
            label={"Start Quiz"}
            className={"outlined-button"}
          />
        </div>
      </div>
    </div>
  );
}

export default Instructions;
