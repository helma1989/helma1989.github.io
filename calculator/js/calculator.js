let runningTotal = 0;

let buffer = "0";

let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        console.log(value);
        handleSymbol(value);
    } else {
        
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    /*if (symbol === 'C') {
        buffer = '0';
        runningTotal = 0;
    }*/
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.slice(0, (buffer.length - 1));
            }
            break;
        case '=':
            if (previousOperator === null) {
                // need two numbers to do math
                return;
            } 
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '+':  
        case '−':
        case '÷':
        case '×':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer); // const intBuffer = +buffer;

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;

    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+' ){
        runningTotal +=intBuffer;
    } else if (previousOperator === '−' ){
        runningTotal -= intBuffer;
    } else if (previousOperator === '×' ){
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷' ){
        runningTotal /= intBuffer;
    }
    
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString
    } else {
        buffer += numberString
    }
}

function init () {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    })

}

init();

  
  