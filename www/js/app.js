// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova','starter.controllers', 'starter.services'])

.run(function($ionicPlatform,$rootScope,$location,$cordovaSQLite,StorageService,$ionicPopup) 
{
  $ionicPlatform.ready(function() 
  {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) 
    {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  $rootScope.db = window.openDatabase("doedoeppob.db", "1.0", "Your App", 2000000000000);
  $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_Transaksi (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,WAKTU_SAVE TEXT,TRANSAKSI_ID TEXT,NOMINAL_TRANSAKSI INTEGER,JENIS_TRANSAKSI TEXT,PROVIDER TEXT,NOMOR_HANDPHONE TEXT,STATUS_TRANSAKSI INTEGER)');
  $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_Rekening (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,NAMA_BANK TEXT,NOMOR_REKENING TEXT,NAMA_PEMILIK TEXT,KA_CABANG TEXT,STATUS_REKENING INTEGER)'); 
  $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_TopUp (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,WAKTU_TOPUP TEXT,NOMINAL_TOPUP INTEGER,NAMA_BANK TEXT,NOMOR_REKENING TEXT,NAMA_PEMILIK TEXT,STATUS_TOPUP INTEGER)'); 
  $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_Users (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,ALAMAT_EMAIL TEXT,USER_PASSWORD TEXT,NOMOR_HANDPHONE TEXT UNIQUE,NAMA_LENGKAP TEXT)'); 
  
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) 
  {
      var token   = StorageService.get('advanced-profile');
      if (!token) 
      {
        $location.path('/auth/login');
        console.log();
      }
  });
  
})

