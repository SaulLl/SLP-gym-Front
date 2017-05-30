console.log("estoy en el archivo de modulos");
/**
 * En este archivo se declaran los modulos que se van a utilizar
 * @author Saul Llamas Parra
 */

/**
 * Modulo principal del que van a depender todos los otros modulos
 * @type {angular.Module}
 */
var  gym = angular.module("gymApp",[
    "ngRoute",
    "ngResource",
    "ngTable",
    // "ngDialog",
    "ngCookies",
    "ui.bootstrap",
    "gym.event",
    "gym.event.service",
    "gym.login"
]);



gym.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

        $routeProvider.when('/login', {
            templateUrl: 'login/login.template.html',
            controller: 'loginController',
            controllerAs:'loginctrl'
        }).when('/home',{
            templateUrl: 'home/home.template.html',
        }).otherwise('/login')
}]);



var login = angular.module("gym.login",[
    "ngRoute",
    //"ngTable",
    "ngResource",
    "ngCookies"
   //"ngDialog"
]);


