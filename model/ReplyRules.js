var ReplyRules = function() {
    this._rules = [
        {
            'regExp': /.*おはよう.*/,
            'func': this._func_hello
        }
    ];
};

ReplyRules.prototype.rules = function () {
    return this._rules;
}

ReplyRules.prototype._func_hello = function (text) {
    return 'オハヨウゴジャイマース';
}

module.exports = ReplyRules;