(function () {
  angular
    .module('brastlewark')
    .config(['$routeProvider', routerConfig]);

  function routerConfig ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/template/citizens.html',
        controller: 'CitizensController',
        controllerAs: 'vm'
      })
      .otherwise('/')
  }
})();
