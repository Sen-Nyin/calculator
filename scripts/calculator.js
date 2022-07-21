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
let equalsCount = 0;

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

const resetEqualsTracking = () => {
  equalsLastPressed = false;
  equalsCount = 0;
};

const clearAll = () => {
  currOperator = "";
  previousNumber = "";
  currentNumber = 0;
  resetEqualsTracking();
  clearCurrent();
  clearPrevious();
};

clearAll();

// EVENT LISTENERS
//////////////////

DIGITS.forEach((button) =>
  button.addEventListener("click", function (e) {
    // stop future number inputs appending to the result of the last equals
    if (equalsLastPressed) {
      setCurrentNumberText("");
      resetEqualsTracking();
      currOperator = "";
      clearPrevious();
    }
    // Stop inputs appending to 0
    if (currentNumber == 0) {
      currentNumber = this.textContent.trim();
    } else {
      currentNumber += this.textContent.trim();
    }
    setCurrentNumberText(currentNumber);
  })
);

// Handle dot inputs
DOT.addEventListener("click", () => {
  if (!DISPLAY_MAIN.textContent.includes(".")) {
    DISPLAY_MAIN.textContent += ".";
  }
});

OPERATORS.forEach((button) =>
  button.addEventListener("click", function (e) {
    if (equalsLastPressed) {
      resetEqualsTracking();
    }
    // chain calculations
    if (previousNumber > 0) {
      previousNumber = operate(previousNumber, currOperator, currentNumber);
      setPreviousNumberText(previousNumber);
      currOperator = this.id;
      clearCurrent();
    }
    // fresh calculations
    else {
      currOperator = this.id;
      previousNumber = currentNumber;
      setPreviousNumberText(previousNumber);
      clearCurrent();
    }
  })
);

EQUALS.addEventListener("click", () => {
  if (equalsLastPressed) {
    equalsCount++;
    if (equalsCount === 1) {
      currentNumber = previousNumber;
    }
    // setCurrentNumberText(operate(previousNumber, currOperator, currentNumber));
    // currentNumber = getCurrentNum();

    currentNumber = operate(previousNumber, currOperator, currentNumber);
    setCurrentNumberText(currentNumber);
  } else {
    currentNumber = operate(previousNumber, currOperator, currentNumber);
    setCurrentNumberText(currentNumber);
    // BUG
    previousNumber = "";
    setPreviousNumberText(previousNumber);

    // setCurrentNumberText(operate(previousNumber, currOperator, currentNumber));
    console.log(previousNumber, currentNumber);
    // boolean helps identif if number input immediately follows an equals action
    // needed to prevent further input appending the result
    equalsLastPressed = true;
  }
});

PI_BTN.addEventListener("click", () => {
  setCurrentNumberText(PI);
  currentNumber = PI;
});

SQUARED.addEventListener("click", () => {
  currentNumber = DISPLAY_MAIN.textContent ** 2;
  setCurrentNumberText(currentNumber);
});

SQUARE_ROOT.addEventListener("click", () => {
  currentNumber = Math.sqrt(DISPLAY_MAIN.textContent);
  setCurrentNumberText(currentNumber);
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

// TODO make this cleaner
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
    if (Number(num2) === 0) {
      answer = `LOL DUH!`;
    } else {
      answer = Number(num1) / Number(num2);
    }
  }

  if (answer.toString().length > 14) {
    return answer.toString().substring(0, 14);
  } else {
    return answer;
  }
}
