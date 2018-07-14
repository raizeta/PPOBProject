angular.module('starter')
.factory('TransaksiFac',function($rootScope,$q,$cordovaSQLite,UtilService)
{
    var GetTransaksis = function ()
    {
        var deferred    = $q.defer();
        var query       = 'SELECT * FROM Tbl_Transaksi Order By ID_LOCAL DESC';
        $cordovaSQLite.execute($rootScope.db,query,[])
        .then(function(result) 
        {
            if(result.rows.length > 0)
            {
                var response = UtilService.SqliteToArray(result);
                deferred.resolve(response);
            }
            else
            {
                deferred.resolve([]);
            }
        },
        function (error)
        {
            deferred.reject(error); 
        });
        return deferred.promise;
    }

    var CreateTransaksi = function (datatosave)
    {
        var deferred            = $q.defer();
        var WAKTU_SAVE          = datatosave.WAKTU_SAVE;
        var TRANSAKSI_ID        = datatosave.TRANSAKSI_ID;
        var NOMINAL_TRANSAKSI   = datatosave.NOMINAL_TRANSAKSI;
        var JENIS_TRANSAKSI     = datatosave.JENIS_TRANSAKSI;
        var PROVIDER            = datatosave.PROVIDER;
        var NOMOR_HANDPHONE     = datatosave.NOMOR_HANDPHONE;
        var STATUS_TRANSAKSI    = datatosave.STATUS_TRANSAKSI;

        var isitable        = [WAKTU_SAVE,TRANSAKSI_ID,NOMINAL_TRANSAKSI,JENIS_TRANSAKSI,PROVIDER,NOMOR_HANDPHONE,STATUS_TRANSAKSI]
        var query           = 'INSERT INTO Tbl_Transaksi (WAKTU_SAVE,TRANSAKSI_ID,NOMINAL_TRANSAKSI,JENIS_TRANSAKSI,PROVIDER,NOMOR_HANDPHONE,STATUS_TRANSAKSI) VALUES (?,?,?,?,?,?,?)';
        $cordovaSQLite.execute($rootScope.db,query,isitable)
        .then(function(result) 
        {
            deferred.resolve(result);
        },
        function (error)
        {
            deferred.reject(error);
        });
        return deferred.promise; 
    }

    
    
    return{
            GetTransaksis:GetTransaksis,
            CreateTransaksi:CreateTransaksi,

        }
})
.factory('RekeningFac',function($rootScope,$q,$cordovaSQLite,UtilService)
{
    var GetRekenings = function ()
    {
        var deferred    = $q.defer();
        var query       = 'SELECT * FROM Tbl_Rekening WHERE STATUS_REKENING = 1 Order By ID_LOCAL DESC';
        $cordovaSQLite.execute($rootScope.db,query,[])
        .then(function(result) 
        {
            if(result.rows.length > 0)
            {
                var response = UtilService.SqliteToArray(result);
                deferred.resolve(response);
            }
            else
            {
                deferred.resolve([]);
            }
        },
        function (error)
        {
            deferred.reject(error); 
        });
        return deferred.promise;
    }

    var CreateRekening = function (datatosave)
    {
        var deferred            = $q.defer();
        var NAMA_BANK           = datatosave.NAMA_BANK;
        var NOMOR_REKENING      = datatosave.NOMOR_REKENING;
        var NAMA_PEMILIK        = datatosave.NAMA_PEMILIK;
        var KA_CABANG           = datatosave.KA_CABANG;
        var STATUS_REKENING     = datatosave.STATUS_REKENING;

        var isitable        = [NAMA_BANK,NOMOR_REKENING,NAMA_PEMILIK,KA_CABANG,STATUS_REKENING]
        var query           = 'INSERT INTO Tbl_Rekening (NAMA_BANK,NOMOR_REKENING,NAMA_PEMILIK,KA_CABANG,STATUS_REKENING) VALUES (?,?,?,?,?)';
        $cordovaSQLite.execute($rootScope.db,query,isitable)
        .then(function(result) 
        {
            deferred.resolve(result);
        },
        function (error)
        {
            deferred.reject(error);
        });
        return deferred.promise; 
    }

    return{
            GetRekenings:GetRekenings,
            CreateRekening:CreateRekening,

        }
})
.factory('TopUpFac',function($rootScope,$q,$cordovaSQLite,UtilService)
{
    var GetTopUps = function ()
    {
        var deferred    = $q.defer();
        var query       = 'SELECT * FROM Tbl_TopUp WHERE STATUS_TOPUP = 1 Order By ID_LOCAL DESC';
        $cordovaSQLite.execute($rootScope.db,query,[])
        .then(function(result) 
        {
            if(result.rows.length > 0)
            {
                var response = UtilService.SqliteToArray(result);
                deferred.resolve(response);
            }
            else
            {
                deferred.resolve([]);
            }
        },
        function (error)
        {
            deferred.reject(error); 
        });
        return deferred.promise;
    }

    var CreateTopUp = function (datatosave)
    {
        var deferred            = $q.defer();
        var WAKTU_TOPUP         = datatosave.WAKTU_TOPUP;
        var NOMINAL_TOPUP       = datatosave.NOMINAL_TOPUP;
        var NAMA_BANK           = datatosave.NAMA_BANK;
        var NOMOR_REKENING      = datatosave.NOMOR_REKENING;
        var NAMA_PEMILIK        = datatosave.NAMA_PEMILIK;
        var STATUS_TOPUP        = datatosave.STATUS_TOPUP;

        var isitable        = [WAKTU_TOPUP,NOMINAL_TOPUP,NAMA_BANK,NOMOR_REKENING,NAMA_PEMILIK,STATUS_TOPUP]
        var query           = 'INSERT INTO Tbl_TopUp (WAKTU_TOPUP,NOMINAL_TOPUP,NAMA_BANK,NOMOR_REKENING,NAMA_PEMILIK,STATUS_TOPUP) VALUES (?,?,?,?,?,?)';
        $cordovaSQLite.execute($rootScope.db,query,isitable)
        .then(function(result) 
        {
            deferred.resolve(result);
        },
        function (error)
        {
            deferred.reject(error);
        });
        return deferred.promise; 
    }

    
    
    return{
            GetTopUps:GetTopUps,
            CreateTopUp:CreateTopUp
        }
})
.factory('UsersFac',function($rootScope,$q,$cordovaSQLite,UtilService)
{
    var UserLogin = function (parameter)
    {
        var deferred    = $q.defer();
        var query       = 'SELECT * FROM Tbl_Users WHERE ALAMAT_EMAIL = ? AND USER_PASSWORD = ?';
        $cordovaSQLite.execute($rootScope.db,query,[parameter.ALAMAT_EMAIL,parameter.USER_PASSWORD])
        .then(function(result) 
        {
            if(result.rows.length > 0)
            {
                var response = UtilService.SqliteToArray(result);
                deferred.resolve(response);
            }
            else
            {
                deferred.reject("credential-wrong");
            }
        },
        function (error)
        {
            deferred.reject(error); 
        });
        return deferred.promise;
    }

    var CreateUsers = function (datatosave)
    {
        var deferred            = $q.defer();
        var ALAMAT_EMAIL        = datatosave.ALAMAT_EMAIL;
        var USER_PASSWORD       = datatosave.USER_PASSWORD;
        var NOMOR_HANDPHONE     = datatosave.NOMOR_HANDPHONE;
        var NAMA_LENGKAP        = datatosave.NAMA_LENGKAP;

        var isitable            = [ALAMAT_EMAIL,USER_PASSWORD,NOMOR_HANDPHONE,NAMA_LENGKAP]
        var query               = 'INSERT INTO Tbl_Users (ALAMAT_EMAIL,USER_PASSWORD,NOMOR_HANDPHONE,NAMA_LENGKAP) VALUES (?,?,?,?)';
        $cordovaSQLite.execute($rootScope.db,query,isitable)
        .then(function(result) 
        {
            deferred.resolve(result);
        },
        function (error)
        {
            deferred.reject(error);
        });
        return deferred.promise; 
    }
    return{
            UserLogin:UserLogin,
            CreateUsers:CreateUsers
        }
});