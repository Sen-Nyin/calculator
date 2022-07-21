"use strict";

// DOCUMENT ELEMENTS
////////////////////

const DIGITS = document.querySelectorAll(".digit");
const OPERATORS = document.querySelectorAll(".operator");
const CLEAR = document.getElementById("AC");
const DELETE = document.getElementById("del");
const PERCENT = document.getElementById("perc");
const SQUARE_ROOT = document.getElementById("sqrt");
const SQUARED = document.getElementById("sqrd");
const PI_BTN = document.getElementById("pi");
const DOT = document.getElementById("dec");
const DISPLAY_MAIN = document.querySelector(".display-bottom");
const DISPLAY_TOP = document.querySelector(".display-top");
const EQUALS = document.getElementById("equals");

const PI = 3.14159265359;

// VARIABLES
////////////

let currOperator = "";
let previousNumber = 0;
let currentNumber = 0;
let equalsLastPressed = false;

// TEXT CONTENT CHANGERS
////////////////////////

const setCurrentNumberText = (text) => (DISPLAY_MAIN.textContent = text);
const setPreviousNumberText = (text) => (DISPLAY_TOP.textContent = text);

const getCurrentNum = () => DISPLAY_MAIN.textContent;

const clearCurrent = () => {
  setCurrentNumberText(0);
  currentNumber = 0;
};

const clearPrevious = () => {
  setPreviousNumberText("");
  previousNumber = "";
};

const clearAll = () => {
  currOperator = "";
  previousNumber = "";
  currentNumber = 0;
  clearCurrent();
  clearPrevious();
};

clearAll();

// EVENT LISTENERS
//////////////////

DIGITS.forEach((button) =>
  button.addEventListener("click", function (e) {
    if (currentNumber == 0) {
      setCurrentNumberText("");
    }
    if (equalsLastPressed) {
      setCurrentNumberText("");
      equalsLastPressed = false;
    }
    DISPLAY_MAIN.textContent += Number(this.textContent.trim());
    currentNumber = getCurrentNum();
  })
);

OPERATORS.forEach((button) =>
  button.addEventListener("click", function (e) {
    if (equalsLastPressed) equalsLastPressed = false;
    if (previousNumber > 0) {
      previousNumber = operate(previousNumber, currOperator, currentNumber);
      setPreviousNumberText(previousNumber);
      currOperator = this.id;
      clearCurrent();
      if (equalsLastPressed) equalsLastPressed = false;
    } else {
      currOperator = this.id;
      currentNumber = getCurrentNum();
      previousNumber = currentNumber;
      setPreviousNumberText(previousNumber);
      clearCurrent();
    }
  })
);

EQUALS.addEventListener("click", () => {
  setCurrentNumberText(operate(previousNumber, currOperator, currentNumber));
  clearPrevious();
  currOperator = "";
  equalsLastPressed = true;
});

PI_BTN.addEventListener("click", () => {
  setCurrentNumberText(PI);
  currentNumber = PI;
});

SQUARED.addEventListener("click", () => {
  setCurrentNumberText(DISPLAY_MAIN.textContent ** 2);
  currentNumber = getCurrentNum();
});

SQUARE_ROOT.addEventListener("click", () => {
  setCurrentNumberText(Math.sqrt(DISPLAY_MAIN.textContent));
  currentNumber = getCurrentNum();
});

DELETE.addEventListener("click", () => {
  let num = DISPLAY_MAIN.textContent.split("");
  num.pop();
  if (!num.length) {
    num.push(0);
  }
  currentNumber = num.join("");
  setCurrentNumberText(currentNumber);
});

CLEAR.addEventListener("click", () => clearAll());

PERCENT.addEventListener("click", () => {
  currentNumber = getCurrentNum();
  setCurrentNumberText(currentNumber / 100);
  currentNumber = getCurrentNum();
});

// OPERATION
////////////

function operate(num1, operator, num2) {
  let answer = 0;
  if (operator === "plus") {
    answer = Number(num1) + Number(num2);
  } else if (operator === "minus") {
    answer = Number(num1) - Number(num2);
  } else if (operator === "multiply") {
    answer = Number(num1) * Number(num2);
  } else if (operator === "divide") {
    answer = Number(num1) / Number(num2);
  }
  return answer;
}
