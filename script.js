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
const equalsKey = document.getElementById("equals");
const backspaceKey = document.getElementById("backspace");

document.addEventListener("keydown", function (e) {
  const numberKeysAvail = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    ".",
  ];
  const operatorKeysAvail = ["+", "-", "/", "*", "%"];
  if (numberKeysAvail.includes(e.key)) pressClickNumber(e.key);
  else if (operatorKeysAvail.includes(e.key)) pressClickOperator(e.key);
  else if (e.key === "=" || e.key === "Enter") pressClickEqual();
  else if (e.key === "Backspace") pressClickBackspace();
});

numberKeys.forEach((numberKey) =>
  numberKey.addEventListener("click", function (e) {
    const numberOrDot = e.target.textContent;
    pressClickNumber(numberOrDot);
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
    pressClickOperator(e.target.textContent);
  })
);

// WHENEVER equal Operator button is pressed:
// 	IF FirstOperand is none: RETURN
// 	ELSE:
// 		SetupOperation()
// 		Operator <- ""
// 	ENDIF
// ENDFUNCTION

equalsKey.addEventListener("click", pressClickEqual);

backspaceKey.addEventListener("click", pressClickBackspace);

function pressClickNumber(number) {
  if (currentOperation.firstOperand === "tf are you doing") return;
  if (number === "." && displayValue.includes(".")) return;

  if (operatorStage) {
    displayValue = "";
    operatorStage = false;
  }

  if (displayValue.length <= 9) {
    displayValue += number;
    updateDisplay();
  }
}

function pressClickOperator(operator) {
  if (currentOperation.firstOperand === "tf are you doing") return;

  if (!displayValue) return;

  if (currentOperation.operator && operatorStage) {
    currentOperation.operator = operator; // all of the cases below update operator
    return;
  }

  operatorStage = true;

  if (!currentOperation.firstOperand || !currentOperation.operator) {
    // case for when no operations had been made || making operation after pressing 'equals'
    currentOperation.firstOperand = displayValue;
    currentOperation.operator = operator;
  } else {
    setupOperation();
    currentOperation.operator = operator;
  }
}

function pressClickEqual() {
  if (currentOperation.firstOperand === "tf are you doing") return;

  if (!currentOperation.firstOperand || !currentOperation.operator) return;
  setupOperation();
  currentOperation.operator = "";
}

function pressClickBackspace() {
  displayValue = displayValue.substring(0, displayValue.length - 1);
  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = displayValue;
}

function setupOperation() {
  currentOperation.secondOperand = displayValue;
  currentOperation.firstOperand = operate(); // do the operation with numbers but store as string (to keep data consistent)
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
    case "%":
      return mod();
  }
}

function add() {
  const result =
    parseFloat(currentOperation.firstOperand) +
    parseFloat(currentOperation.secondOperand);
  return filterResult(result);
}
function subtract() {
  const result =
    parseFloat(currentOperation.firstOperand) -
    parseFloat(currentOperation.secondOperand);
  return filterResult(result);
}
function divide() {
  if (currentOperation.secondOperand === "0") return "tf are you doing";
  const result =
    parseFloat(currentOperation.firstOperand) /
    parseFloat(currentOperation.secondOperand);

  return filterResult(result);
}
function multiply() {
  const result =
    parseFloat(currentOperation.firstOperand) *
    parseFloat(currentOperation.secondOperand);

  return filterResult(result);
}

function mod() {
  const result =
    parseFloat(currentOperation.firstOperand) %
    parseFloat(currentOperation.secondOperand);
  return filterResult(result);
}

function filterResult(result) {
  let modifiedResult = result;

  if (String(modifiedResult).length > 9) {
    modifiedResult = modifiedResult.toExponential();
  }
  if (String(result).includes(".") && String(result).split(".")[1].length > 2) {
    modifiedResult = Math.round(result * 100) / 100;
  }
  return modifiedResult;
}
