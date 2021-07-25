let currentOperation = {
  firstOperand: "",
  secondOperand: "",
  operator: "",
};

let displayValue = "";
let operatorStage = false;

const numberKeys = Array.from(document.getElementsByClassName("number-key"));
numberKeys.forEach((numberKey) =>
  numberKey.addEventListener("click", function (e) {
    if (operatorStage) {
      displayValue = "";
      operatorStage = false;
    }

    if (displayValue.length <= 11) {
      displayValue += e.target.textContent;
      updateDisplay();
    }
  })
);

function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = displayValue;
}
