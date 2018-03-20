// Objects
  // Main ['data'(object)]
var data = {
	history: [],
	equation: '',
	firstTerm: 0,
	secondTerm: 0,
	currentOperator: '',
};
  // ['memory'(object)]
var memory = {
	history: [],
	firstTerm: 0,
	secondTerm: 0,
	notInUse: true,
	specialButtons: document.getElementsByClassName('not-in-use')
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
	}
};

var displayValueSecondary = function(val) {
	document.getElementById('secondary-display').innerHTML = '';
	document.getElementById('secondary-display').innerHTML += val;
};

var dataHistory = function() {

};

  // Memory Specific
var clearMemory = function() {
	memory.history = [];
	memory.firstTerm = 0;
	memory.secondTerm = 0;
	toggleMemory(true);
}

var memoryHistory = function(x, operator, y, e) {
	var equationString = `${x} ${operator} ${y} = ${e}`;
	memory.history.push(equationString);
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

// EVENT LISTENERS (29/32) Buttons Working!!
  //Menu/History Buttons Working!! (somewhat?!?)
document.getElementById('menu').addEventListener('click', function(){
		console.log('Under Construction!');
});
document.getElementById('history').addEventListener('click', function(){
	console.log(data.history);
});

  // Memory ---> Buttons Working!
document.getElementById('memory-clear').addEventListener('click', function(){
  clearMemory();
	clearDisplay();
	console.log(memory);
});
document.getElementById('memory-recall').addEventListener('click', function(){
  document.getElementById('display').innerHTML = memory.firstTerm;
});
document.getElementById('memory-add').addEventListener('click', function(){
  if (memory.notInUse) {
		memory.firstTerm = document.getElementById('display').innerHTML;
		memory.history.push(memory.firstTerm);
	} else {
		memory.secondTerm = document.getElementById('display').innerHTML;
		var x = parseInt(memory.firstTerm);
		var y = parseInt(memory.secondTerm);
		var e = parseFloat(eval("x + y").toFixed(9)).toString();
		memoryHistory(memory.firstTerm, '+', memory.secondTerm, e);
		memory.firstTerm = e;
	}
	toggleMemory(false);
	console.log(memory);
	clearDisplay();
});
document.getElementById('memory-subtract').addEventListener('click', function(){
	memory.secondTerm = document.getElementById('display').innerHTML;
	var x = parseInt(memory.firstTerm);
	var y = parseInt(memory.secondTerm);
	var e = parseFloat(eval("x - y").toFixed(9)).toString();
	memoryHistory(memory.firstTerm, '-', memory.secondTerm, e);
	memory.firstTerm = e;
	toggleMemory(false);
	console.log(memory);
	clearDisplay();
});
document.getElementById('memory-store').addEventListener('click', function(){
	memory.firstTerm = document.getElementById('display').innerHTML;
	memory.history.push(memory.firstTerm);
  toggleMemory(false);
	console.log(memory);
	clearDisplay();
});
document.getElementById('memory-history').addEventListener('click', function(){
  console.log(memory.history);
});

  // Row 1 ---> Buttons Working!
document.getElementById('percent').addEventListener('click', function(){
	var val = document.getElementById('display').innerHTML;
	if (data.firstTerm) {
		if (val === ''){
			var x = data.firstTerm;
			var percentOfX = parseFloat((x /100).toFixed(9));
			var xPercentOfX = parseFloat((x * percentOfX).toFixed(9)).toString();
			document.getElementById('display').innerHTML = xPercentOfX;
		} else {
			var y = document.getElementById('display').innerHTML;
			var percentOfY = parseFloat((y /100).toFixed(9));
			var YPercentOfFirstTerm = parseFloat((data.firstTerm * percentOfY).toFixed(9)).toString();
			document.getElementById('display').innerHTML = YPercentOfFirstTerm;
		}
	}
});
document.getElementById('squareroot').addEventListener('click', function(){
	var val = document.getElementById('display').innerHTML;
	if (data.firstTerm) {
		if (val === ''){
			var x = data.firstTerm;
			var rootOfX = parseFloat(Math.sqrt(x).toFixed(9)).toString();
			if (x < 0) {
				document.getElementById('display').innerHTML = 'Error!';
			} else {
				document.getElementById('display').innerHTML = rootOfX;
			}
		} else {
			var y = document.getElementById('display').innerHTML;
			var rootOfY = parseFloat(Math.sqrt(y).toFixed(9)).toString();
			if (y < 0) {
				document.getElementById('display').innerHTML = 'Error!';
			} else {
				document.getElementById('display').innerHTML = rootOfY;
			}
		}
	} else {
		var z = document.getElementById('display').innerHTML;
		var rootOfZ = parseFloat(Math.sqrt(z).toFixed(9)).toString();
		if (z < 0) {
			document.getElementById('display').innerHTML = 'Error!';
		} else {
			data.currentOperator = '=';
			document.getElementById('display').innerHTML = rootOfZ;
		}
	}
});
document.getElementById('power').addEventListener('click', function(){
	var val = document.getElementById('display').innerHTML;
	if (val === ''){
		var x = data.firstTerm;
		var xSquared = parseFloat((x ** 2).toFixed(9)).toString();
		document.getElementById('display').innerHTML = xSquared;
	} else {
		var y = document.getElementById('display').innerHTML;
		var ySquared = parseFloat((y ** 2).toFixed(9)).toString();
		document.getElementById('display').innerHTML = ySquared;
	}
});
document.getElementById('reciprocal').addEventListener('click', function(){
	var val = document.getElementById('display').innerHTML;
	if (val === ''){
		var x = data.firstTerm;
		var reciprocalOfX = parseFloat((1 / x).toFixed(9)).toString();
		document.getElementById('display').innerHTML = reciprocalOfX;
	} else {
		var y = document.getElementById('display').innerHTML;
		var reciprocalOfY = parseFloat((1 / y).toFixed(9)).toString();
		document.getElementById('display').innerHTML = reciprocalOfY;
	}
});

  // Row 2 ---> Buttons Working!
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
  var entry = document.getElementById('display').innerHTML;
	clearDisplay();
	displayValue(entry.slice(0, -1));
});
document.getElementById('divide').addEventListener('click', function(){
  var val = document.getElementById('display').innerHTML;
	if (val !== ''){
		data.firstTerm = document.getElementById('display').innerHTML;
		data.currentOperator = '/';
		data.equation += `${data.firstTerm} ${data.currentOperator} `;
		data.history.push(`${data.firstTerm} ${data.currentOperator} `);
		clearDisplay();
		console.log(data);
		displayValueSecondary(data.equation);
	};
});

  // Row 3 ---> Buttons Working!
document.getElementById('btn-7').addEventListener('click', function(){
	if (data.currentOperator === '=') {
		clearDisplay();
		data.currentOperator = '';
		displayValue(this.innerHTML);
	} else {
		displayValue(this.innerHTML);
	};
});
document.getElementById('btn-8').addEventListener('click', function(){
	if (data.currentOperator === '=') {
		clearDisplay();
		data.currentOperator = '';
		displayValue(this.innerHTML);
	} else {
		displayValue(this.innerHTML);
	};
});
document.getElementById('btn-9').addEventListener('click', function(){
	if (data.currentOperator === '=') {
		clearDisplay();
		data.currentOperator = '';
		displayValue(this.innerHTML);
	} else {
		displayValue(this.innerHTML);
	};
});
document.getElementById('multiply').addEventListener('click', function(){
	var val = document.getElementById('display').innerHTML;
	if (val !== ''){
		data.firstTerm = document.getElementById('display').innerHTML;
		data.currentOperator = '*';
		data.equation += `${data.firstTerm} ${data.currentOperator} `;
		data.history.push(`${data.firstTerm} ${data.currentOperator} `);
		clearDisplay();
		console.log(data);
		displayValueSecondary(data.equation);
	};
});

  // Row 4 ---> Buttons Working!
document.getElementById('btn-4').addEventListener('click', function(){
	if (data.currentOperator === '=') {
		clearDisplay();
		data.currentOperator = '';
		displayValue(this.innerHTML);
	} else {
		displayValue(this.innerHTML);
	};
});
document.getElementById('btn-5').addEventListener('click', function(){
	if (data.currentOperator === '=') {
		clearDisplay();
		data.currentOperator = '';
		displayValue(this.innerHTML);
	} else {
		displayValue(this.innerHTML);
	};
});
document.getElementById('btn-6').addEventListener('click', function(){
	if (data.currentOperator === '=') {
		clearDisplay();
		data.currentOperator = '';
		displayValue(this.innerHTML);
	} else {
		displayValue(this.innerHTML);
	};
});
document.getElementById('minus').addEventListener('click', function(){
	var val = document.getElementById('display').innerHTML;
	if (val !== ''){
		data.firstTerm = document.getElementById('display').innerHTML;
		data.currentOperator = '-';
		data.equation += `${data.firstTerm} ${data.currentOperator} `;
		data.history.push(`${data.firstTerm} ${data.currentOperator} `);
		clearDisplay();
		console.log(data);
		displayValueSecondary(data.equation);
	};
});

  // Row 5 ---> Buttons Working!
document.getElementById('btn-1').addEventListener('click', function(){
	if (data.currentOperator === '=') {
		clearDisplay();
		data.currentOperator = '';
		displayValue(this.innerHTML);
	} else {
		displayValue(this.innerHTML);
	};
});
document.getElementById('btn-2').addEventListener('click', function(){
  if (data.currentOperator === '=') {
		clearDisplay();
		data.currentOperator = '';
		displayValue(this.innerHTML);
	} else {
		displayValue(this.innerHTML);
	};
});
document.getElementById('btn-3').addEventListener('click', function(){
  if (data.currentOperator === '=') {
			clearDisplay();
			data.currentOperator = 0;
			displayValue(this.innerHTML);
	} else {
			displayValue(this.innerHTML);
  };
});
document.getElementById('add').addEventListener('click', function(){
	var val = document.getElementById('display').innerHTML;
	if (val !== ''){
		data.firstTerm = document.getElementById('display').innerHTML;
		data.currentOperator = '+';
		data.equation += `${data.firstTerm} ${data.currentOperator} `;
		data.history.push(`${data.firstTerm} ${data.currentOperator} `);
		clearDisplay();
		console.log(data);
		displayValueSecondary(data.equation);
	};
});

  // Row 6 ---> Buttons Working!
document.getElementById('plus-minus').addEventListener('click', function(){
	var val = document.getElementById('display').innerHTML;
	if (val === ''){
		var x = data.firstTerm;
		var negateX = parseFloat((0 - x).toFixed(9)).toString();
		document.getElementById('display').innerHTML = negateX;
	} else {
		var y = document.getElementById('display').innerHTML;
		var negateY = parseFloat((0 - y).toFixed(9)).toString();
		document.getElementById('display').innerHTML = negateY;
	}
});
document.getElementById('btn-0').addEventListener('click', function(){
	if (data.currentOperator === '=') {
		clearDisplay();
		data.currentOperator = 0;
		displayValue(this.innerHTML);
	} else {
		displayValue(this.innerHTML);
	};
});
document.getElementById('decimal').addEventListener('click', function(){
	var val = document.getElementById('display').innerHTML;
	if (!val.includes('.')) {
		displayValue(this.innerHTML);
	};
});
document.getElementById('evaluate').addEventListener('click', function(){
	data.firstTerm = document.getElementById('display').innerHTML;
	data.currentOperator = '=';
	data.equation += `${data.firstTerm}`;
	data.history.push(`${data.firstTerm} ${data.currentOperator} `);
	var e = parseFloat(eval(data.equation).toFixed(9)).toString();
	clearDisplay();
	displayValue(e);
	clearSecondaryDisplay();
	data.history.push(`${data.equation} = ${e}`);
	data.equation = '';
});
