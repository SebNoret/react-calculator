import "./App.css";
import Keyboard from "./Keyboard";
import Screen from "./Screen";
import { useState } from "react";

const endsWithNumber = /\d$/;
const endsWithOperator = /\d*[+\/\*-]$/;
const hasOperator = /[-\+\*\/]/g;
const endsWithZero = /[-\+\*\/]+0$/;

function App() {
  const [expression, setExpression] = useState("");
  const [currentEntry, setCurrent] = useState("");
  const [previousEntry, setPreviousEntry] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const maxDigitWarning = () => {
    if (currentEntry.length >= 20) {
      setCurrent("limite de chiffres atteinte");

      setPreviousEntry(currentEntry);

      setTimeout(() => setCurrent(previousEntry), 3000);
      setExpression(currentEntry);
    }
  };

  const addNumber = (num) => {
    if (currentEntry.length < 21) {
      if (
        (expression[0] === "0" &&
          expression[1] !== "." &&
          !endsWithOperator.test(expression)) ||
        evaluated
      ) {
        setExpression(num);
        setCurrent(num);
        setPreviousEntry(num);
      } else if (endsWithZero.test(expression)) {
        let newExpression = expression.substring(0, expression[expression - 1]);

        setCurrent(expression[expression.length - 2] + num);
        setExpression(newExpression + num);
        setPreviousEntry(num);
      } else {
        setCurrent((current) => current + num);
        setExpression((expression) => expression + num);
        setPreviousEntry(num);
      }
      setEvaluated(false);
    }
  };

  const addOperator = (op) => {
    //prevent to enter operator without any number

    if (!previousEntry) {
      //negative sign with zero number
      if (op === "-") {
        setExpression(op);
        setCurrent(op);
      } else {
        setExpression("0");
        setCurrent("0");
      }
    } else if (evaluated) {
      setCurrent(op);

      setExpression(previousEntry + op);
      setPreviousEntry(op);
    } else if (endsWithNumber.test(expression)) {
      setCurrent(op);
      setExpression((expression) => expression + op);
      setPreviousEntry(op);
    } else {
      if (
        /[+*/-]/.test(expression[expression.length - 2]) &&
        expression[expression.length - 1] === "-"
      ) {
        let newExpression = expression
          .split("")
          .splice(expression[expression.length - 2], 1)
          .join("");
        setExpression(newExpression + op);
      } else if (op === "-") {
        setExpression((expression) => expression + op);
      } else {
        let newExpression = expression.substring(0, expression.length - 1);
        setExpression(newExpression + op);
        setCurrent(op);
      }
    }
    setEvaluated(false);
  };
  const addDot = (dot) => {
    if (
      hasOperator.test(expression) &&
      !/[-+\/\*]$/.test(expression) &&
      !/\.$/.test(expression)
    ) {
      let newExpression = expression.split(hasOperator);

      if (!newExpression[newExpression.length - 1].includes(".")) {
        setExpression((expression) => expression + dot);
        setCurrent(newExpression[newExpression.length - 1] + dot);
      }
    } else if (!expression.includes(".")) {
      setCurrent(expression + dot);

      setExpression((expression) => expression + dot);
    }
  };

  const calculate = () => {
    if (/\d[+\*\/-]$/.test(expression)) {
      let exprWithoutSign = expression.slice(0, expression.length - 1);
      setExpression(exprWithoutSign);
    }
    // manage error with double press on equals button
    else if (expression.includes("=")) {
      let equalSign = expression.indexOf("=");

      let expressionWithoutSign = expression.substring(
        equalSign,
        expression.length
      );

      setExpression(expressionWithoutSign);

      // different conditions to manage negative sign: negative numbers and subtraction with negative numbers
    } else {
      //can't press equal without ending with a number
      if (/\d$/.test(expression)) {
        //transform "--" sign in expression in "+" to prevent error with eval function
        if (expression.includes("--")) {
          let newExpr = expression.split("--").join("+");
          let result =
            Math.round(1000000000000 * eval(newExpr)) / 1000000000000;
          setExpression((expression) => expression + "=" + result);
          setCurrent(result);
          setPreviousEntry(result);
          setEvaluated(true);
        } else {
          let result =
            Math.round(1000000000000 * eval(expression)) / 1000000000000;
          setExpression((expression) => expression + "=" + result);
          setCurrent(result);
          setPreviousEntry(result);
          setEvaluated(true);
        }
      }
    }
  };
  const allClear = () => {
    setExpression("");
    setCurrent("");
    setPreviousEntry("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="col col-md-6 h1">Calculatrice</h1>
      </div>
      <div className="row">
        <div className="col col-md-6">
          <div className="  grid">
            <Screen currentEntry={currentEntry} expression={expression} />
            <Keyboard
              addNumber={addNumber}
              addOperande={addOperator}
              addDot={addDot}
              allClear={allClear}
              calculate={calculate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
