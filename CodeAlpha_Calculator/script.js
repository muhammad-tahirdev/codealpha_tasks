const currentDisplay = document.getElementById("current-display");
const previousDisplay = document.getElementById("previous-display");

let currentInput = "";
let previousInput = "";
let operation = null;
let shouldResetDisplay = false;


function updateDisplay() {
    currentDisplay.textContent = currentInput || "0";
    previousDisplay.textContent =
        previousInput && operation
            ? `${previousInput} ${operation}`
            : "";
}


function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = "";
        shouldResetDisplay = false;
    }

    if (number === "." && currentInput.includes(".")) {
        return;
    }

    if (number === "." && currentInput === "") {
        currentInput = "0";
    }

    currentInput += number;

    updateDisplay();
}


function chooseOperation(selectedOperation) {
    if (currentInput === "" && previousInput === "") {
        return;
    }

    if (currentInput === "" && previousInput !== "") {
        operation = selectedOperation;
        updateDisplay();
        return;
    }

    if (previousInput !== "") {
        calculate();
    }

    previousInput = currentInput;
    operation = selectedOperation;
    currentInput = "";
    
    updateDisplay();
}


function calculate() {
    const firstNumber = parseFloat(previousInput);
    const secondNumber = parseFloat(currentInput);

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        return;
    }

    let result;

    switch (operation) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "−":
            result = firstNumber - secondNumber;
            break;

        case "×":
            result = firstNumber * secondNumber;
            break;

        case "÷":
            if (secondNumber === 0) {
                currentInput = "Error";
                previousInput = "";
                operation = null;
                shouldResetDisplay = true;
                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;

        default:
            return;
    }

    currentInput = Number(result.toFixed(10)).toString();
    previousInput = "";
    operation = null;
    shouldResetDisplay = true;

    updateDisplay();
}


function clearCalculator() {
    currentInput = "";
    previousInput = "";
    operation = null;
    shouldResetDisplay = false;

    updateDisplay();
}


function deleteNumber() {
    if (shouldResetDisplay) {
        return;
    }

    currentInput = currentInput.slice(0, -1);

    updateDisplay();
}


document.querySelectorAll("[data-number]").forEach(button => {
    button.addEventListener("click", () => {
        appendNumber(button.dataset.number);
    });
});


document.querySelectorAll("[data-operation]").forEach(button => {
    button.addEventListener("click", () => {

        const selectedOperation = button.dataset.operation;

        if (selectedOperation === "delete") {
            deleteNumber();
        } else {
            chooseOperation(selectedOperation);
        }
    });
});


document.querySelector('[data-action="clear"]').addEventListener("click", () => {
    clearCalculator();
});


document.querySelector('[data-action="equals"]').addEventListener("click", () => {
    calculate();
});


document.addEventListener("keydown", event => {

    if (
        (event.key >= "0" && event.key <= "9") ||
        event.key === "."
    ) {
        appendNumber(event.key);
    }

    if (event.key === "+") {
        chooseOperation("+");
    }

    if (event.key === "-") {
        chooseOperation("−");
    }

    if (event.key === "*") {
        chooseOperation("×");
    }

    if (event.key === "/") {
        event.preventDefault();
        chooseOperation("÷");
    }

    if (event.key === "Enter" || event.key === "=") {
        calculate();
    }

    if (event.key === "Escape") {
        clearCalculator();
    }

    if (event.key === "Backspace") {
        deleteNumber();
    }
});


updateDisplay();