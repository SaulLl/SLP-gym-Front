
var eventsServive = angular.module("gym.event.service",['ngResource']);

eventsServive.factory('getEventsTodayServive', getEventsTodayServive);

function getEventsTodayServive($resource) {

    return $resource("http://localhost:3000/api/eventsToday", {}, {
        query: {
            method: 'GET',
            isArray: false
        }

    });
}

eventsServive.factory('getEventsAllServive', getEventsAllServive);

function getEventsAllServive($resource){

    return $resource("http://localhost:3000/api/events/", {}, {
        query: {
            method: 'GET',
            isArray: false
        }

    });
}

eventsServive.factory('getInscriptions', getInscriptions);

function getInscriptions($resource,$cookies) {

  //  var user = $cookies.getObject('user');

   // var userId = user._id;

    //console.log(userId);

    return $resource("http://localhost:3000/api/inscription/590546b879c47c3728f5ed8b", {
        guery: {
            method: 'GET'

        }

    });
}


