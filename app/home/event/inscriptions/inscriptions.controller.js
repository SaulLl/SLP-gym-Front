/**
 * Created by Saul on 20/05/2017.
 */

'use strict';

event.controller('inscriptionsCtrl', ['$location','$http','$cookies','getInscriptions',"NgTableParams",
    function($location,$http,$cookies,getInscriptions,NgTableParams) {

        //Declaro la variable vm con el valor this para que haga referencia al controlador
        var vm = this;

        vm.inscriptions = {};


        // vm.date = moment().format('LL')

        getInscriptions.get({}, function (data) {
            vm.inscriptions = data.inscriptionresult;
            console.log(vm.inscriptions);
            vm.tableParams = new NgTableParams({}, {dataset: vm.inscriptions});
    });

}]);