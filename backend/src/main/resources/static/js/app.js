'use strict';

var app = angular.module('angularjs-starter', [ 'ui.bootstrap.tooltip','ngMaterial', 'ngMessages' ]);

app.controller('MainCtrl', function($scope) {
	$scope.tooltip = 'Hello, World!';
});
