var express = require('express');
var request = require('request');
var crypto = require('crypto');
var router = express.Router();

var config = require('../../config/config')[process.env.NODE_ENV];
var ReplyGenerator = require('../../model/ReplyGenerator');
var ReplyRules = require('../../model/ReplyRules');
var replyRules = (new ReplyRules()).rules();

router.post('/', function(req, res, next) {

  if (!_checkSignature(req.header('X-LINE-ChannelSignature'), req.body)) {
    return next(new Error('Invalid request.'));
  }

  var reqJson = JSON.parse(req.body.toString('utf8'));

  //ヘッダーを定義
  var headers = {
    'Content-Type' : 'application/json; charset=UTF-8',
    'X-Line-ChannelID' : config.line.channelId,
    'X-Line-ChannelSecret' : config.line.channelSecret,
    'X-Line-Trusted-User-With-ACL' : config.line.mid
  };

  var replyMessages = (new ReplyGenerator(replyRules)).generate(reqJson['result']);

  // リプライ内容がなければ200を返して終了
  if (replyMessages.length === 0) {
    res.status(200);
    res.send();
    res.end();
  }

  replyMessages.forEach(function (replyMessage) {
    // リクエストを送るためのoption定義
    var options = {
      url: 'https://trialbot-api.line.me/v1/events',
      headers: headers,
      json: true,
      body: replyMessage
    };

    request.post(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.status(200);
        res.send();
      } else {
        res.status(response.statusCode);
        res.send();
      }
    });
  });

});

function _checkSignature(signature, body) {
  const hmac = crypto.createHmac('sha256', config.line.channelSecret);
  hmac.update(body);
  const calcResult = hmac.digest('base64');
  return ( calcResult === signature );
}


module.exports = router;
