var data = {
  keys: document.getElementById('keyboard').getElementsByTagName('button'),
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
}

for (var i = 0; i < data.keys.length; i++ ){
  data.keys[i].onclick = function(){
    var btnValue = this.innerHTML;
    var numbers = ['0','1','2','3','4','5','6','7','8','9']

    if (btnValue === '&#9776;' ) {
      console.log('Under Construction!');

    } else if (btnValue === 'Hv') {
      console.log(data.history);

    } else if (numbers.includes(btnVal)) {
      data.numberButton(this.innerHTML);

    } else if (btnValue === 'MC') {
      memory.clearMemory();
    	data.clearDisplay();
    	console.log(memory);

    } else if (btnValue === 'MR') {
      document.getElementById('display').innerHTML = memory.firstTerm;

    } else if (btnValue === 'M+') {
      memory.memoryMath('+');
    	data.clearDisplay();
    	console.log(memory);

    } else if (btnValue === 'M-') {
      memory.memoryMath('-');
    	data.clearDisplay();
    	console.log(memory);

    } else if (btnValue === 'MS') {
      memory.memoryHistory();
      memory.toggleMemory(false);
    	data.clearDisplay();
    	console.log(memory);

    } else if (btnValue === 'Mv') {
      console.log(memory.history);

    } else if (btnValue === '%') {
      data.higherOperation('/100');

    } else if (btnValue === '&radic;') {
      data.higherOperation('Math.sqrt');

    } else if (btnValue === 'x&sup2;') {
      data.higherOperation('**2');

    } else if (btnValue === '1/x') {
      data.higherOperation('1/');

    } else if (btnValue === 'CE') {
      data.clearDisplay();

    } else if (btnValue === 'C') {
      data.clearData();
    	console.log(data);
    	memory.clearMemory();
    	console.log(memory);
    	data.clearDisplay();
    	data.clearSecondaryDisplay();

    } else if (btnValue === '&#9746;') {
      var input = document.getElementById('display').innerHTML;
    	data.clearDisplay();
    	data.displayValue(input.slice(0, -1));

    } else if (btnValue === '&divide;') {
      data.basicOperation('/');

    } else if (btnValue === '&times;') {
      data.basicOperation('*');

    } else if (btnValue === '&minus;') {
      data.basicOperation('-');

    } else if (btnValue === '&plus;') {
      data.basicOperation('+');

    } else if (btnValue === '=') {
      data.basicOperation('=');

    } else if (btnValue === '.') {
      var val = document.getElementById('display').innerHTML;
    	if (!val.includes('.')) {
    		data.displayValue(this.innerHTML);
    	};

    } else if (btnValue === '&plusmn;') {
      data.higherOperation('0-');
  };
}
