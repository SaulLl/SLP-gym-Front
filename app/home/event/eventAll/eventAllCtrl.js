/**
 * Created by Saul on 12/05/2017.
 */

'use strict';

event.controller('eventAllCtrl', ['$location','$http','$cookies','getEventsAllServive',"NgTableParams",'$uibModal',
    function($location,$http,$cookies,getEventsAllServive,NgTableParams,$uibModal){

        //Declaro la variable vm con el valor this para que haga referencia al controlador
        var vm = this;
        vm.event = {};


        vm.getDay = function (date) {
            return moment(date).locale('es').format('L');
        };



        vm.getHour = function (date) {
            return moment('2017-05-29T19:00:00.000').format('HH:mm');
        };



        getEventsAllServive.query({},function (data){
            vm.events = data.eventsresult;

            for(var i = 0;i < data.eventsresult.length;i ++){
                vm.events[i].evt_activityfilter = vm.events[i].evt_activity.act_name ;
                vm.events[i].evt_datefilter = vm.getDay(vm.events[i].evt_date);
                vm.events[i].evt_hourfilter = vm.getHour(vm.events[i].evt_date);
                vm.events[i].evt_attend = false;
                if(vm.events[i].evt_users.indexOf("590546b879c47c3728f5ed8b") >= 0 ){
                    vm.events[i].evt_attend = true;
                }
            }

            vm.tableParams = new NgTableParams({}, { dataset:vm.events});
        });
1
         vm.attend = function (event) {
             $http({
                 method: 'put',
                 url: 'http://localhost:3000/api/event/attend/'+event._id,
                 headers: {'Content-Type': 'application/json'},
                 dataType : "json",
                 data: {'evt_users':'590546b879c47c3728f5ed8b'}
             }).then(function successCallback(response) {
                console.log('inscrito satisfatoriamente');
                 for(var i = 0;i < vm.events.length;i ++){
                     let id = vm.events[i]._id ;
                     let id2 = event._id;
                     if(id == id2){
                         console.log(vm.events[i]._id);
                         console.log(vm.events[i]._id+" = "+ event._id);
                         vm.events[i].evt_attend = true;
                     }
                 }
             }, function errorCallback(error) {
                 console.log('no inscrito'+error);
             });
         };

        vm.noAttend = function (event) {
            $http({
                method: 'put',
                url: 'http://localhost:3000/api/event/noattend/'+event._id,
                headers: {'Content-Type': 'application/json'},
                dataType : "json",
                data: {'evt_users':'590546b879c47c3728f5ed8b'}
            }).then(function successCallback(response) {
                console.log('desapundado satisfatoriamente');
                for(var i = 0;i < vm.events.length;i ++){
                    let id = vm.events[i]._id ;
                    let id2 = event._id;
                    if(id == id2){
                        console.log(vm.events[i]._id);
                        console.log(vm.events[i]._id+" = "+ event._id);
                        vm.events[i].evt_attend = false;
                    }
                }
            }, function errorCallback(error) {
                console.log('no desapuntado'+error);
            });
        };

        vm.openDetail = function (selectedactivity) {
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
                    selectedactivity: function () {
                        return selectedactivity;
                    }
                }
            });
        };


    }
]);

event.controller('eventActivityCtrl', ['$uibModal', 'selectedactivity',
    function($uibModal,selectedactivity){
        var vm = this
        vm.activity = selectedactivity;
        vm.modalclose = function () {
            $uibModal.closed();
        }
    }



]);