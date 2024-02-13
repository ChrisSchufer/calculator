// SETTING COLOR THEME
const theme1 = document.getElementById('theme1');
const theme2 = document.getElementById('theme2');
const theme3 = document.getElementById('theme3');

theme1.addEventListener('click', (e) => {
  theme1.classList.add('active');
  theme2.classList.remove('active');
  theme3.classList.remove('active');
  document.body.classList.add('light-theme');
  document.body.classList.remove('dark-theme');
  document.body.classList.remove('purple-theme');
});

theme2.addEventListener('click', (e) => {
  theme2.classList.add('active');
  theme1.classList.remove('active');
  theme3.classList.remove('active');
  document.body.classList.add('dark-theme');
  document.body.classList.remove('light-theme');
  document.body.classList.remove('purple-theme');
});

theme3.addEventListener('click', (e) => {
  theme3.classList.add('active');
  theme1.classList.remove('active');
  theme2.classList.remove('active');
  document.body.classList.add('purple-theme');
  document.body.classList.remove('light-theme');
  document.body.classList.remove('dark-theme');
});

// CALCULATOR
const calculator = document.getElementById('calculator');
const keys = calculator.querySelector('.calc-keyboard');
const calcDisplay = calculator.querySelector('.calc-display');

keys.addEventListener('click', (e) => {
  if (!e.target.closest('button')) return;

  const key = e.target;
  const keyValue = key.textContent;
  const calcDisplayValue = calcDisplay.textContent;
  const {type} = key.dataset;
  const {previousKeyType} = calculator.dataset;

  // Is this a number key?
  if (type === 'number') {
    if (calcDisplayValue === '0') {
      calcDisplay.textContent = keyValue;
    } else if (previousKeyType === 'operator') {
      calcDisplay.textContent = keyValue;
    } else {
      calcDisplay.textContent = calcDisplayValue + keyValue;
    }
  }

  // Is this an operator key?
  if (type === 'operator' || type === 'deleteAll') {
    const operatorKeys = keys.querySelectorAll("[data-type='operator']");
    operatorKeys.forEach((el) => {
      el.classList.remove('selected');
    });

    calculator.dataset.firstNumber = calcDisplayValue;
    calculator.dataset.operator = key.dataset.key;
    key.classList.add('selected');
  }

  if (type === 'delete') {
    calcDisplay.textContent = calcDisplayValue.slice(0, -1);
    if (calcDisplay.textContent === '') {
      calcDisplay.textContent = '0';
    }
  }

  if (type === 'deleteAll') {
    calcDisplay.textContent = '0';
  }

  if (type === 'equal') {
    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    const secondNumber = calcDisplayValue;

    calcDisplay.textContent = calculate(firstNumber, operator, secondNumber);
  }

  calculator.dataset.previousKeyType = type;
});

function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);

  switch (operator) {
    case 'plus':
      return firstNumber + secondNumber;
    case 'minus':
      return firstNumber - secondNumber;
    case 'times':
      return firstNumber * secondNumber;
    case 'divide':
      return firstNumber / secondNumber;
  }
}
