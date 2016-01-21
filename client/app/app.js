'use strict';

angular.module('votinApp', [
  'votinApp.auth',
  'votinApp.admin',
  'votinApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ngMaterial',
  'ngAnimate',
  'chart.js',
  'ngMessages'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
