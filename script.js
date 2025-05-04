const numbers = document.querySelectorAll('.numbers');
const screen = document.querySelector('.calculator-screen');
const clearButton = document.querySelector('.clear');
const operators = document.querySelectorAll('.Operators'); // Fixed capitalization
const equal = document.querySelector('.equal-sign');

// Targeting numbers
numbers.forEach(button => {
    button.addEventListener('click', () => {
        let input = button.textContent;
        screen.value += input;
    });
});

// Clear button
clearButton.addEventListener('click', () => {
    screen.value = ""; 
});

// Operators
operators.forEach(button => {
    button.addEventListener('click', () => {
        let operator = button.textContent;

        // Prevent adding operator if last character is also an operator
        if (screen.value === "" || /[+\-*/]$/.test(screen.value)) {
            return;
        }
        
        screen.value += operator;
    });
});

// Equal button
equal.addEventListener('click', () => {
    if (screen.value === "") {
        return;
    }

    try {
        screen.value = evaluateExpression(screen.value);
    } catch (error) {
        screen.value = "Error";
    }
});

// Safe evaluation function
function evaluateExpression(expression) {
    // Replace symbols with actual operators
    expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
    return Function('"use strict"; return (' + expression + ')')();
}
