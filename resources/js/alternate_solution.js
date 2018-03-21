// ['Data'(Object)] for Main Calculator Variables/Functions
const data = {
  numbers: ['0','1','2','3','4','5','6','7','8','9'],
  keys: document.getElementById('keyboard').getElementsByTagName('button'),
	history: [],
	equation: '',
	firstTerm: 0,
	currentOperator:'',
  numberButton: val => {
  	if (data.currentOperator === '=') {
  		data.clearDisplay();
  		data.currentOperator = '';
  		data.displayValue(val);
  	} else {
  		data.displayValue(val);
  	}
  },
  higherOperation: operator => {
    const val = document.getElementById('display').innerHTML;
  	let x;
    let y;
  	let xOperated;
  	if (val === ''){
  		x = data.firstTerm;
  	} else {
  		x = document.getElementById('display').innerHTML;
  		y = data.firstTerm;
  	}
    switch (operator) {
      case '/100':
  	    const percentOfX = parseFloat((x /100).toFixed(9));
  	    if (!y) {
  		    xOperated = parseFloat((x * percentOfX).toFixed(9)).toString();
  	    } else {
  		    xOperated = parseFloat((y * percentOfX).toFixed(9)).toString();
  	    }
        break;
  	  case 'Math.sqrt':
  		  if (x < 0){
  		    document.getElementById('display').innerHTML = 'Error!';
  		  }	else {
  		    xOperated = parseFloat(eval(`${operator}(${x})`).toFixed(9)).toString();
  		  }
        break;
  	  case '**2':
  		  xOperated = parseFloat(eval(`${x}${operator}`).toFixed(9)).toString();
        break;
  	  case '1/':
  		  xOperated = parseFloat(eval(`${operator}${x}`).toFixed(9)).toString();
        break;
  	  case '0-':
  		  xOperated = parseFloat((0 - x).toFixed(9)).toString();
        break;
  	}
  	if (xOperated.length > 11) {
  		xOperated = xOperated.substring(0,11);
  	}
    document.getElementById('display').innerHTML = xOperated;
  },
  basicOperation: operator => {
    const val = document.getElementById('display').innerHTML;
  	if (val !== ''){
  		data.firstTerm = document.getElementById('display').innerHTML;
  		data.currentOperator = operator;
  		if (operator !== '='){
  			data.equation += `${data.firstTerm} ${data.currentOperator} `;
  		} else {
  			data.equation += `${data.firstTerm} `;
  		}
  		data.history.push(`${data.firstTerm} ${data.currentOperator} `);
  		data.displayValueSecondary(data.equation);
  		data.clearDisplay();
  	}
  	if (operator === '=') {
  		let e = parseFloat(eval(data.equation).toFixed(9)).toString();
  		if (e.length > 11) {
  			e = e.substring(0,11);
  		}
  		data.displayValue(e);
  		data.history.push(`${data.equation}= ${e}`);
  		data.equation = '';
  		data.clearSecondaryDisplay();
  	}
  },
  displayValue: val => {
    const input = document.getElementById('display').innerHTML
  	if (input.length < 11) {
  		document.getElementById('display').innerHTML += val;
  	}
  },
  displayValueSecondary: val => {
  	document.getElementById('secondary-display').innerHTML = '';
  	document.getElementById('secondary-display').innerHTML += val;
  },
  clearData: () => {
  	data.equation = '';
  	data.firstTerm = 0;
  	data.currentOperator = '';
  },
  clearEquation: () => {
  	data.equation = '';
  },
  clearDisplay: () => {
  	document.getElementById('display').innerHTML = '';
  },
  clearSecondaryDisplay: () => {
  	document.getElementById('secondary-display').innerHTML = '';
  },
};

// ['Memory'(Object)] for Calculator Memory Variables/Functions
const memory = {
	history: [],
	firstTerm: 0,
	secondTerm: 0,
	notInUse: true,
	specialButtons: document.getElementsByClassName('not-in-use'),
  memoryHistory: (x, operator, y, e) => {
    if (operator) {
  		const equationString = `${x} ${operator} ${y} = ${e}`;
  		memory.history.push(equationString);
  	} else {
  		memory.firstTerm = document.getElementById('display').innerHTML;
  		memory.history.push(memory.firstTerm);
  	}
  },
  toggleMemory: boolean => {
    memory.notInUse = boolean;
  	if (memory.notInUse) {
  		for (let i = 0; i < memory.specialButtons.length; i++){
  			memory.specialButtons[i].style.color = 'rgba(0,0,0,0.5)';
  		}
    } else {
  		for (let i = 0; i < memory.specialButtons.length; i++){
  			memory.specialButtons[i].style.color = 'rgba(0,0,0,1)';
  		}
  	}
  },
  memoryMath: operator => {
    memory.secondTerm = document.getElementById('display').innerHTML;
  	const x = parseInt(memory.firstTerm);
  	const y = parseInt(memory.secondTerm);
  	const e = parseFloat(eval(`x ${operator} y`).toFixed(9)).toString();
  	memory.memoryHistory(memory.firstTerm, '+', memory.secondTerm, e);
  	memory.firstTerm = e;
  	memory.toggleMemory(false);
  },
  clearMemory: () => {
    memory.history = [];
  	memory.firstTerm = 0;
  	memory.secondTerm = 0;
  	memory.toggleMemory(true);
  },
}

// Header Bar Buttons : Working
document.getElementById('menu').addEventListener('click', () => {
	console.log('Under Construction!');
})

document.getElementById('history').addEventListener('click', () => {
	console.log(data.history);
  console.log(data);
})


function numberClick(e) {
    // As a Button is Pressed its inner value is captured.
    const btnValue = this.innerHTML;
    // Check if btnValue is a number, if it is passes it as a value to
    // ['numberButton'(function)] to be displayed to primary display.
    if (data.numbers.includes(btnValue)) {
      data.numberButton(this.innerHTML);
    }
    // All other Button values are passed through this switch statement
    // To perform their individual functions
    switch (btnValue) {
      case 'MC': //Memory-Clear
        memory.clearMemory();
        data.clearDisplay();
        break;
      case 'MR': //Memory-Recall
        document.getElementById('display').innerHTML = memory.firstTerm;
        break;
      case 'M+': //Memory-Add
        memory.memoryMath('+');
        data.clearDisplay();
        break;
      case 'M-': //Memory-Subtract
        memory.memoryMath('-');
        data.clearDisplay();
        break;
      case 'MS': //Memory-Store
        memory.memoryHistory();
        memory.toggleMemory(false);
        data.clearDisplay();
        break;
      case 'Mv': //Memory-History
        console.log(memory.history);
        console.log(memory);
        break;
      case '%':  //Percent
        data.higherOperation('/100');
        break;
      case '-/': //Square-Root
        data.higherOperation('Math.sqrt');
        break;
      case 'x^2': //Squared
        data.higherOperation('**2');
        break;
      case '1/x': //Reciprocal
        data.higherOperation('1/');
        break;
      case 'CE': //Clear-Entry
        data.clearDisplay();
        break;
      case 'C': //Clear-All
        data.clearData();
        memory.clearMemory();
        data.clearDisplay();
        data.clearSecondaryDisplay();
        break;
      case 'BS': //Backspace
        const input = document.getElementById('display').innerHTML;
        data.clearDisplay();
        data.displayValue(input.slice(0, -1));
        break;
      case '/': //Divide
        data.basicOperation('/');
        break;
      case '*': //Multiply
        data.basicOperation('*');
        break;
      case '-': //Subtract
        data.basicOperation('-');
        break;
      case '+': //Add
        data.basicOperation('+');
        break;
      case '=': //Evaluate
        data.basicOperation('=');
        break;
      case '.': //Decimal-Point
        const value = document.getElementById('display').innerHTML;
        if (!value.includes('.')) {
          data.displayValue(this.innerHTML);
        };
        break;
      case '+/-': //Plus-Minus (Negate)
        data.higherOperation('0-');
        break;
    }
    //Prevents any 'Event' default actions
    e.preventDefault();
  };

//  Main For Loop : Iterates Through, and adds ['Click'(Event Listeners)] to,
//  all 'Keyboard' buttons;
for (let i = 0; i < data.keys.length; i++ ){
  data.keys[i].onclick = numberClick(e)  
}
