angular.module('starter.services', [])

.service('ProviderPrefixService', function($rootScope,$window,$q,$http,$filter) 
{
    var GetPrefix  = function(provider)
    {
        if(provider == 'TELKOMSEL')
        {
            return /^0811|0812|0813|0821|0822|0823|0851|0852|0853/;
        }
        else if(provider == 'INDOSAT')
        {
            return /^0814|0815|0816|0855|0856|0857|0858/;
        }
        else if(provider == 'XL')
        {
            return /^0817|0818|0819|0859|0877|0878|0879|999|998/;
        }
        else if(provider == 'AXIS')
        {
            return /^0831|0832|0838/;
        }
        else if(provider == 'THREE')
        {
            return /^0895|0896|0897|0898|0899/;
        }
        else if(provider == 'SMARTFREN')
        {
            return /^0881|0882|0883|0884|0885|0886|0887|0888|0889/;
        }
    }

    var GetProviderByPrefix = function(prefix)
    {
        if(/^0811|0812|0813|0821|0822|0823|0851|0852|0853/.test(prefix))
        {
            return 'TELKOMSEL';
        }
        else if(/^0814|0815|0816|0855|0856|0857|0858/.test(prefix))
        {
            return 'INDOSAT';
        }
        else if(/^0817|0818|0819|0859|0877|0878|0879|999|998/.test(prefix))
        {
            return 'XL';
        }
        else if(/^0831|0832|0838/.test(prefix))
        {
            return 'AXIS';
        }
        else if(/^0895|0896|0897|0898|0899/.test(prefix))
        {
            return 'THREE';
        }
        else if(/^0881|0882|0883|0884|0885|0886|0887|0888|0889/.test(prefix))
        {
            return 'SMARTFREN';
        }

    }

    var GetGambarProvider = function(jenistransaksi,provider)
    {
      if(jenistransaksi == 'PULSA' || jenistransaksi == 'PULSAREGULER' || jenistransaksi == 'paketdata' || jenistransaksi == 'PAKETDATA')
      {
          return 'img/lg_' + $filter('lowercase')(provider) + '.png';
      }
      else if(jenistransaksi == 'TAGIHANPLN' || jenistransaksi == 'TOKENPLN')
      { 
          return 'img/lg_token.png';
      }
    }
    return {
      GetPrefix:GetPrefix,
      GetProviderByPrefix:GetProviderByPrefix,
      GetGambarProvider:GetGambarProvider
    };
})

.service('UtilService',function()
{
    var SqliteToArray = function(sqliteresult)
    {
      var panjang = sqliteresult.rows.length;
      var response = [];
      for(var i=0; i < panjang; i++)
      {
        response.push(sqliteresult.rows.item(i));
      }
      return response;
    }
    return {
      SqliteToArray:SqliteToArray
    }
})

.service('StorageService',function($window)
{
   var set = function(key,value)
   {
      return $window.localStorage.setItem(key,JSON.stringify(value));
   }
   var get = function(key)
   {
     return JSON.parse(localStorage.getItem(key));
   }
   var destroy = function(key)
   {
     return $window.localStorage.removeItem(key);
   }

   return {
      set:set,
      get:get,
      destroy:destroy
   }
})

.service('NominalService',function($window)
{
   var GetNominalPulsa = function(key,value)
   {
      var nominal =
      [
        {'ID_PRODUCT':1,'NILAI_NOMINAL':5000,'HARGA_JUAL':6000},
        {'ID_PRODUCT':2,'NILAI_NOMINAL':10000,'HARGA_JUAL':11000},
        {'ID_PRODUCT':3,'NILAI_NOMINAL':20000,'HARGA_JUAL':21000},
        {'ID_PRODUCT':4,'NILAI_NOMINAL':25000,'HARGA_JUAL':25000},
        {'ID_PRODUCT':5,'NILAI_NOMINAL':50000,'HARGA_JUAL':49000},
        {'ID_PRODUCT':6,'NILAI_NOMINAL':100000,'HARGA_JUAL':95000},
        {'ID_PRODUCT':7,'NILAI_NOMINAL':150000,'HARGA_JUAL':145000},
        {'ID_PRODUCT':8,'NILAI_NOMINAL':200000,'HARGA_JUAL':185000},
        {'ID_PRODUCT':9,'NILAI_NOMINAL':500000,'HARGA_JUAL':450000},
        {'ID_PRODUCT':10,'NILAI_NOMINAL':1000000,'HARGA_JUAL':900000}
      ]
      return nominal;
   }

   return {
      GetNominalPulsa:GetNominalPulsa
   }
})


