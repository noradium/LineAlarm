var assert = require('power-assert');
var ReplyGenerator = require('../model/ReplyGenerator');

describe('ReplyGenerator', function () {
    beforeEach(function () {
        this.replyGenerator = new ReplyGenerator();
    });

    describe('#generate()', function () {
        it('任意のメッセージに対し、文字列付加して返信する', function () {
            var receivedMessages = [{
                "content": {
                    "from": "alice",
                    "text": "アリス"
                }
            }];

            var data = this.replyGenerator.generate(receivedMessages);

            assert(data[0].to[0] === 'alice');
            assert(data[0].content.messages[0].text === 'オハヨウゴジャイマース\nアリス');
        });
    });
});
