var data = {
  numbers: ['0','1','2','3','4','5','6','7','8','9'],
  keys: document.getElementById('keyboard').getElementsByTagName('button'),
	history: [],
	equation: '',
	firstTerm: 0,
	currentOperator: '',
  numberButton: function(val){
    var input = val;
  	if (data.currentOperator === '=') {
  		data.clearDisplay();
  		data.currentOperator = '';
  		data.displayValue(input);
  	} else {
  		data.displayValue(input);
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
  		data.displayValueSecondary(data.equation);
  		data.clearDisplay();
  	};
  	if (operator === '=') {
  		var e = parseFloat(eval(data.equation).toFixed(9)).toString();
  		if (e.length > 11) {
  			e = e.substring(0,11);
  		};
  		data.displayValue(e);
  		data.history.push(`${data.equation}= ${e}`);
  		data.equation = '';
  		data.clearSecondaryDisplay();
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
};

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
  	memory.memoryHistory(memory.firstTerm, '+', memory.secondTerm, e);
  	memory.firstTerm = e;
  	memory.toggleMemory(false);
  },
  clearMemory: function(){
    memory.history = [];
  	memory.firstTerm = 0;
  	memory.secondTerm = 0;
  	memory.toggleMemory(true);
  },
}

document.getElementById('menu').addEventListener('click', function(){
	console.log('Under Construction!');
});

document.getElementById('history').addEventListener('click', function(){
	console.log(data.history);
});

for (var i = 0; i < data.keys.length; i++ ){
  data.keys[i].onclick = function(e){
    var btnValue = this.innerHTML;

    if (data.numbers.includes(btnValue)) {
      data.numberButton(this.innerHTML);
    }

    switch (btnValue) {
      case 'MC':
        memory.clearMemory();
        data.clearDisplay();
        break;
      case 'MR':
        document.getElementById('display').innerHTML = memory.firstTerm;
        break;
      case 'M+':
        memory.memoryMath('+');
        data.clearDisplay();
        break;
      case 'M-':
        memory.memoryMath('-');
        data.clearDisplay();
        break;
      case 'MS':
        memory.memoryHistory();
        memory.toggleMemory(false);
        data.clearDisplay();
        break;
      case 'Mv':
        console.log(memory.history);
        break;
      case '%':
        data.higherOperation('/100');
        break;
      case '-/':
        data.higherOperation('Math.sqrt');
        break;
      case 'x^2':
        data.higherOperation('**2');
        break;
      case '1/x':
        data.higherOperation('1/');
        break;
      case 'CE':
        data.clearDisplay();
        break;
      case 'C':
        data.clearData();
        memory.clearMemory();
        data.clearDisplay();
        data.clearSecondaryDisplay();
        break;
      case 'BS':
        var input = document.getElementById('display').innerHTML;
        data.clearDisplay();
        data.displayValue(input.slice(0, -1));
        break;
      case '/':
        data.basicOperation('/');
        break;
      case '*':
        data.basicOperation('*');
        break;
      case '-':
        data.basicOperation('-');
        break;
      case '+':
        data.basicOperation('+');
        break;
      case '=':
        data.basicOperation('=');
        break;
      case '.':
        var val = document.getElementById('display').innerHTML;
        if (!val.includes('.')) {
          data.displayValue(this.innerHTML);
        };
        break;
      case '+/-':
        data.higherOperation('0-');
        break;
    }
    e.preventDefault();
  };
}
