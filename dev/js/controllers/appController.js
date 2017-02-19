(function(app){
  app.controller('appController', ['$scope', function ($scope) {
    var localStorage = {};

    $scope.currentId = 0;
    for (var i = 0; i <  window.localStorage.length; i++) {
      var TODO_REGEX = /^todo_([0-9]+)$/;
      var key =  window.localStorage.key(i);

      if (!TODO_REGEX.test(key)) {
        // remove not todoitems
        window.localStorage.removeItem(key);
      } else {
        var itemIndex = TODO_REGEX.exec(key)[1];
        $scope.currentId = Math.max($scope.currentId, itemIndex);

        // get parsed object of localStorage
        localStorage[key] = JSON.parse(window.localStorage[key]);
      }
    }
    $scope.localStorage = localStorage;

    // Add new todolist sticky
    $scope.addSticky = function() {
      var newStickyKey = 'todo_'+ ++$scope.currentId;
      localStorage[newStickyKey] = {
        status: false,
        text: ''
      };

      window.localStorage[newStickyKey] = JSON.stringify({
        status: false,
        text: ''
      });
    };

    // Update sticky text or status
    $scope.updateSticky = function(elemId, field, value) {
      localStorage[elemId][field] = value;

      window.localStorage.setItem(elemId, JSON.stringify(localStorage[elemId]))
    };

    // Delete sticky
    $scope.deleteSticky = function(elemId) {
      delete localStorage[elemId];

      window.localStorage.removeItem(elemId);
    };
  }]);
}(window.todoApp));