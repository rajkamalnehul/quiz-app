import React, { memo } from "react";
import "./buttons.scss";

const Button = memo(
  function Button({ label, className = "", disabled, ...rest }) {
    console.log("button rendering...");

    return (
      <button
        className={`${disabled ? "disabled-button" : className}`}
        {...(rest || {})}
      >
        {label}
      </button>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison func for memoization
    return (
      prevProps.label === nextProps.label &&
      prevProps.className === nextProps.className &&
      prevProps.disabled === nextProps.disabled
    );
  }
);

export default Button;
