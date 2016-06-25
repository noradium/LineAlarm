"use strict";
class ReplyGenerator {
    constructor (replyRules) {
        this.replyRules = replyRules;
    }

    /**
     * 受け取ったメッセージから返信メッセージを作り出す。
     *
     * @param receivedMessages LineAPIServerから送られてくるデータの配列
     *  [{
     *    "from":"u2ddf2eb3c959e561f6c9fa2ea732e7eb8",
     *    "fromChannel":1341301815,
     *    "to":["u0cc15697597f61dd8b01cea8b027050e"],
     *    "toChannel":1441301333,
     *    "eventType":"138311609000106303",
     *    "id":"ABCDEF-12345678901",
     *    "content": {
     *      "location":null,
     *      "id":"325708",
     *      "contentType":1,
     *      "from":"uff2aec188e58752ee1fb0f9507c6529a", // USED
     *      "createdTime":1332394961610,
     *      "to":["u0a556cffd4da0dd89c94fb36e36e1cdc"],
     *      "toType":1,
     *      "contentMetadata":null,
     *      "text":"Hello, BOT API Server!" // USED
     *    }
     *  },...]
     *
     *  @return Array replyMessages
     */
    generate (receivedMessages) {
        let replyData = [];

        // 送信相手を設定
        let sendTo = [];
        sendTo.push(receivedMessages[0]['content']['from']);

        let receivedText = receivedMessages[0]['content']['text'];

        // replyRules を順に見てマッチするものがあるか調べる
        for (let i in this.replyRules) {
            const rule = this.replyRules[i];

            const matched = receivedText.match(rule.regExp);
            if (matched) {
                // 送信データ作成
                const data = {
                    'to': sendTo,
                    'toChannel': 1383378250, //Bot API Server の channelId (固定値)
                    'eventType':'140177271400161403', //固定値
                    "content": {
                        "messageNotified": 0,
                        "messages": [
                            {
                                "contentType": 1,
                                "text": rule.func(receivedText),
                            }
                        ]
                    }
                };
                replyData.push(data);
                break;
            }
        }
        return replyData;
    };
}

module.exports = ReplyGenerator;