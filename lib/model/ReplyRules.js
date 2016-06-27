"use strict";

const TimeUtil = require('../util/TimeUtil');
const AlarmManager = require('./AlarmManager');

class ReplyRules {
    constructor () {
        this._rules = [
            {
                'regExp': /.*おはよう.*/,
                'action': this._hello
            },
            {
                'regExp': /.*おやすみ.*/,
                'action': this._goodnight
            },
            {
                'regExp': /[^\d]*(\d+)時(\d+)分.*(?:起|お)こして.*/,
                'action': this._alarmSet
            }
        ];
    }

    rules () {
        return this._rules;
    }

    _hello (matched, to) {
        return 'オハヨウゴジャイマース';
    }

    _goodnight (matched, to) {
        return 'おやすみデスー';
    }

    _alarmSet (matched, to) {
        const hour = parseInt(matched[1]);
        const minute = parseInt(matched[2]);

        if (!(hour <= 23 && minute <= 59)) {
            return 'その時刻よく分かりマセン...';
        }

        const alarmTime = TimeUtil.getNearestDatetime(hour, minute);

        AlarmManager.set(alarmTime, to);

        return `分かりマシター！\n${alarmTime.format('M月D日H時m分')}に起こしマス！\n私に任せるデース！`;
    }
}

module.exports = ReplyRules;
