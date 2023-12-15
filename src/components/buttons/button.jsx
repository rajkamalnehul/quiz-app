import React from "react";
import "./buttons.scss";

function Button({ label, className = "", disabled, ...rest }) {
  return (
    <button
      className={`${disabled ? "disabled-button" : className}`}
      disabled={disabled}
      {...(rest || {})}
    >
      {label}
    </button>
  );
}

export default Button;
