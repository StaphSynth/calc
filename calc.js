var calcApp = angular.module('calc-app', []);

calcApp.controller('calc-controller', function($scope){
  //globals
  $scope.display = 0;
  $scope.operand = 0;
  $scope.decPoint = false;
  $scope.postDecPresses = 0;
  $scope.operator = '';
  $scope.buttons = [
    [7,8,9,'+'],
    [4,5,6,'-'],
    [1,2,3,'/'],
    ['.',0,'=','*']
  ];
  //sets up operator conditions when operator selected
  $scope.operation = function(operator) {
    $scope.operator = operator;
    $scope.operand = $scope.display;
    $scope.display = 0;
    $scope.decPoint = false;
    $scope.postDecPresses = 0;
  }; //operation

  //resolves the equation
  $scope.resolve = function() {
    if($scope.operator === '')
      return
    else if($scope.operator === '+')
      $scope.display += $scope.operand;
    else if ($scope.operator === '-')
      $scope.display = $scope.operand - $scope.display;
    else if($scope.operator === '*')
      $scope.display *= $scope.operand;
    else if($scope.operator === '/')
        $scope.display = $scope.operand / $scope.display;
    //reset globals and flags after resolution
    $scope.operator = '';
    $scope.operand = 0;
    $scope.decPoint = false;
    $scope.postDecPresses = 0;
  }; //resolve

  //called when the user pushes a button on the calc
  $scope.push = function(value) {
    //is value a number?
    if(!isNaN(parseFloat(value))) {
      if($scope.decPoint === false) {
        $scope.display = ($scope.display * 10) + value;
      } else { //if decimal point pressed
        $scope.postDecPresses++;
        $scope.display += value * Math.pow(10, ($scope.postDecPresses * -1));
      }
    } else { //if value is an operation, do maths logic
      if((value === '+') || (value === '-') || (value === '*') || (value === '/')) {
        $scope.operation(value);
      //special cases
      } else if(value === '=') {
        $scope.resolve()
      } else if(value === '.') {
        $scope.decPoint = true;
      }
    }
  }; //push


}); //controller
