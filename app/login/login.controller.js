
'use strict';

    login.controller('loginController', ['$location','$http','$cookies','$window'
        ,function($location,$http,$cookies,$window) {

        var vm = this;

        var usserdata = [];

        vm.loginuser="";

        vm.password="";

       if($cookies.get('user')){
           $location.path('/home');
       }else {
           $location.path('/login');
       }



        vm.logaccess = function () {
            vm.passwordSHA = sha256(vm.password);
            console.log(vm.loginuser);
            console.log(vm.passwordSHA);

            usserdata['loginuser']=vm.loginuser;
            usserdata['password']=vm.passwordSHA;


            $http({
                 method: 'post',
                 url: 'http://localhost:3000/api/signin',
                headers: {'Content-Type': 'application/json'},
                dataType : "json",
                 data: {'user_loginName':vm.loginuser}
                 }).then(function successCallback(response) {
                    console.log(response.data.user);
                    $location.path('/home');
                    $cookies.put('user',response.data.user._id);
                 }, function errorCallback(error) {
                    console.log(error.data.message);
             });
         };











    }]);