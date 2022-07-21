"use strict";

// DOCUMENT ELEMENTS
////////////////////

const DIGITS = document.querySelectorAll(".digit");
const OPERATORS = document.querySelectorAll(".operator");
const CLEAR = document.getElementById("AC");
const DEL = document.getElementById("del");
const PERC = document.getElementById("perc");
const SQUARE_ROOT = document.getElementById("sqrt");
const SQUARED = document.getElementById("sqrd");
const PI_BTN = document.getElementById("pi");
const DOT = document.getElementById("dec");
const DISPLAY_MAIN = document.querySelector(".display-bottom");
const DISPLAY_TOP = document.querySelector(".display-top");

const PI = 3.14159265359;

// VARIABLES
////////////

let currOperator = "";
let previousNumber = 0;
let currentNumber = 0;

// TEXT CONTENT CHANGERS
////////////////////////

const setPreviousNumText = (previousNumber) => {
  DISPLAY_TOP.textContent = previousNumber;
};

const setCurrentNumText = (number) => {
  DISPLAY_MAIN.textContent = number;
};

const clearAll = () => {
  currOperator = "";
  previousNumber = "";
  currentNumber = 0;
  setCurrentNumText(currentNumber);
};

clearAll();

// EVENT LISTENERS
//////////////////

DIGITS.forEach((button) =>
  button.addEventListener("click", function (e) {
    if (currentNumber === 0) {
      DISPLAY_MAIN.textContent = "";
    }
    currentNumber = this.textContent.trim();
    DISPLAY_MAIN.textContent += currentNumber;
  })
);

OPERATORS.forEach((button) =>
  button.addEventListener("click", function (e) {
    if (this.classList.contains("btn__plus")) {
      currOperator = "plus";
    } else if (this.classList.contains("btn__min")) {
      currOperator = "minus";
    } else if (this.classList.contains("btn__mult")) {
      currOperator = "multiply";
    } else if (this.classList.containts("btn__div")) {
      currOperator = "divide";
    } else {
      // TODO equals - execute math.
    }
  })
);

// TODO Event listener : pi

PI_BTN.addEventListener("click", () => setCurrentNumText(PI));

// TODO Event listner : Squared

SQUARED.addEventListener("click", () => {
  setCurrentNumText(DISPLAY_MAIN.textContent ** 2);
});

// TODO Event listner : Square route

SQUARE_ROOT.addEventListener("click", () => {
  setCurrentNumText(Math.sqrt(DISPLAY_MAIN.textContent));
});

// TODO Event listener : backspace

DEL.addEventListener("click", () => {
  let num = DISPLAY_MAIN.textContent.split("");
  num.pop();
  if (!num.length) {
    num.push(0);
  }
  setCurrentNumText(num.join(""));
});

// TODO Event listener : AC && Clear function

CLEAR.addEventListener("click", () => clearAll());
