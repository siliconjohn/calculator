// Objects
  // Main ['data'(object)]
var data = {
	history: [],
	equation: '',
	firstTerm: 0,
	secondTerm: 0,
	operator: '',
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
}

var displayValue = function(val) {
	document.getElementById('display').innerHTML += val;
};

  // Memory Specific
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

// EVENT LISTENERS
  // Memory ---> Is Working!! : Memory-History still needs work!
document.getElementById('memory-clear').addEventListener('click', function(){
	memory.history = [];
	memory.firstTerm = 0;
	memory.secondTerm = 0
	toggleMemory(true);
	clearDisplay();
});
document.getElementById('memory-recall').addEventListener('click', function(){
  document.getElementById('display').innerHTML = memory.firstTerm;
});
document.getElementById('memory-add').addEventListener('click', function(){
  memory.secondTerm = document.getElementById('display').innerHTML;
	var x = parseInt(memory.firstTerm);
	var y = parseInt(memory.secondTerm);
	var e = eval("x + y").toString();
	document.getElementById('display').innerHTML = e;
	memoryHistory(memory.firstTerm, '+', memory.secondTerm, e);
	memory.firstTerm = e;
	clearDisplay();
});
document.getElementById('memory-subtract').addEventListener('click', function(){
	memory.secondTerm = document.getElementById('display').innerHTML;
	var x = parseInt(memory.firstTerm);
	var y = parseInt(memory.secondTerm);
	var e = eval("x - y").toString();
	document.getElementById('display').innerHTML = e;
	memoryHistory(memory.firstTerm, '-', memory.secondTerm, e);
	memory.firstTerm = e;
	clearDisplay();
});
document.getElementById('memory-store').addEventListener('click', function(){
	memory.firstTerm = document.getElementById('display').innerHTML;
	memory.history.push(memory.firstTerm);
  toggleMemory(false);
	clearDisplay();
});
document.getElementById('memory-history').addEventListener('click', function(){
	console.log("Function under construction! Thank you for your Patience :-)!");
});

  // Row 1
document.getElementById('percent').addEventListener('click', function(){
  displayValue(this.innerHTML);
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

  // Row 2
document.getElementById('clear-entry').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('clear-all').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('delete-last').addEventListener('click', function(){
  displayValue(this.innerHTML);
});
document.getElementById('divide').addEventListener('click', function(){
  displayValue(this.innerHTML);
});

// Row 3
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
  displayValue(this.innerHTML);
});

// Row 4
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
  displayValue(this.innerHTML);
});

// Row 5
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
  displayValue(this.innerHTML);
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
  displayValue(this.innerHTML);
});
