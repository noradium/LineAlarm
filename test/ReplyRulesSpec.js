var assert = require('power-assert');
var ReplyGenerator = require('../model/ReplyGenerator');
var replyRules = require('../config/replyRules');

describe('ReplyRules', function () {
    beforeEach(function () {
        this.replyGenerator = new ReplyGenerator(replyRules);
    });

    describe('固定返信', function () {
        it('「おはよう」に反応して返事を返す', function () {
            var receivedMessages = [{
                "content": {
                    "from": "alice",
                    "text": "おはようー"
                }
            }];

            var data = this.replyGenerator.generate(receivedMessages);

            assert(data[0].to[0] === 'alice');
            assert(data[0].content.messages[0].text === 'オハヨウゴジャイマース');
        });
    });
});
