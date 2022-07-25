"use strict";

const operatingScreen = document.getElementById("operation");
const stagingScreen = document.getElementById("stage");

const calculator = {
  currentNumber: 0,
  previousNumber: 0,
  operator: null,
  result: null,
  pi: function () {
    this.currentNumber = 3.141592653589;
  },
  reset: false,
  shouldReset: false,
  operatorClick: function (operator) {
    if (!this.operator) {
      this.operator = operator;
      this.previousNumber = this.currentNumber;
      this.currentNumber = 0;
    } else {
      this.equals();
      this.previousNumber = this.result;
      this.operator = operator;
      this.result = null;
      this.currentNumber = 0;
      this.shouldReset = false;
    }
  },
  operatorSymbol: function () {
    if (this.operator === "divide") return "÷";
    if (this.operator === "multiply") return "×";
    if (this.operator === "minus") return "−";
    if (this.operator === "plus") return "+";
  },
  addDigit: function (digit) {
    if (this.shouldReset) {
      this.clear();
    }
    if (this.currentNumber === 0) {
      this.currentNumber = "";
    }
    this.currentNumber += digit;
  },
  delete: function () {
    this.currentNumber =
      this.currentNumber.length === 1 ? 0 : this.currentNumber.slice(0, -1);
  },
  point: function () {
    if (this.currentNumber === "") this.currentNumber = 0;
    if (!this.currentNumber.toString().includes(".")) this.currentNumber += ".";
  },
  display: function () {
    if (!this.result) {
      stagingScreen.textContent = `${
        !this.previousNumber ? this.currentNumber : this.previousNumber
      } ${this.operator ? this.operatorSymbol() : ""}`;
      operatingScreen.textContent = this.currentNumber;
    }
    // else if (this.reset) {
    //   stagingScreen.textContent = "";
    //   this.reset = false;
    // }
    else if (this.result || this.result === 0) {
      stagingScreen.textContent = `${
        this.previousNumber
      } ${this.operatorSymbol()} ${this.currentNumber} =`;
      operatingScreen.textContent = this.roundResult(this.result);
    }
  },
  clear: function () {
    this.currentNumber = 0;
    this.previousNumber = 0;
    this.operator = null;
    this.result = null;
    // this.reset = true;
    this.shouldReset = false;
    // this.display();
  },
  equals: function () {
    if (
      this.currentNumber === "0.7734" &&
      !this.operator &&
      !this.previousNumber
    ) {
      this.currentNumber = "Hello 😉";
    } else {
      this.shouldReset = true;
      if (this.operator === "plus") {
        this.result = Number(this.currentNumber) + Number(this.previousNumber);
      } else if (this.operator === "minus") {
        this.result = this.previousNumber - this.currentNumber;
      } else if (this.operator === "multiply") {
        this.result = this.previousNumber * this.currentNumber;
      } else if (this.operator === "divide") {
        this.result =
          this.currentNumber === "0"
            ? "🤡"
            : this.previousNumber / this.currentNumber;
      }
    }
  },
  percent: function () {
    this.currentNumber = this.currentNumber / 10;
  },
  sqrd: function () {
    this.currentNumber = this.currentNumber ** 2;
  },
  sqrt: function () {
    this.currentNumber = Math.sqrt(this.currentNumber);
  },
  roundResult: function (num) {
    num = num.toString();
    if (num.length > 14) num = num.substring(0, 14);
    return num;
  },
};

const calculatorArea = document.querySelector(".calculator");
calculatorArea.addEventListener("click", (e) => {
  const target = e.target;
  const classlist = e.target.classList;
  const id = e.target.id;

  if (classlist.contains("digit")) {
    calculator.addDigit(target.textContent);
  } else if (classlist.contains("operator")) {
    calculator.operatorClick(id);
  } else {
    if (calculator.hasOwnProperty(id)) calculator[id]();
  }
  calculator.display();
});

calculator.display();
