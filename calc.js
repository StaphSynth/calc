var calcApp = angular.module('calc-app', []);

calcApp.controller('calc-controller', function($scope){
  //globals
  $scope.operand1 = '0';
  $scope.operand2 = '0';
  $scope.postOpInput = false;
  $scope.minus = false;
  $scope.decPoint = false;
  $scope.operator = '';
  $scope.buttons = [
    [':)',':D','±','C'],
    ['7','8','9','+'],
    ['4','5','6','-'],
    ['1','2','3','/'],
    ['.','0','=','*']
  ];

  //provides the value to be displayed.
  $scope.display = function() {
    var display;
    if($scope.operand1 != '0' && $scope.operand2 != '0') {
      display = $scope.operand1;
    } else if($scope.operand1 === '0' && $scope.operand2 != '0'){
      display = $scope.operand2;
    } else {
      display = $scope.operand1;
    }

    //format the strings for output
    if(display.length > 9) {
      var op1 = parseFloat(display);
      op1 = op1.toExponential(2);
      display = op1.toString();
    }


    return display;
  };

  //sets up operator conditions when operator selected
  $scope.operation = function(operator) {
    $scope.operator = operator;
    $scope.operand2 = $scope.operand1;
    $scope.operand1 = '0'
    $scope.decPoint = false;
    $scope.minus = false;
  }; //operation

  //call to reset the calc. Pass true if you also want to reset the display, else pass false
  $scope.reset = function(display) {
    if(display)
      $scope.operand1 = '0';

    $scope.operator = '';
    $scope.operand2 = '0';
    $scope.minus = false;
    $scope.decPoint = false;
  }

  $scope.negNum = function() {
    if(!$scope.minus) { //add the - sign. No -ve zero
      if($scope.operand1 !== '0') {
        $scope.operand1 = '-' + $scope.operand1;
        $scope.minus = true;
      }
    } else { //remove the - sign
      $scope.operand1 = $scope.operand1.substring(1);
      $scope.minus = false;
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
      case '*':
        op1 *= op2;
        break;
      case '/':
        if(op1 === 0) { //divide by zero error
          $scope.operand1 = 'Error';
          $scope.reset(false);
          return;
        } else {
          op1 = op2 / op1;
        }
        break;
    }

    $scope.operand1 = op1.toString();
    $scope.reset(false);
  }; //resolve

  //called when the user pushes a button on the calc
  $scope.push = function(value) {
    //is value a number?
    if(!isNaN(parseFloat(value)) || value === '.') {
      if($scope.operand1 === '0' && value != '.')
        $scope.operand1 = value;
      else
        $scope.operand1 = $scope.operand1.concat(value);
    } else { //if value is an operation, do maths logic
      if((value === '+') || (value === '-') || (value === '*') || (value === '/')) {
        $scope.operation(value);
      }
      //special cases
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
          break;
        case ':D':
          $scope.operand1 = '5318008';
          break;
      }
    }
  }; //push


}); //controller
