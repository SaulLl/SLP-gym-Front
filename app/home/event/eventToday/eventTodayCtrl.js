
'use strict';

event.controller('eventTodayCtrl', ['$location','$http','$cookies','getEventsTodayServive',"NgTableParams",
function($location,$http,$cookies,getEventsTodayServive,NgTableParams){

    //Declaro la variable vm con el valor this para que haga referencia al controlador
    var vm = this;

    vm.events  = {};



   // vm.date = moment().format('LL')

    vm.getDay = function (date) {
        return moment(date).locale('es').format('Do [de] MMMM [de] YYYY');
    };

    vm.getHour = function (date) {
        return moment(date).locale('es').format('HH:mm:ss');
    };

    getEventsTodayServive.query({},function (data){
        vm.events = data.eventsresult;
        console.log(vm.events);
        vm.tableParams = new NgTableParams({}, { dataset:vm.events});
    });

    vm.attend = function (event) {
        $http({
            method: 'post',
            url: 'http://localhost:3000/api/inscription',
            headers: {'Content-Type': 'application/json'},
            dataType : "json",
            data: {'ins_event':event,'ins_user':'590546b879c47c3728f5ed8b'}
        }).then(function successCallback(response) {
            console.log('inscrito satisfatoriamente')
        }, function errorCallback(error) {
            console.log('no inscrito'+error);
        });
    };

     /*vm.openDetail = function (selectedactivity) {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'eventActivity.html',
            controller: 'eventActivityCtrl',
            controllerAs: 'modAct',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                selectedEval: function () {
                    return selectedactivity;
                }
            }
        });
    };*/



}]);


/*
event.controller('eventActivityCtrl', ['$uibModalInstance', 'selectedEval',
    function($uibModalInstance,selectedEval){

    }

]);*/
