'use strict';

const moment = require('moment');

class TimeUtil {
    static getNearestDatetime(hour, minute) {
        let now = moment();
        let nearest = now;

        if (
            hour < now.hour() ||
            hour == now.hour() && minute < now.minute() ||
            minute == now.minute()
        ) {
            nearest.add(1, 'd');
        }
        nearest.hour(hour);
        nearest.minute(minute);

        return nearest;
    }
}

module.exports = TimeUtil;
