import { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [currentValue, setCurrentValue] = useState("0");
  const [pedingOperation, setPedingOperation] = useState(null);
  const [pedingValue, setPedingValue] = useState(null);
  const [completeOperation, setCompleteOperation] = useState(null);

  const keypadNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operations = ["+", "-", "*", "/"];

  const handleClick = (value) => {
    setCurrentValue((previousValue) => {
      if (previousValue != "0") {
        return previousValue + value;
      } else {
        return value;
      }
    });
    setCompleteOperation((previosOperation) => {
      if (previosOperation) {
        return previosOperation + value;
      } else {
        return value;
      }
    });
  };

  const handleClear = () => {
    setCurrentValue(0);
    setPedingOperation(null);
    setPedingValue(null);
    setCompleteOperation(null);
  };

  return (
    <div className="calculator">
      <div className="complete-operation">{completeOperation}</div>
      <div className="display">{currentValue}</div>
      <div className="buttons">
        <button onClick={handleClear}>AC</button>
        {keypadNumbers.map((number) => (
          <button key={number} onClick={() => handleClick(number)}>
            {number}
          </button>
        ))}
        {operations.map((operation) => (
          <button key={operation}>{operation}</button>
        ))}
        <button>=</button>
      </div>
    </div>
  );
}

export default Calculator;
