const btnNumbers = document.querySelectorAll('.number');
const btnOperators = document.querySelectorAll('.operator');
const btnClear = document.querySelector('.clear');
const btnDelete = document.querySelector('.delete');
const btnEqual = document.querySelector('.equal');
const previousScreen = document.querySelector('.previous-operation');
const actualScreen = document.querySelector('.actual-operation');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

const clear = () => {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
}

const deleteNumber = () => {
    currentOperand = currentOperand.toString().slice(0, -1);
}

const appendNumber = (number) => {
    if (number === '•') {
        number = '.';
        if (currentOperand.includes('.')) {
            return;
        }
    }
    currentOperand = currentOperand.toString() + number.toString();
}

const updateDisplay = () => {
    actualScreen.innerText = currentOperand;
    if (operation != null) {
        previousScreen.innerText = `${previousOperand} ${operation}`
    } else {
        previousScreen.innerText = '';
    }
    try {
        operate();
        updateDisplay();
    } catch (actualScreen) {
        actualScreen.innerText = "You can't divide by 0";
    }
}

const chooseOperation = (operator) => {
    if (currentOperand === '') return
    if (previousOperand !== '') {
        operate();
    }
    operation = operator;
    previousOperand = currentOperand;
    currentOperand = '';
}

const operate = () => {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                actualScreen.innerText = "You can't divide by 0";
                clear();
                throw error("blah");
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
}

btnNumbers.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
        updateDisplay();
    })
})

btnOperators.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText);
        updateDisplay();
    })
})

btnEqual.addEventListener('click', () => {
    operate();
    updateDisplay();
})

btnClear.addEventListener('click', () => {
    clear();
    updateDisplay();
})

btnDelete.addEventListener('click', () => {
    deleteNumber();
    updateDisplay();
})