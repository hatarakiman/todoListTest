(function(app){
  // autoresize directive for textarea
  app.directive('autoresize', function() {
    return {
      require: 'ngModel',
      restrict: 'A, C',
      link: function (scope, element, attrs, ngModel) {

        var updateHeight = function () {
          var scrollHeight = element[0].scrollHeight;

          if (scrollHeight !== 0 ) {
            element.css('height', scrollHeight + "px");
          } else {
            element.css('height', "auto");
          }
        };

        scope.$watch(function () {
          return ngModel.$modelValue;
        }, function () {
          setTimeout(updateHeight, 0);
        });
      }
    }
  });
}(window.todoApp));
