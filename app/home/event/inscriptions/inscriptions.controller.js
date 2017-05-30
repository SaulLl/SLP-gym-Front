/**
 * Created by Saul on 20/05/2017.
 */

'use strict';

event.controller('inscriptionsCtrl', ['$location','$http','$cookies','getInscriptions',"NgTableParams",
    function($location,$http,$cookies,getInscriptions,NgTableParams) {

        //Declaro la variable vm con el valor this para que haga referencia al controlador
        var vm = this;

        vm.myevents = {};

        vm.getDay = function (date) {
            return moment(date).locale('es').format('L');
        };



        vm.getHour = function (date) {
            return moment(date).format('HH:mm');
        };


        // vm.date = moment().format('LL')

        getInscriptions.get({}, function (data) {
            vm.myevents = data.eventsresult;
            console.log(vm.myevents);
            for(var i = 0;i < data.eventsresult.length;i ++) {
                vm.myevents[i].evt_activityfilter = vm.myevents[i].evt_activity.act_name;
                vm.myevents[i].evt_datefilter = vm.getDay(vm.myevents[i].evt_date);
                vm.myevents[i].evt_hourfilter = vm.getHour(vm.myevents[i].evt_date);
                vm.myevents[i].evt_attend = true;
            }
            vm.tableParams = new NgTableParams({}, {dataset: vm.myevents});
            console.log(vm.myevents.length);
    });

        vm.noAttend = function (event) {
            $http({
                method: 'put',
                url: 'http://localhost:3000/api/event/noattend/'+event._id,
                headers: {'Content-Type': 'application/json'},
                dataType : "json",
                data: {'evt_users':'590546b879c47c3728f5ed8b'}
            }).then(function successCallback(response) {

                for(var i = 0;i < vm.myevents.length;i ++){
                    let id = vm.myevents[i]._id ;
                    let id2 = event._id;
                    if(id == id2){
                        vm.myevents[i].evt_attend = false;
                    }
                }



            }, function errorCallback(error) {
                console.log('no desapuntado'+error);
            });
        };

}]);