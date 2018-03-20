// Objects
  // Main ['data'(object)]
var data = {
	history: [],
	equation: '',
	firstTerm: 0,
	secondTerm: 0,
	currentOperator: '',
	numberButton: function(val){
    var input = val;
  	if (data.currentOperator === '=') {
  		clearDisplay();
  		data.currentOperator = '';
  		displayValue(input);
  	} else {
  		displayValue(input);
  	}
  },
  higherOperation: function(operator) {
    var val = document.getElementById('display').innerHTML;
  	var x = 0;
  	var xOperated = '';
  	if (val === ''){
  		x = data.firstTerm;
  	} else {
  		x = document.getElementById('display').innerHTML;
  		var y = data.firstTerm;
  	};
    if (operator === '/100'){
  	  var percentOfX = parseFloat((x /100).toFixed(9));
  	  if (!y) {
  		  xOperated = parseFloat((x * percentOfX).toFixed(9)).toString();
  	  } else {
  		  xOperated = parseFloat((y * percentOfX).toFixed(9)).toString();
  	  }
  	} else if (operator === 'Math.sqrt') {
  		if (x < 0){
  		  document.getElementById('display').innerHTML = 'Error!';
  		}	else {
  		  xOperated = parseFloat(eval(`${operator}(${x})`).toFixed(9)).toString();
  		}
  	} else if (operator === '**2'){
  		xOperated = parseFloat(eval(`${x}${operator}`).toFixed(9)).toString();
  	} else if (operator === '1/') {
  		xOperated = parseFloat(eval(`${operator}${x}`).toFixed(9)).toString();
  	} else if (operator === '0-') {
  		xOperated = parseFloat((0 - x).toFixed(9)).toString();
  	}
  	if (xOperated.length > 11) {
  		xOperated = xOperated.substring(0,11);
  	};
    document.getElementById('display').innerHTML = xOperated;
  },
  basicOperation: function(operator) {
    var val = document.getElementById('display').innerHTML;
  	if (val !== ''){
  		data.firstTerm = document.getElementById('display').innerHTML;
  		data.currentOperator = operator;
  		if (operator !== '='){
  			data.equation += `${data.firstTerm} ${data.currentOperator} `;
  		} else {
  			data.equation += `${data.firstTerm} `;
  		};
  		data.history.push(`${data.firstTerm} ${data.currentOperator} `);
  		displayValueSecondary(data.equation);
  		clearDisplay();
  		console.log(data);
  	};
  	if (operator === '=') {
  		var e = parseFloat(eval(data.equation).toFixed(9)).toString();
  		if (e.length > 11) {
  			e = e.substring(0,11);
  		};
  		displayValue(e);
  		data.history.push(`${data.equation}= ${e}`);
  		data.equation = '';
  		clearSecondaryDisplay();
  	};
  },
  displayValue: function(val){
    var input = document.getElementById('display').innerHTML
  	if (input.length < 11) {
  		document.getElementById('display').innerHTML += val;
  	}
  },
  displayValueSecondary: function(val){
  	document.getElementById('secondary-display').innerHTML = '';
  	document.getElementById('secondary-display').innerHTML += val;
  },
  clearData: function(){
  	data.equation = '';
  	data.firstTerm = 0;
  	data.secondTerm = 0;
  	data.currentOperator = '';
  },
  clearEquation: function(){
  	data.equation = '';
  },
  clearDisplay: function(){
  	document.getElementById('display').innerHTML = '';
  },
  clearSecondaryDisplay: function(){
  	document.getElementById('secondary-display').innerHTML = '';
  },
}
  // ['memory'(object)]
var memory = {
	history: [],
	firstTerm: 0,
	secondTerm: 0,
	notInUse: true,
	specialButtons: document.getElementsByClassName('not-in-use'),
	memoryHistory: function(x, operator, y, e) {
    if (operator) {
  		var equationString = `${x} ${operator} ${y} = ${e}`;
  		memory.history.push(equationString);
  	} else {
  		memory.firstTerm = document.getElementById('display').innerHTML;
  		memory.history.push(memory.firstTerm);
  	}
  },
  toggleMemory: function(boolean){
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
  memoryMath: function(operator){
    memory.secondTerm = document.getElementById('display').innerHTML;
  	var x = parseInt(memory.firstTerm);
  	var y = parseInt(memory.secondTerm);
  	var e = parseFloat(eval(`x ${operator} y`).toFixed(9)).toString();
  	memoryHistory(memory.firstTerm, '+', memory.secondTerm, e);
  	memory.firstTerm = e;
  	toggleMemory(false);
  },
  clearMemory: function(){
    memory.history = [];
  	memory.firstTerm = 0;
  	memory.secondTerm = 0;
  	toggleMemory(true);
  },
};

// Functions
  // General
var clearDisplay = function() {
	document.getElementById('display').innerHTML = '';
}

var clearSecondaryDisplay = function() {
	document.getElementById('secondary-display').innerHTML = '';
}

var clearEquation = function() {
	data.equation = '';
}

var clearData = function() {
	data.equation = '';
	data.firstTerm = 0;
	data.secondTerm = 0;
	data.currentOperator = '';
}

var displayValue = function(val) {
	var input = document.getElementById('display').innerHTML
	if (input.length < 11) {
		document.getElementById('display').innerHTML += val;
	};
};

var displayValueSecondary = function(val) {
	document.getElementById('secondary-display').innerHTML = '';
	document.getElementById('secondary-display').innerHTML += val;
};

var basicOperation = function(operator) {
	var val = document.getElementById('display').innerHTML;
	if (val !== ''){
		data.firstTerm = document.getElementById('display').innerHTML;
		data.currentOperator = operator;
		if (operator !== '='){
			data.equation += `${data.firstTerm} ${data.currentOperator} `;
		} else {
			data.equation += `${data.firstTerm} `;
		};
		data.history.push(`${data.firstTerm} ${data.currentOperator} `);
		displayValueSecondary(data.equation);
		clearDisplay();
		console.log(data);
	};
	if (operator === '=') {
		var e = parseFloat(eval(data.equation).toFixed(9)).toString();
		if (e.length > 11) {
			e = e.substring(0,11);
		};
		displayValue(e);
		data.history.push(`${data.equation}= ${e}`);
		data.equation = '';
		clearSecondaryDisplay();
	};
}

var higherOperation = function(operator) {
	var val = document.getElementById('display').innerHTML;
	var x = 0;
	var xOperated = '';
	if (val === ''){
		x = data.firstTerm;
	} else {
		x = document.getElementById('display').innerHTML;
		var y = data.firstTerm;
	};
  if (operator === '/100'){
	  var percentOfX = parseFloat((x /100).toFixed(9));
	  if (!y) {
		  xOperated = parseFloat((x * percentOfX).toFixed(9)).toString();
	  } else {
		  xOperated = parseFloat((y * percentOfX).toFixed(9)).toString();
	  }
	} else if (operator === 'Math.sqrt') {
		if (x < 0){
		  document.getElementById('display').innerHTML = 'Error!';
		}	else {
		  xOperated = parseFloat(eval(`${operator}(${x})`).toFixed(9)).toString();
		}
	} else if (operator === '**2'){
		xOperated = parseFloat(eval(`${x}${operator}`).toFixed(9)).toString();
	} else if (operator === '1/') {
		xOperated = parseFloat(eval(`${operator}${x}`).toFixed(9)).toString();
	} else if (operator === '0-') {
		xOperated = parseFloat((0 - x).toFixed(9)).toString();
	}
	if (xOperated.length > 11) {
		xOperated = xOperated.substring(0,11);
	};
  document.getElementById('display').innerHTML = xOperated;
}

var numberButton = function(val){
	var input = val;
	if (data.currentOperator === '=') {
		clearDisplay();
		data.currentOperator = '';
		displayValue(input);
	} else {
		displayValue(input);
	}
}

  // Memory Specific
var clearMemory = function() {
	memory.history = [];
	memory.firstTerm = 0;
	memory.secondTerm = 0;
	toggleMemory(true);
}

var memoryHistory = function(x, operator, y, e) {
	if (operator) {
		var equationString = `${x} ${operator} ${y} = ${e}`;
		memory.history.push(equationString);
	} else {
		memory.firstTerm = document.getElementById('display').innerHTML;
		memory.history.push(memory.firstTerm);
	}
}

var toggleMemory = function(boolean) {
	memory.notInUse = boolean;
	if (memory.notInUse) {
		for (let i = 0; i < memory.specialButtons.length; i++){
			memory.specialButtons[i].style.color = 'rgba(0,0,0,0.5)';
		};
  } else {
		for (let i = 0; i < memory.specialButtons.length; i++){
			memory.specialButtons[i].style.color = 'rgba(0,0,0,1)';
		};
	};
};

var memoryMath = function(operator) {
	memory.secondTerm = document.getElementById('display').innerHTML;
	var x = parseInt(memory.firstTerm);
	var y = parseInt(memory.secondTerm);
	var e = parseFloat(eval(`x ${operator} y`).toFixed(9)).toString();
	memoryHistory(memory.firstTerm, '+', memory.secondTerm, e);
	memory.firstTerm = e;
	toggleMemory(false);
}

// EVENT LISTENERS (29/32) Buttons Working!!
  //Menu/History Buttons Working!! (somewhat?!?)
document.getElementById('menu').addEventListener('click', function(){
	console.log('Under Construction!');
});
document.getElementById('history').addEventListener('click', function(){
	console.log(data.history);
});

  // Memory ---> Buttons Working! ---> Revised
document.getElementById('memory-clear').addEventListener('click', function(){
  clearMemory();
	clearDisplay();
	console.log(memory);
});
document.getElementById('memory-recall').addEventListener('click', function(){
  document.getElementById('display').innerHTML = memory.firstTerm;
});
document.getElementById('memory-add').addEventListener('click', function(){
	memoryMath('+');
	clearDisplay();
	console.log(memory);
});
document.getElementById('memory-subtract').addEventListener('click', function(){
	memoryMath('-');
	clearDisplay();
	console.log(memory);
});
document.getElementById('memory-store').addEventListener('click', function(){
	memoryHistory();
  toggleMemory(false);
	clearDisplay();
	console.log(memory);
});
document.getElementById('memory-history').addEventListener('click', function(){
  console.log(memory.history);
});

  // Row 1 ---> Buttons Working! ---> Revised
document.getElementById('percent').addEventListener('click', function(){
	higherOperation('/100');
});
document.getElementById('squareroot').addEventListener('click', function(){
	higherOperation('Math.sqrt');
});
document.getElementById('power').addEventListener('click', function(){
	higherOperation('**2');
});
document.getElementById('reciprocal').addEventListener('click', function(){
	higherOperation('1/');
});

  // Row 2 ---> Buttons Working! ---> Revised
document.getElementById('clear-entry').addEventListener('click', function(){
  clearDisplay();
});
document.getElementById('clear-all').addEventListener('click', function(){
  clearData();
	console.log(data);
	clearMemory();
	console.log(memory);
	clearDisplay();
	clearSecondaryDisplay();
});
document.getElementById('delete-last').addEventListener('click', function(){
  var input = document.getElementById('display').innerHTML;
	clearDisplay();
	displayValue(input.slice(0, -1));
});
document.getElementById('divide').addEventListener('click', function(){
  basicOperation('/');
});

  // Row 3 ---> Buttons Working! ---> Revised
document.getElementById('btn-7').addEventListener('click', function(){
	numberButton(this.innerHTML);
});
document.getElementById('btn-8').addEventListener('click', function(){
	numberButton(this.innerHTML);
});
document.getElementById('btn-9').addEventListener('click', function(){
	numberButton(this.innerHTML);
});
document.getElementById('multiply').addEventListener('click', function(){
  basicOperation('*');
});

  // Row 4 ---> Buttons Working! ---> Revised
document.getElementById('btn-4').addEventListener('click', function(){
	numberButton(this.innerHTML);
});
document.getElementById('btn-5').addEventListener('click', function(){
	numberButton(this.innerHTML);
});
document.getElementById('btn-6').addEventListener('click', function(){
	numberButton(this.innerHTML);
});
document.getElementById('minus').addEventListener('click', function(){
	basicOperation('-');
});

  // Row 5 ---> Buttons Working! ---> Revised
document.getElementById('btn-1').addEventListener('click', function(){
	numberButton(this.innerHTML);
});
document.getElementById('btn-2').addEventListener('click', function(){
  numberButton(this.innerHTML);
});
document.getElementById('btn-3').addEventListener('click', function(){
  numberButton(this.innerHTML);
});
document.getElementById('add').addEventListener('click', function(){
	basicOperation('+');
});

  // Row 6 ---> Buttons Working! ---> Revised
document.getElementById('plus-minus').addEventListener('click', function(){
	higherOperation('0-');
});
document.getElementById('btn-0').addEventListener('click', function(){
	numberButton(this.innerHTML);
});
document.getElementById('decimal').addEventListener('click', function(){
	var val = document.getElementById('display').innerHTML;
	if (!val.includes('.')) {
		displayValue(this.innerHTML);
	};
});
document.getElementById('evaluate').addEventListener('click', function(){
	basicOperation('=');
});
