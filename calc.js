var calcApp = angular.module('calc-app', []);

calcApp.controller('calc-controller', function($scope){
  $scope.display = 0;
  $scope.operand = 0;
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
  }; //operation

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

    $scope.operator = '';
    $scope.operand = 0;
  }; //resolve

  //called when the user pushes a button on the calc
  $scope.push = function(value) {
    //is value a number?
    if(!isNaN(parseFloat(value))) {
      $scope.display = ($scope.display * 10) + value;
    } else { //if value is an operation, do maths logic
      if((value === '+') || (value === '-') || (value === '*') || (value === '/')) {
        $scope.operation(value);
      } else if(value === '=') {
        $scope.resolve()
      }
    }
  }; //push


}); //controller
