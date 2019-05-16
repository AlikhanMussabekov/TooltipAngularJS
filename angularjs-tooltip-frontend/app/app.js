'use strict';

var app = angular.module('angularjs-starter', [ 'ui.bootstrap.tooltip','ngMaterial', 'ngMessages' ]);

app.controller('MainCtrl', function($scope, $http) {
	fetchData($scope, $http);
	$scope.users = ""
});

function fetchData($scope, $http) {

	$http({
		url: 'http://localhost:8080/users',
		method: "GET",
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	}).then(function successCallBack(response) {
		$scope.users = response.data;
	}, function errorCallBack(response){
		console.log(response);
	});

}