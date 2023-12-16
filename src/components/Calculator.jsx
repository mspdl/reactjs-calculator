import { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [currentValue, setCurrentValue] = useState("0");
  const [pendingOperation, setPendingOperation] = useState(null);
  const [pendingValue, setPendingValue] = useState(null);
  const [completeOperation, setCompleteOperation] = useState(null);

  const keypadNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
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

  const handleOperation = (operation) => {
    setCompleteOperation(currentValue + " " + operation + " ");
    setPendingOperation(operation);
    setPendingValue(currentValue);
    setCurrentValue("0");
  };

  const handleClear = () => {
    setCurrentValue(0);
    setPendingOperation(null);
    setPendingValue(null);
    setCompleteOperation(null);
  };

  const handleCalculate = () => {
    if (!pendingOperation || !pendingValue) {
      return;
    }

    const firstNumber = parseFloat(pendingValue);
    const secondNumber = parseFloat(currentValue);

    let result;

    switch (pendingOperation) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      case "/":
        if (secondNumber !== 0) {
          result = firstNumber / secondNumber;
        } else {
          setCurrentValue("Error");
          setCompleteOperation("Error");
          setPendingOperation(null);
          setPendingValue(null);
          return;
        }
        break;

      default:
        break;
    }

    setCompleteOperation(
      pendingValue +
        " " +
        pendingOperation +
        " " +
        currentValue +
        " = " +
        result
    );

    setCurrentValue(result.toString());
    setPendingOperation(null);
    setPendingValue(null);
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
          <button key={operation} onClick={() => handleOperation(operation)}>
            {operation}
          </button>
        ))}
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
