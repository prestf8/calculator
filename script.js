let currentOperation = {
  firstOperand: "",
  secondOperand: "",
  operator: "",
};

let displayValue = "";
let operatorStage = false;

const numberKeys = Array.from(document.getElementsByClassName("number-key"));
const clearKey = document.getElementById("clear");
const operatorKeys = Array.from(
  document.getElementsByClassName("operator-key")
);

numberKeys.forEach((numberKey) =>
  numberKey.addEventListener("click", function (e) {
    if (operatorStage) {
      displayValue = "";
      operatorStage = false;
    }

    if (displayValue.length <= 9) {
      displayValue += e.target.textContent;
      updateDisplay();
    }
  })
);

clearKey.addEventListener("click", function () {
  operatorStage = false;
  displayValue = "";
  updateDisplay();
  currentOperation.firstOperand = "";
  currentOperation.operator = "";
});

operatorKeys.forEach((operatorKey) =>
  operatorKey.addEventListener("click", function (e) {
    const operator = e.target.textContent;
    if (!displayValue) return;

    if (currentOperation.operator && operatorStage) {
      currentOperation.operator = operator; // all of the cases below update operator
      return;
    }

    operatorStage = true;

    if (!currentOperation.firstOperand) {
      currentOperation.firstOperand = displayValue;
      currentOperation.operator = operator;
    } else {
      setupOperation();
      currentOperation.operator = operator;
    }
  })
);

function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = displayValue;
}

function setupOperation() {
  currentOperation.secondOperand = displayValue;
  currentOperation.firstOperand = String(operate()); // do the operation with numbers but store as string (to keep data consistent)
  displayValue = currentOperation.firstOperand;
  currentOperation.secondOperand = "";
  updateDisplay();
}

function operate() {
  switch (currentOperation.operator) {
    case "+":
      return add();
    case "-":
      return subtract();
    case "/":
      return divide();
    case "*":
      return multiply();
  }
}

function add() {
  return (
    parseFloat(currentOperation.firstOperand) +
    parseFloat(currentOperation.secondOperand)
  );
}
function subtract() {
  return (
    parseFloat(currentOperation.firstOperand) -
    parseFloat(currentOperation.secondOperand)
  );
}
function divide() {
  return (
    parseFloat(currentOperation.firstOperand) /
    parseFloat(currentOperation.secondOperand)
  );
}
function multiply() {
  return (
    parseFloat(currentOperation.firstOperand) *
    parseFloat(currentOperation.secondOperand)
  );
}
