import { memo } from "react";
import "./input.scss";

function Input(props) {
  const { inputType = "default", value, ...rest } = props;

  console.log("Input rendering...");

  const getInputClassName = (type) => {
    let value = "";
    switch (type) {
      case "correct":
        value = "input-correct";
        break;
      case "wrong":
        value = "input-wrong";
        break;
      default:
        value = "input-default";
        break;
    }
    return value;
  };

  return (
    <input
      className={getInputClassName(inputType)}
      placeholder="Type your answer here..."
      {...(rest || {})}
    />
  );
}

export default Input;
