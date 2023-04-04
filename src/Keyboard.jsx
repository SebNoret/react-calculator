import React from "react";
const Keyboard = ({ addNumber, addOperande, addDot, calculate, allClear }) => {
  return (
    <>
      <div onClick={allClear} className="btn AC ac-color" id="clear">
        AC
      </div>
      {/* <div className="btn C ac-color"></div> */}
      <div
        onClick={() => addOperande("/")}
        className="btn div sign-color"
        id="divide"
      >
        /
      </div>
      <div
        onClick={() => addOperande("*")}
        className="btn mult sign-color"
        id="multiply"
      >
        X
      </div>
      <div
        onClick={() => addNumber("7")}
        className="btn seven num-color "
        id="seven"
      >
        7
      </div>
      <div
        onClick={() => addNumber("8")}
        className="btn eight num-color"
        id="eight"
      >
        8
      </div>
      <div
        onClick={() => addNumber("9")}
        className="btn nine num-color"
        id="nine"
      >
        9
      </div>
      <div
        onClick={() => addOperande("-")}
        className="btn subs sign-color"
        id="subtract"
      >
        -
      </div>
      <div
        onClick={() => addNumber("4")}
        className="btn four num-color"
        id="four"
      >
        4
      </div>
      <div
        onClick={() => addNumber("5")}
        className="btn five num-color"
        id="five"
      >
        5
      </div>
      <div
        onClick={() => addNumber("6")}
        className="btn six num-color"
        id="six"
      >
        6
      </div>
      <div
        onClick={() => addOperande("+")}
        className="btn add sign-color"
        id="add"
      >
        +
      </div>
      <div
        onClick={() => addNumber("1")}
        className="btn one num-color"
        id="one"
      >
        1
      </div>
      <div
        onClick={() => addNumber("2")}
        className="btn two num-color"
        id="two"
      >
        2
      </div>
      <div
        onClick={() => addNumber("3")}
        className="btn three num-color"
        id="three"
      >
        3
      </div>
      <div onClick={() => calculate()} className="btn equal" id="equals">
        =
      </div>
      <div
        onClick={() => addNumber("0")}
        className="btn zero num-color"
        id="zero"
      >
        0
      </div>
      <div
        onClick={() => addDot(".")}
        className="btn dot num-color"
        id="decimal"
      >
        .
      </div>
    </>
  );
};
export default Keyboard;
