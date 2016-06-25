"use strict";
const assert = require('power-assert');
const ReplyGenerator = require('../lib/model/ReplyGenerator');
const ReplyRules = require('../lib/model/ReplyRules');
const replyRules = (new ReplyRules()).rules();

describe('ReplyRules', () => {
    beforeEach(() => {
        this.replyGenerator = new ReplyGenerator(replyRules);
    });

    describe('固定返信', () => {
        it('「おはよう」に反応して返事を返す', () => {
            const receivedMessages = [{
                "content": {
                    "from": "alice",
                    "text": "おはようー"
                }
            }];

            const data = this.replyGenerator.generate(receivedMessages);

            assert(data[0].to[0] === 'alice');
            assert(data[0].content.messages[0].text === 'オハヨウゴジャイマース');
        });
    });
});
