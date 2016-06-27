'use strict';

const request = require('request');
const config = require('../../config/config')[process.env.NODE_ENV];

class LineBotAPI {
    static events(replyData, callback) {
        //ヘッダーを定義
        const headers = {
            'Content-Type' : 'application/json; charset=UTF-8',
            'X-Line-ChannelID' : config.line.channelId,
            'X-Line-ChannelSecret' : config.line.channelSecret,
            'X-Line-Trusted-User-With-ACL' : config.line.mid
        };

        // 送信データ作成
        const data = {
            'to': replyData.to,
            'toChannel': 1383378250, //Bot API Server の channelId (固定値)
            'eventType':'140177271400161403', //固定値
            "content": {
                "messageNotified": 0,
                "messages": replyData.messages
            }
        };

        // リクエストを送るためのoption定義
        const options = {
            url: 'https://trialbot-api.line.me/v1/events',
            headers: headers,
            json: true,
            body: data
        };

        request.post(options, callback);
    }
}

class BlankShotLineBotAPI {
    static events(replyData, callback) {
        console.log('LineBotAPI.events called');
        console.log(JSON.stringify(replyData, null, '\t'));
        callback();
    }
}

module.exports = (process.env.NODE_ENV === 'prod') ? LineBotAPI : BlankShotLineBotAPI;
