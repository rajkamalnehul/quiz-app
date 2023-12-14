import { memo } from "react";
import "./option.scss";
const Option = memo(
  function Option(props) {
    const { label = "A", text, type = "default", ...rest } = props;

    console.log("option rendering...");

    const getOptionClassName = (type) => {
      let value = "";
      switch (type) {
        case "selected":
          value = "option-selected";
          break;
        case "correct":
          value = "option-correct";
          break;
        case "wrong":
          value = "option-wrong";
          break;
        default:
          value = "option-default";
          break;
      }
      return value;
    };

    return (
      <div className={getOptionClassName(type)} {...(rest || {})}>
        <span>{label}</span>
        <span>{text}</span>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison func for memoization
    return (
      prevProps.label === nextProps.label &&
      prevProps.type === nextProps.type &&
      prevProps.text === nextProps.text
    );
  }
);

export default Option;
