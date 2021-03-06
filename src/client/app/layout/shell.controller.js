(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger', 'localStorageService'];
  /* @ngInject */
  function ShellController($rootScope, $timeout, config, logger, localStorageService) {
    var vm = this;
    vm.busyMessage = 'Please wait ...';
    vm.isBusy = true;
    $rootScope.showSplash = true;
    vm.navline = {
      title: config.appTitle,
      text: vm.user,
      link: 'http://twitter.com/john_papa'
    };

    activate();

    function activate() {
      logger.success(config.appTitle + ' loaded!', null);
      hideSplash();
      if (localStorageService.get('username')) {
        vm.navline.text = localStorageService.get('username');
      }
    }

    function hideSplash() {
      //Force a 1 second delay so we can see the splash.
      $timeout(function () {
        $rootScope.showSplash = false;
      }, 1000);
    }
  }
})();
