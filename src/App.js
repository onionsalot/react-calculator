import React, { useState } from "react";
import "./App.css";
import Display from "./Display.jsx";
import Digit from "./Digit.jsx";
import Operation from "./Operation.jsx";
import Decimal from "./Decimal.jsx";
import MiniDisplay from "./MiniDisplay.jsx";

let equals = false;
const numCache = [];
export default function App() {
  const [showMiniNum, setMiniNum] = useState([]);
  const [showNum, setShowNum] = useState([]);

  function displayNum(number) {
    if (equals) {
      setShowNum([number]);
      equals = false;
    } else {
      setShowNum([...showNum, number]);
    }
  }

  function reset() {
    setShowNum([]);
    setMiniNum([]);
    numCache.splice(0, numCache.length);
    return console.log("C Pressed. SUCCESS");
  }

  function handleMiniNum(arr) {
    setMiniNum([arr.join("")]);
  }

  function handleDecimal(decimal) {
    if (showNum.some((e) => e === ".")) {
      console.log("HAS DECIMAL");
    } else {
      setShowNum([...showNum, decimal]);
    }
  }

  function handleOperation(operation) {
    // Calls reset if C is pressed
    if (operation === "C") {
      return reset();
    }
    // Check if has values to calculate
    if (operation === "=" && numCache.length < 2) {
      return;
    }

    if (operation === "+/-") {
      if (showNum[0] > 0) {
        setShowNum(["-", ...showNum]);
      } else {
        const cloneShow = showNum;
        cloneShow.shift();
        setShowNum([...cloneShow]);
      }
      return;
    }

    console.log("New operation click", operation);
    if (showNum.length > 0) {
      numCache.push(showNum.join(""), operation);
      console.log(numCache);
      setShowNum([]);
      handleMiniNum(numCache);
      if (operation === "=" && numCache.length > 2) {
        console.log("Calculating..........");
        // ========== START OF CALCULATIONS =============== //
        // ==== ORDERS OF OPERATION TAKEN INTO ACCOUNT ==== //

        // == MULTIPLICATION ==
        processOperations("x");
        // == DIVISION ==
        processOperations("÷");
        // == ADDITION ==
        processOperations("+");
        // == SUBTRACTION ==
        processOperations("-");
        console.log(`numCache => ${numCache}`);
        numCache.splice(0, numCache.length);
        equals = true;
      }
    } else {
      console.log("Do nothing");
    }
  }

  function processOperations(operation) {
    let afterOperation = numCache;
    console.log(`---------------`);
    console.log(`Current num Array = ${afterOperation}`);
    console.log(`APPLYING OPERATION = ${operation}`);
    console.log(`---------------`);
    let operationCount = numCache.filter((x) => x === operation).length;
    if (operationCount > 0) {
      for (let i = 0; i < operationCount; i++) {
        let index = numCache.findIndex((x) => x === operation);
        let result = calculate(
          numCache[index - 1],
          numCache[index],
          numCache[index + 1]
        );
        afterOperation.splice(index - 1, 3, result);
      }
    }
    setShowNum([afterOperation[0]]);
    console.log(`After applying ${operation} = ${afterOperation}`);
  }

  function calculate(num1, operation, num2) {
    if (operation === "x") {
      return parseFloat(num1) * parseFloat(num2);
    } else if (operation === "÷") {
      return parseFloat(num1) / parseFloat(num2);
    } else if (operation === "+") {
      return parseFloat(num1) + parseFloat(num2);
    } else if (operation === "-") {
      return parseFloat(num1) - parseFloat(num2);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="top">
          <div className="mini-display">
            <div className="col">
              <MiniDisplay showMiniNum={showMiniNum} />
            </div>
          </div>
          <div className="display">
            <div className="col">
              <Display showNum={showNum} />
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="row">
            <div className="col">
              <Operation op={"C"} handleOperation={handleOperation} />
            </div>
            <div className="col">
              <Operation op={"+/-"} handleOperation={handleOperation} />
            </div>
            <div className="col">
              <Digit num={"%"} displayNum={displayNum} />
            </div>
            <div className="col">
              <Operation op={"÷"} handleOperation={handleOperation} />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Digit num={7} displayNum={displayNum} />
            </div>
            <div className="col">
              <Digit num={8} displayNum={displayNum} />
            </div>
            <div className="col">
              <Digit num={9} displayNum={displayNum} />
            </div>
            <div className="col">
              <Operation op={"x"} handleOperation={handleOperation} />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Digit num={4} displayNum={displayNum} />
            </div>
            <div className="col">
              <Digit num={5} displayNum={displayNum} />
            </div>
            <div className="col">
              <Digit num={6} displayNum={displayNum} />
            </div>
            <div className="col">
              <Operation op={"-"} handleOperation={handleOperation} />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Digit num={1} displayNum={displayNum} />
            </div>
            <div className="col">
              <Digit num={2} displayNum={displayNum} />
            </div>
            <div className="col">
              <Digit num={3} displayNum={displayNum} />
            </div>
            <div className="col">
              <Operation op={"+"} handleOperation={handleOperation} />
            </div>
          </div>

          <div className="footer">
            <div className="col">
              <Digit num={0} displayNum={displayNum} />
            </div>
            <div className="col">
              <Decimal handleDecimal={handleDecimal} />
            </div>
            <div className="col">
              <Operation op={"="} handleOperation={handleOperation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
