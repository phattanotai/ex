// Nodejs encryption with GCM
// Does not work with nodejs v0.10.31
// Part of https://github.com/chris-rock/node-crypto-examples

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'MmgnUDHyQpqRsLzXja4fVAC';

  var cryto_encode = new function() {
    this.encrypt = function(text){
        var cipher = crypto.createCipher(algorithm,password);
        var crypted = cipher.update(text,'utf8','hex');
        crypted += cipher.final('hex');
        return crypted;
    },
    this.decrypt = function(text){
        var decipher = crypto.createDecipher(algorithm,password);
        var dec = decipher.update(text,'hex','utf8');
        dec += decipher.final('utf8');
        return dec;
    },
    this.getTokenData = function(token){
      var arrSplit = this.decrypt(token).split("|");
      // console.log(arrSplit);
      var data = {};
      data.username = arrSplit[0];
      data.passward = arrSplit[1];
      data.ip = arrSplit[2];
      data.datetime = arrSplit[3];
      data.user_id = Number(arrSplit[4]);
      data.user_group_id = Number(arrSplit[5]);
      return data;
    }
  }

// var hw = encrypt("hello world")
//   // outputs hello world
// console.log(decrypt(hw));

module.exports = cryto_encode;
