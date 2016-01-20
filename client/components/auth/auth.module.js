'use strict';

angular.module('votinApp.auth', [
  'votinApp.constants',
  'votinApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
