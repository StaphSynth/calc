/******************************************
Very basic four-banger AngularJS calc app
by David Allen 2017-02-13
https://github.com/StaphSynth/calc
*******************************************/

var calcApp = angular.module('calc-app', []);

calcApp.controller('calc-controller', function($scope){
  //global registers and flags
  $scope.limit = 8;             //limit column number of display
  $scope.operand1 = '0';        //main register
  $scope.operand2 = '0';        //secondary register
  $scope.postOpInput = false;   //controls persistence of prev value on screen
  $scope.minus = false;         //neg number flag
  $scope.justSolved = true;     //controls answer persistence
  $scope.operator = '';         //operator register
  $scope.buttons = [            //button layout "ROM"
    [':)',':D','±','C'],
    ['7','8','9','+'],
    ['4','5','6','-'],
    ['1','2','3','÷'],
    ['.','0','=','×']
  ];

  //provides the value to be displayed on screen.
  //takes the value of the register to be displayed
  //(either operand1 or operand2) and formats it
  //for display on the limited size of the calc "screen"
  $scope.display = function() {
    var display;
    //decide which register to be displayed
    if($scope.operand1 != '0' && $scope.operand2 != '0') {
      display = $scope.operand1;
    } else if($scope.operand1 === '0' && $scope.operand2 != '0' && !($scope.postOpInput)) {
      display = $scope.operand2;
    } else {
      display = $scope.operand1;
    }

    //now format the string for output
    var limit = $scope.limit; //limit the chars to be displayed
    //if the string contains a '.', it doesn't count as a char column, so limit++
    if(display.includes('.') && !(display.includes('e')) && !(display.includes('-'))) {
      limit++;
      if(display.length > limit) {
        display = display.slice(0, limit)
      }
    } else { //if no decimal point & no 'e' (ie: a really big or really small number)
      if(display.length > limit) {
        var op1 = parseFloat(display);
        op1 = op1.toExponential(2);
        display = op1.toString();
      }
    }
    return display;
  };

  //sets up operator conditions when operator selected
  $scope.operation = function(operator) {
    $scope.operator = operator;
    $scope.operand2 = $scope.operand1;
    $scope.operand1 = '0'
    $scope.minus = false;
  }; //operation

  //call to reset the calc. Pass true if you also want to reset the display, else pass false
  $scope.reset = function(display) {
    if(display) {
      $scope.operand1 = '0';
      $scope.minus = false;
    }
    $scope.operator = '';
    $scope.operand2 = '0';
    $scope.decPoint = false;
    $scope.postOpInput = false;
  }

  //alters the state of the sign of the number.
  //if the number is +ve, makes it -ve and vice versa
  $scope.negNum = function() {
    if($scope.minus) { //remove the -ve sign
      if($scope.operand1[0] === '-')
        $scope.operand1 = $scope.operand1.substring(1);
      $scope.minus = false;
    } else { //add the - sign
      if($scope.operand1 !== '0') {
        if($scope.operand1[0] !== '-')
          $scope.operand1 = '-' + $scope.operand1;
        $scope.minus = true;
      }
    }
  };

  //resolves the equation
  $scope.resolve = function() {
    var op1 = parseFloat($scope.operand1);
    var op2 = parseFloat($scope.operand2);
    switch($scope.operator) {
      case '':
        return;
      case '+':
        op1 += op2;
        break;
      case '-':
        op1 = op2 - op1;
        break;
      case '×':
        op1 *= op2;
        break;
      case '÷':
        if(op1 === 0) { //divide by zero error
          $scope.operand1 = 'Error';
          $scope.reset(false);
          return;
        } else {
          op1 = op2 / op1;
        }
        break;
    }
    //set the minus flag
    if(op1 < 0)
      $scope.minus = true;
    else
      $scope.minus = false;
    //set the other globals
    $scope.operand1 = op1.toString();
    $scope.justSolved = true;
    $scope.reset(false);
  }; //resolve

  //called when the user pushes a button on the calc
  $scope.push = function(value) {
    //is value a number?
    if(!isNaN(parseFloat(value)) || value === '.') {
      //special starting conditions/just finished solving condition
      if(($scope.operand1 === '0' && value != '.') || $scope.justSolved === true) {
        $scope.operand1 = value;
        $scope.justSolved = false;
      } else { //normal operating condition accept user input, add to number string
        $scope.operand1 = $scope.operand1.concat(value);
      }
      if($scope.operator !== '') {
        $scope.postOpInput = true;
      }
    } else { //if value is an operation, do maths logic
      if((value === '+') || (value === '-') || (value === '×') || (value === '÷')) {
        $scope.operation(value);
      }
      //special button cases
      switch(value) {
      case '=':
        $scope.resolve();
        break;
      case '.':
        $scope.decPoint = true;
        break;
      case 'C':
        $scope.reset(true);
        break;
      case '±':
        $scope.negNum();
        break;
      case ':)':
        $scope.operand1 = '71077345';
        $scope.minus = false;
        break;
      case ':D':
        $scope.operand1 = '5318008';
        $scope.minus = false;
        break;
      }
    }
  }; //push
}); //controller
