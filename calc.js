var calcApp = angular.module('calc-app', []);

calcApp.controller('calc-controller', function($scope){
  //globals
  $scope.display = 0;
  $scope.operand = 0;
  $scope.decPoint = false;
  $scope.postDecPresses = 0;
  $scope.operator = '';
  $scope.buttons = [
    [':)',';)',':D','C'],
    [7,8,9,'+'],
    [4,5,6,'-'],
    [1,2,3,'/'],
    ['.',0,'=','*']
  ];

  //provides the value to be displayed.
  //Only req'd to implement sci-notation for large numbers
  //to stop the display <td> exceeding the calc width
  $scope.theDisplay = function(){
    if($scope.display > 1000000000){
      $scope.display = $scope.display.toExponential(2);
      return $scope.display;
    }
    //small number with a lot of decimal places?
    var tempString = $scope.display.toString();
    if(tempString.length > 9){
      $scope.display = $scope.display.toFixed(9);
    }
    return $scope.display;
  };

  //sets up operator conditions when operator selected
  $scope.operation = function(operator) {
    $scope.operator = operator;
    $scope.operand = $scope.display;
    $scope.display = 0;
    $scope.decPoint = false;
    $scope.postDecPresses = 0;
  }; //operation

  //call to reset the calc. Pass true if you also want to reset the display, else pass false
  $scope.reset = function(display) {
    if(display)
      $scope.display = 0;

    $scope.operator = '';
    $scope.operand = 0;
    $scope.decPoint = false;
    $scope.postDecPresses = 0;
  }

  //resolves the equation
  $scope.resolve = function() {
    switch($scope.operator) {
      case '':
        return;
      case '+':
        $scope.display += $scope.operand;
        break;
      case '-':
        $scope.display = $scope.operand - $scope.display;
        break;
      case '*':
        $scope.display *= $scope.operand;
        break;
      case '/':
        $scope.display = $scope.operand / $scope.display;
        break;
    }
    //reset globals and flags after resolution
    $scope.reset(false);
  }; //resolve

  //called when the user pushes a button on the calc
  $scope.push = function(value) {
    //is value a number?
    if(!isNaN(parseFloat(value))) {
      if($scope.decPoint === false) {
        if(($scope.display === 0) && ($scope.operator === '-') && ($scope.operand === 0)) {
          $scope.display = (($scope.display * 10) + value) * -1;
          $scope.operator = '';
        } else {
          $scope.display = ($scope.display * 10) + value;
        }
      } else { //if decimal point pressed
        $scope.postDecPresses++;
        $scope.display += value * Math.pow(10, ($scope.postDecPresses * -1));
      }
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
        case ';)':
          $scope.display = 7734;
          break;
        case ':)':
          $scope.display = 71077345;
          break;
        case ':D':
          $scope.display = 5318008;
          break;
      }
    }
  }; //push


}); //controller
