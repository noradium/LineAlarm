'use strict';

const request = require('request');
const config = require('../../config/config')[process.env.NODE_ENV];

class LineBotAPI {
    static events(replyMessage, callback) {
        //ヘッダーを定義
        const headers = {
            'Content-Type' : 'application/json; charset=UTF-8',
            'X-Line-ChannelID' : config.line.channelId,
            'X-Line-ChannelSecret' : config.line.channelSecret,
            'X-Line-Trusted-User-With-ACL' : config.line.mid
        };

        // リクエストを送るためのoption定義
        const options = {
            url: 'https://trialbot-api.line.me/v1/events',
            headers: headers,
            json: true,
            body: replyMessage
        };

        request.post(options, callback);
    }
}