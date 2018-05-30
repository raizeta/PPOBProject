angular.module('starter.controllers', [])
.controller('LoginCtrl',function($scope,$state,$ionicLoading,$timeout,$ionicHistory,StorageService)
{
    $scope.datauserlogin = {};
    $scope.loginsubmit = function()
    {
      $ionicLoading.show
      ({
          noBackdrop:false,
          hideOnStateChange:true,
          template: '<p class="item-icon-left"><span class="title">Loading</span><ion-spinner icon="lines"/></p>',
      });
      $timeout(function() 
      {
          StorageService.set('advanced-profile',$scope.datauserlogin);
          $ionicHistory.nextViewOptions({disableAnimate: true, disableBack: true});
          $state.go('tab.ppob', {}, {reload: false});
      }, 100);
    }
})
.controller('DashCtrl', function(NominalService,TransaksiFac,StorageService,$filter,$scope,$state,$timeout,$ionicHistory,$ionicLoading,$stateParams,$ionicModal,ProviderPrefixService) 
{
    $scope.screenbesar = false;
    $scope.datanominal = NominalService.GetNominalPulsa();
    $scope.gotoformisian = function(paramurl)
    {
      $state.go('tab.ppob-detail', {'detail':paramurl}, {reload: false}); 
    }
    $scope.datapembelianppob = {'MSISDN':null,'PROVIDER':null,'NOMINAL_TRANSAKSI':null};
    $scope.paramurl    = $stateParams.detail;
    $scope.nomorteleponchange = function()
    {
        if($scope.datapembelianppob.MSISDN.length == 4)
        {
            var parammobile                     = {};
            if($scope.paramurl == 'paketdata')
            {
                $scope.datapembelianppob.PROVIDER   = ProviderPrefixService.GetProviderByPrefix($scope.datapembelianppob.MSISDN);
                parammobile.KELOMPOK                = 'PAKET INTERNET';
                parammobile.KTG_NM                  = $scope.datapembelianppob.PROVIDER + ' DATA' ;
            }
            else if($scope.paramurl == 'pulsareguler')
            {
                $scope.datapembelianppob.PROVIDER   = ProviderPrefixService.GetProviderByPrefix($scope.datapembelianppob.MSISDN);
                parammobile.KELOMPOK                = 'PULSA REGULER';
                parammobile.KTG_NM                  = $scope.datapembelianppob.PROVIDER;
            }
            else if($scope.paramurl == 'paketsms')
            {
                $scope.datapembelianppob.PROVIDER   = ProviderPrefixService.GetProviderByPrefix($scope.datapembelianppob.MSISDN);
                parammobile.KELOMPOK                = 'PULSA REGULER';
                parammobile.KTG_NM                  = $scope.datapembelianppob.PROVIDER + ' SMS' ;
            }
            else if($scope.paramurl == 'pakettelepon')
            {
                $scope.datapembelianppob.PROVIDER   = ProviderPrefixService.GetProviderByPrefix($scope.datapembelianppob.MSISDN);
                parammobile.KELOMPOK                = 'PULSA REGULER';
                parammobile.KTG_NM                  = $scope.datapembelianppob.PROVIDER + ' TELPON' ;
            }
        }
        else if($scope.datapembelianppob.MSISDN.length < 4)
        {
           $scope.datapembelianppob.PROVIDER        = '';
           $scope.datapembelianppob.HARGA_JUAL      = '';
           $scope.datapembelianppob.NAME            = '';

        }
    }
    $scope.inputnominalpulsa = function()
    {
        $scope.datanominals       = $scope.datapembelianppob.DAFTAR_NOMINAL;
        $scope.choicekodenominal  = {CODE:null};
        $ionicPopup.confirm({
          templateUrl: 'templates/sales/formisian/popupnominalpulsa.html',
          title: 'PILIH JUMLAH NOMINAL?',
          scope: $scope,
          buttons: [
          {
            text: 'Cancel',
            type: 'button-assertive',
            onTap: function (e) 
            {

            }
          },
          {
            text: 'Yes',
            type: 'button-positive',
            onTap: function (e) 
            {
                if($scope.choicekodenominal.CODE != null)
                {
                    var index       = _.findIndex($scope.datanominals,{'CODE':$scope.choicekodenominal.CODE});
                    var datanominal = $scope.datanominals[index];
                    $scope.datapembelianppob.NILAI_NOMINAL  = $filter('ktoNumber')(datanominal.NOMINAL);
                    $scope.datapembelianppob.HARGA_KG       = datanominal.HARGA_KG;
                    $scope.datapembelianppob.CODE           = datanominal.CODE;
                    $scope.datapembelianppob.DENOM          = datanominal.DENOM;
                    $scope.datapembelianppob.HARGA_JUAL     = datanominal.HARGA_JUAL;
                    $scope.datapembelianppob.ID_CODE        = datanominal.ID_CODE;
                    $scope.datapembelianppob.ID_PRODUK      = datanominal.ID_PRODUK;
                    $scope.datapembelianppob.KELOMPOK       = datanominal.KELOMPOK;
                    $scope.datapembelianppob.KTG_ID         = datanominal.KTG_ID;
                    $scope.datapembelianppob.KTG_NM         = datanominal.KTG_NM;
                    $scope.datapembelianppob.NAME           = datanominal.NAME;
                    $scope.datapembelianppob.TYPE_NM        = datanominal.TYPE_NM;
                }
            }
          }]
        });
    }
    $scope.pilihnominal = function(nilainominal,hargajual)
    {
      var datapembelianppob                 = {};
      datapembelianppob.NOMOR_HANDPHONE     = $scope.datapembelianppob.MSISDN;
      datapembelianppob.PROVIDER            = $scope.datapembelianppob.PROVIDER;
      datapembelianppob.NOMINAL_TRANSAKSI   = angular.copy(nilainominal);
      datapembelianppob.HARGA_JUAL          = angular.copy(hargajual);
      datapembelianppob.JENIS_TRANSAKSI     = $filter('uppercase')($scope.paramurl);
      $ionicLoading.show
      ({
          noBackdrop:false,
          hideOnStateChange:true,
          template: '<p class="item-icon-left"><span class="title">Loading</span><ion-spinner icon="lines"/></p>',
          duration:1000
      })
      .then(function()
      {
          $timeout(function() 
          {
              StorageService.set('datapembelian',datapembelianppob);
              $state.go('tab.ppob-detail-bayar', {'detail':$scope.paramurl}, {reload: false});
          },1001);
          
      });
    }

    
})
.controller('PPOBBayarCtrl',function($location,$scope,$timeout,$filter,$state,$stateParams,$ionicHistory,$ionicLoading,StorageService,TransaksiFac,ProviderPrefixService)
{
    $scope.datapembelianppob = StorageService.get('datapembelian');
    $scope.getimagefunction = function(jenistransaksi,provider)
    {
      return ProviderPrefixService.GetGambarProvider(jenistransaksi,provider);
    }
    $scope.verifikasiotp = function()
    {
      $state.go('tab.ppob-detail-bayar-verifikasi', {'detail':$stateParams.detail}, {reload: false}); 
    }
    $scope.submitotpmodal = function()
    {
        $ionicLoading.show
        ({
            noBackdrop:false,
            hideOnStateChange:true,
            template: '<p class="item-icon-left"><span class="title">Loading</span><ion-spinner icon="lines"/></p>',
            duration:5000
        })
        .then(function()
        {
            var datatosave = {};
            datatosave.WAKTU_SAVE         = $filter('date')(new Date(),'dd-MM-yyyy HH:mm:ss');
            datatosave.TRANSAKSI_ID       = '#DD-12345678';
            datatosave.NOMINAL_TRANSAKSI  = $scope.datapembelianppob.NOMINAL_TRANSAKSI;
            datatosave.JENIS_TRANSAKSI    = $filter('uppercase')($scope.datapembelianppob.JENIS_TRANSAKSI);
            datatosave.PROVIDER           = $scope.datapembelianppob.PROVIDER;
            datatosave.NOMOR_HANDPHONE    = $scope.datapembelianppob.NOMOR_HANDPHONE;
            datatosave.STATUS_TRANSAKSI   = 1;
            TransaksiFac.CreateTransaksi(datatosave)
            .then(function(response)
            {
                $timeout(function() {
                  $ionicHistory.nextViewOptions({disableAnimate: true, disableBack: true});
                  $state.go('tab.ppob', {}, {reload: false});
                }, 10);
                
            },
            function(error)
            {
                console.log(error)
            })
        }); 
    }
})
.controller('TransaksiCtrl', function($scope,$filter,TransaksiFac,ProviderPrefixService) 
{
    $scope.$on('$ionicView.beforeEnter', function(parameters)
    {
      TransaksiFac.GetTransaksis()
      .then(function(response)
      {
          $scope.datatransaksi = response;
      },
      function(error)
      {
          console.log(error);
      })
    });

    $scope.getimagefunction = function(jenistransaksi,provider)
    {
      return ProviderPrefixService.GetGambarProvider(jenistransaksi,provider);
    }


})
.controller('TopUpCtrl',function($scope,$ionicActionSheet,$ionicLoading,$timeout,$filter,RekeningFac,TopUpFac)
{
    $scope.$on('$ionicView.beforeEnter', function(parameters)
    {
        RekeningFac.GetRekenings()
        .then(function(response)
        {
            $scope.datarekening = response;
            $scope.rekeningforactionsheet = [];
            angular.forEach(response,function(value,key)
            {
                var data  = {};
                data.text = '<i class="icon ion-share"></i>' + value.NAMA_BANK;
                $scope.rekeningforactionsheet.push(data);
            })
        },
        function(error)
        {
            console.log(error);
        });

        TopUpFac.GetTopUps()
        .then(function(response)
        {
            if(response.length > 0)
            {
                $scope.bisatopup = {'status':false};
                $scope.datatopupdalamproses = response[0];
            }
            else
            {
                $scope.bisatopup = {'status':true}; 
            }
        },
        function(error)
        {
            console.log(response);
        });
    });

    $scope.topUp     = {};
    $scope.show = function() 
    {
     $ionicActionSheet.show({
       buttons: $scope.rekeningforactionsheet,
       titleText: 'Pilih Rekening Tujuan Transfer',
       buttonClicked: function(index) 
        {
            $scope.topUp.NAMA_BANK        = $scope.datarekening[index].NAMA_BANK;
            $scope.topUp.NOMOR_REKENING   = $scope.datarekening[index].NOMOR_REKENING;
            $scope.topUp.NAMA_PEMILIK     = $scope.datarekening[index].NAMA_PEMILIK;
            return true;
        }
     });
    };
    $scope.submittopup = function()
    {
      $ionicLoading.show
      ({
          noBackdrop:false,
          hideOnStateChange:true,
          template: '<p class="item-icon-left"><span class="title">Loading</span><ion-spinner icon="lines"/></p>',
          duration:5000
      })
      .then(function()
      {
          $scope.topUp.WAKTU_TOPUP  = $filter('date')(new Date(),'dd-MM-yyyy HH:mm:ss');
          $scope.topUp.STATUS_TOPUP = 1;
          TopUpFac.CreateTopUp($scope.topUp)
          .then(function(response)
          {
              $scope.bisatopup = {'status':false};
              $scope.datatopupdalamproses = $scope.topUp;
          },
          function(error)
          {
              console.log(error);
          });
      });
      
    }
})
.controller('AccountCtrl', function($scope,RekeningFac,$ionicHistory,StorageService,$timeout,$ionicLoading,$location) 
{
    $scope.newrekening = {};
    $scope.submitnewrekening = function()
    {
        $scope.newrekening.STATUS_REKENING = 1;
        RekeningFac.CreateRekening($scope.newrekening)
        .then(function(response)
        {
            $ionicHistory.backView().go();
        },
        function(error)
        {
            console.log(error);
        });
    }

    $scope.logout = function() 
    {

        StorageService.destroy('advanced-profile');
        StorageService.destroy('basic-parameters');
        $ionicLoading.show({template: '<p class="item-icon-left"><span class="title">Loading</span><ion-spinner icon="lines"/></p>',duration:1000});
        $timeout(function () 
        {
              $ionicLoading.hide();
              $ionicHistory.clearCache();
              $ionicHistory.clearHistory();
              $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
              $location.path('/auth/login');
          }, 1500);
    };
});
