"use strict";

const numberButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.getElementById("ac");
const piButton = document.getElementById("pi");
const squareRootButton = document.getElementById("sqrt");
const squaredButton = document.getElementById("sqrd");
const percentButton = document.getElementById("perc");
const dotButton = document.getElementById("dec");
const deleteButton = document.getElementById("del");
const equalsButton = document.getElementById("equals");
const operatingScreen = document.getElementById("operation");
const stagingScreen = document.getElementById("stage");

const PI = "3.141592653589";
let firstNumber = "";
let secondNumber = "";
let operator = null;
let clear = false;

// Button Events

numberButtons.forEach((button) =>
  button.addEventListener("click", () => addDigit(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => {
    // First operation
    if (!operator) {
      operator = button.id;
      secondNumber = firstNumber;
      firstNumber = "0";
      setOperationScreenDisplay();
      setStagingDisplay("operator");
    }
    // Chain operations
    else {
      setOperationScreenDisplay(getResult());
      secondNumber = getResult();
      operator = button.id;
      firstNumber = "0";
      setStagingDisplay("operator");
      // On next digit entry, clear the main display, not append.
      clear = true;
    }
  })
);

dotButton.addEventListener("click", () => addDot(firstNumber));

deleteButton.addEventListener("click", () => deleteDigit());

clearButton.addEventListener("click", () => fullReset());

equalsButton.addEventListener("click", () => {
  // You did this as a kid, too, right? RIGHT?
  if (firstNumber === "0.7734" && !operator && !secondNumber) {
    setOperationScreenDisplay("hello");
  } else {
    setStagingDisplay("equals");
    firstNumber = getResult();
    setOperationScreenDisplay();
  }
});

piButton.addEventListener("click", () => {
  firstNumber = PI;
  setOperationScreenDisplay();
});

squareRootButton.addEventListener("click", () => {
  firstNumber = roundResult(Math.sqrt(firstNumber).toString());
  setOperationScreenDisplay();
});

squaredButton.addEventListener("click", () => {
  firstNumber = roundResult((firstNumber ** 2).toString());
  setOperationScreenDisplay();
});

percentButton.addEventListener("click", () => {
  firstNumber = (firstNumber / 100).toString();
  setOperationScreenDisplay();
});

// FUNCTION

const setOperationScreenDisplay = (display) => {
  if (!display) {
    operatingScreen.textContent = firstNumber;
  } else {
    operatingScreen.textContent = display;
  }
};

const setStagingDisplay = (caller) => {
  if (caller === "operator") {
    stagingScreen.textContent = `${secondNumber} ${operatorTextToSymbol(
      operator
    )}`;
  } else if (caller === "equals" || caller === "operator-chain") {
    stagingScreen.textContent = `${secondNumber} ${operatorTextToSymbol(
      operator
    )} ${firstNumber} =`;
  } else if (caller === "clear") {
    stagingScreen.textContent = "";
  }
};

const addDigit = (digit) => {
  if (firstNumber === "0") firstNumber = "";
  // Clear the display if chaining operations
  if (clear) {
    setOperationScreenDisplay();
    clear = false;
  }
  firstNumber += digit;
  setOperationScreenDisplay();
};

const addDot = (content) => {
  if (content === "") firstNumber = "0";
  if (!content.includes(".")) firstNumber += ".";
  setOperationScreenDisplay();
};

const deleteDigit = () => {
  firstNumber = firstNumber.length === 1 ? "0" : firstNumber.slice(0, -1);
  setOperationScreenDisplay();
};

const clearDisplay = () => {};

const fullReset = () => {
  firstNumber = "0";
  secondNumber = "";
  operator = null;
  setOperationScreenDisplay();
  setStagingDisplay("clear");
  clear = false;
};

const operatorTextToSymbol = (operator) => {
  if (operator === "divide") return "÷";
  if (operator === "multiply") return "×";
  if (operator === "minus") return "−";
  if (operator === "plus") return "+";
};

// const getResult = () => {};

const roundResult = (num) => {
  num = num.toString();
  if (num.length > 14) num = num.substring(0, 14);
  return num;
};

function getResult() {
  let answer = "";

  if (operator === "plus") {
    answer = Number(firstNumber) + Number(secondNumber);
  } else if (operator === "minus") {
    answer = firstNumber - secondNumber;
  } else if (operator === "multiply") {
    answer = firstNumber * secondNumber;
  } else if (operator === "divide") {
    answer = firstNumber === "0" ? "🤡" : secondNumber / firstNumber;
  }
  return roundResult(answer.toString());
}
