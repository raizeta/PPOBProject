angular.module('starter')
.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.views.maxCache(0);

  $stateProvider.state('auth', 
  {
      url: '/auth',
      templateUrl: 'templates/auth/mainlogin.html',
      abstract:true,
  });
  $stateProvider.state('auth.login', 
  {
      url: '/login',
      views: 
      {
          'login-tab': 
          {
            templateUrl: 'templates/auth/login.html',
            controller:'LoginCtrl'
          }
      },
      resolve:
      {
          userinformation: function ($q,StorageService,$injector,$location) 
          {
              var userinformation = StorageService.get('advanced-profile');
              if(userinformation)
              {
                  $location.path("/tab/ppob");
                  $apply();
              }
          }
      }
  });
  $stateProvider.state('auth.registrasi', 
  {
      url: '/registrasi',
      views: 
      {
          'registrasi-tab': 
          {
            templateUrl: 'templates/auth/registrasi.html',
          }
      }
  });

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.ppob', {
    url: '/ppob',
    views: {
      'tab-ppob': {
        templateUrl: 'templates/ppob/tab-ppob.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.ppob-detail', 
  {
      url: '/ppob/:detail',
      views: 
      {
        'tab-ppob': 
        {
          templateUrl: function($stateParams)
          {
            if($stateParams.detail == 'pulsareguler')
            {
              return 'templates/ppob/tab-ppob-detail.html'; 
            }
            else if($stateParams.detail == 'tokenpln')
            {
              return 'templates/ppob/formtokenpln.html'; 
            }
            else if($stateParams.detail == 'tagihanpln')
            {
              return 'templates/ppob/formtagihanpln.html'; 
            }
            else if($stateParams.detail == 'tagihanpdam')
            {
              return 'templates/ppob/formtagihanpdam.html'; 
            }
            
          },
          controller: 'DashCtrl'
        }
      }
  })
  .state('tab.ppob-detail-bayar', 
  {
      url: '/ppob/:detail/pintransaksi',
      views: 
      {
        'tab-ppob': 
        {
          templateUrl: 'templates/ppob/formpintransaksi.html',
          controller: 'PPOBBayarCtrl'
        }
      }
  })
  .state('tab.ppob-detail-bayar-verifikasi', 
  {
      url: '/ppob/:detail/pintransaksi/kodeotp',
      views: 
      {
        'tab-ppob': 
        {
          templateUrl: 'templates/ppob/formkodeotp.html',
          controller: 'PPOBBayarCtrl'
        }
      }
  })
  .state('tab.transaksi', 
  {
      url: '/transaksi',
      views: {
        'tab-transaksi': {
          templateUrl: 'templates/transaksi/index.html',
          controller: 'TransaksiCtrl'
        }
      }
  })
  .state('tab.topup', {
    url: '/topup',
    views: {
      'tab-topup': {
        templateUrl: 'templates/topup/index.html',
        controller: 'TopUpCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/account/index.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.account-rekening', {
    url: '/account/rekening',
    views: {
      'tab-account': {
        templateUrl: 'templates/account/rekening.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.account-profile', {
    url: '/account/profile',
    views: {
      'tab-account': {
        templateUrl: 'templates/account/profile.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.account-password', {
    url: '/account/password',
    views: {
      'tab-account': {
        templateUrl: 'templates/account/password.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.account-dokumen', {
    url: '/account/dokumen',
    views: {
      'tab-account': {
        templateUrl: 'templates/account/dokumen.html',
        controller: 'AccountCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/ppob');

});