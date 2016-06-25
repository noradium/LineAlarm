"use strict";
const express = require('express');
const request = require('request');
const crypto = require('crypto');
const router = express.Router();

const config = require('../../config/config')[process.env.NODE_ENV];
const ReplyGenerator = require('../../lib/model/ReplyGenerator');
const ReplyRules = require('../../lib/model/ReplyRules');
const LineBotAPI = require('../../lib/api/LineBotAPI');
const replyRules = (new ReplyRules()).rules();

router.post('/', (req, res, next) => {

  if (!_isValidSignature(req.header('X-LINE-ChannelSignature'), req.body)) {
    return next(new Error('Invalid request.'));
  }

  const reqJson = JSON.parse(req.body.toString('utf8'));

  const replyMessages = (new ReplyGenerator(replyRules)).generate(reqJson['result']);

  // リプライ内容がなければ200を返して終了
  if (replyMessages.length === 0) {
    res.status(200).end();
  }

  replyMessages.forEach((replyMessage) => {
    LineBotAPI.events(replyMessage, (error, response, body) => {
      // callback で特にやることはない
    });
  });

  //TODO: LineBotAPI のレスポンス待つ必要はないので、その辺なんとかする
  res.status(200).end();
});

function _isValidSignature(signature, body) {
  // 本番環境以外ではチェックせず全てtrueを返す
  if (process.env.NODE_ENV !== 'prod') {
    return true;
  }
  let hmac = crypto.createHmac('sha256', config.line.channelSecret);
  hmac.update(body);
  const calcResult = hmac.digest('base64');
  return ( calcResult === signature );
}

module.exports = router;
