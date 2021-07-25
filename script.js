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
  operatorKey.addEventListener("click", function () {
    if (!displayValue) return;

    currentOperation.operator = operatorKeys.textContent; // all of the cases below update operator

    if (currentOperation.operator && operatorStage) {
      return;
    }

    operatorStage = true;

    if (!currentOperation.firstOperand) {
      currentOperation.firstOperand = displayValue;
    } else {
      setupOperation();
    }
  })
);

function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = displayValue;
}

function setupOperation() {
  currentOperation.secondOperand = displayValue;
  currentOperation.firstOperand = operate();
  displayValue = currentOperation.firstOperand;
  currentOperation.secondOperand = "";
}

function operate() {
  switch (currentOperation.operator) {
    case "+":
      return add();
      break;
    case "-":
      return subtract();
      break;
    case "/":
      return divide();
      break;
    case "*":
      return multiply();
      break;
  }
}

function add() {
  return currentOperation.firstOperand + currentOperation.secondOperand;
}
function subtract() {
  return currentOperation.firstOperand - currentOperation.secondOperand;
}
function divide() {
  return currentOperation.firstOperand / currentOperation.secondOperand;
}
function multiply() {
  return currentOperation.firstOperand * currentOperation.secondOperand;
}
