"use strict";
const express = require('express');
const request = require('request');
const crypto = require('crypto');
const router = express.Router();

const config = require('../../config/config')[process.env.NODE_ENV];
const ReplyGenerator = require('../../model/ReplyGenerator');
const ReplyRules = require('../../model/ReplyRules');
const replyRules = (new ReplyRules()).rules();

router.post('/', (req, res, next) => {

  if (!_isValidSignature(req.header('X-LINE-ChannelSignature'), req.body)) {
    return next(new Error('Invalid request.'));
  }

  const reqJson = JSON.parse(req.body.toString('utf8'));

  //ヘッダーを定義
  const headers = {
    'Content-Type' : 'application/json; charset=UTF-8',
    'X-Line-ChannelID' : config.line.channelId,
    'X-Line-ChannelSecret' : config.line.channelSecret,
    'X-Line-Trusted-User-With-ACL' : config.line.mid
  };

  const replyMessages = (new ReplyGenerator(replyRules)).generate(reqJson['result']);

  // リプライ内容がなければ200を返して終了
  if (replyMessages.length === 0) {
    res.status(200);
    res.send();
    res.end();
  }

  replyMessages.forEach((replyMessage) => {
    // リクエストを送るためのoption定義
    const options = {
      url: 'https://trialbot-api.line.me/v1/events',
      headers: headers,
      json: true,
      body: replyMessage
    };

    request.post(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.status(200);
        res.send();
      } else {
        res.status(response.statusCode);
        res.send();
      }
    });
  });
});

function _isValidSignature(signature, body) {
  let hmac = crypto.createHmac('sha256', config.line.channelSecret);
  hmac.update(body);
  const calcResult = hmac.digest('base64');
  return ( calcResult === signature );
}

module.exports = router;
