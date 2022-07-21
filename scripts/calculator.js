"use strict";

// DOCUMENT ELEMENTS
////////////////////

const DIGITS = document.querySelectorAll(".digit");
const OPERATORS = document.querySelectorAll(".operator");
const CLEAR = document.getElementById("AC");
const DEL = document.getElementById("Del");
const PERC = document.getElementById("perc");
const SQUARE_ROOT = document.getElementById("sqrt");
const SQUARED = document.getElementById("sqrd");
const PI_BTN = document.getElementById("pi");
const DOT = document.getElementById("dec");
const DISPLAY_MAIN = document.querySelector(".display-bottom");
const DISPLAY_TOP = document.querySelector(".display-top");

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

// EVENT LISTENERS
//////////////////

DIGITS.forEach((button) =>
  button.addEventListener("click", function (e) {
    let buttonContent = this.textContent;
    console.log(buttonContent);
    DISPLAY_MAIN.textContent += buttonContent;
  })
);

OPERATORS.forEach((button) =>
  button.addEventListener("click", function (e) {
    if (button.classList.contains("btn__plus")) {
      currOperator = "plus";
    } else if (this.classList.contains("btn__min")) {
      currOperator = "minus";
    } else if (this.classList.contains("btn__mult")) {
      currOperator = "multiply";
    } else {
      currOperator = "divide";
    }
  })
);
