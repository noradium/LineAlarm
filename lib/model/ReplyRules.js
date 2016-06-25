"use strict";
class ReplyRules {
    constructor () {
        this._rules = [
            {
                'regExp': /.*おはよう.*/,
                'func': this._func_hello
            }
        ];
    }

    rules () {
        return this._rules;
    }

    _func_hello (text) {
        return 'オハヨウゴジャイマース';
    }
}

module.exports = ReplyRules;
