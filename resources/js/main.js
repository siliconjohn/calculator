// Objects
  // Main ['data'(object)]
var data = {
	history: [],
	equation: '',
	firstTerm: 0,
	secondTerm: 0,
	currentOperator: '',
	decimalAdded: false
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
	document.getElementById('secondary-display').innerHTML = '';
}

var clearEquation = function() {
	data.equation = '';
}

var clearMemory = function() {
	memory.history = [];
	memory.firstTerm = 0;
	memory.secondTerm = 0;
	toggleMemory(true);
}

var clearData = function() {
	data.history = [];
	data.equation = [];
	data.firstTerm = 0;
	data.secondTerm = 0;
	data.currentOperator = '';
	data.decimalAdded= false;
}

var displayValue = function(val) {
	document.getElementById('display').innerHTML += val;
};

var displayValueSecondary = function(val) {
	document.getElementById('secondary-display').innerHTML = '';
	document.getElementById('secondary-display').innerHTML += val;
};

  // Memory Specific
var memoryHistory = function(x, operator, y, e) {
	var equationString = `${x} ${operator} ${y} = ${e}`;
	memory.history.push(equationString);
}

var dataHistory = function() {};

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

// EVENT LISTENERS
  // Memory ---> Is Working!! : Memory-History still needs work!
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
		var e = eval("x + y").toString();
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
	var e = eval("x - y").toString();
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
  console.log(memory);
	console.log("Function under construction! Thank you for your Patience :-)!");
});

  // Row 1 ---> none are working : still needs work!
document.getElementById('percent').addEventListener('click', function(){

  data.firstTerm = document.getElementById('display').innerHTML;
});
document.getElementById('squareroot').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('power').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('reciprocal').addEventListener('click', function(){
  displayValue(this.innerHTML);
});

  // Row 2 ---> Clear Functions Working! : Operators Still need work!
document.getElementById('clear-entry').addEventListener('click', function(){
  clearDisplay();
});
document.getElementById('clear-all').addEventListener('click', function(){
  clearData();
	console.log(data);
	clearMemory();
	console.log(memory);
	clearDisplay();
});
document.getElementById('delete-last').addEventListener('click', function(){
  var entry = document.getElementById('display').innerHTML;
	clearDisplay();
	displayValue(entry.slice(0, -1));
});
document.getElementById('divide').addEventListener('click', function(){
  data.firstTerm = document.getElementById('display').innerHTML;
	data.currentOperator = '/';
	data.equation += `${data.firstTerm} ${data.currentOperator} `;
	data.history.push(`${data.firstTerm} ${data.currentOperator} `);
	clearDisplay();
	console.log(data);
	displayValueSecondary(data.equation);
});

  // Row 3 ---> Number Buttons Working! : Operators Still need work!
document.getElementById('btn-7').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('btn-8').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('btn-9').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('multiply').addEventListener('click', function(){
	data.firstTerm = document.getElementById('display').innerHTML;
	data.currentOperator = '*';
	data.equation += `${data.firstTerm} ${data.currentOperator} `;
	data.history.push(`${data.firstTerm} ${data.currentOperator} `);
	clearDisplay();
	console.log(data);
	displayValueSecondary(data.equation);
});

  // Row 4 ---> Number Buttons Working! : Operators Still need work!
document.getElementById('btn-4').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('btn-5').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('btn-6').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('minus').addEventListener('click', function(){
	data.firstTerm = document.getElementById('display').innerHTML;
	data.currentOperator = '-';
	data.equation += `${data.firstTerm} ${data.currentOperator} `;
	data.history.push(`${data.firstTerm} ${data.currentOperator} `);
	clearDisplay();
	console.log(data);
	displayValueSecondary(data.equation);
});

  // Row 5 ---> Number Buttons Working! : Operators Still need work!
document.getElementById('btn-1').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('btn-2').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('btn-3').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('add').addEventListener('click', function(){
	data.firstTerm = document.getElementById('display').innerHTML;
	data.currentOperator = '+';
	data.equation += `${data.firstTerm} ${data.currentOperator} `;
	data.history.push(`${data.firstTerm} ${data.currentOperator} `);
	clearDisplay();
	console.log(data);
	displayValueSecondary(data.equation);
});

  // Row 6
document.getElementById('plus-minus').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('btn-0').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('decimal').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('evaluate').addEventListener('click', function(){
	data.firstTerm = document.getElementById('display').innerHTML;
	data.currentOperator = '=';
	data.equation += `${data.firstTerm} `;
	data.history.push(`${data.firstTerm} ${data.currentOperator} `);
	var e = eval(data.equation)
	clearDisplay();
	displayValue(e);
	data.equation = '';
});
