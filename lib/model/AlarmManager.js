"use strict";
const CronJob = require('cron').CronJob;
const LineBotAPI = require('../api/LineBotAPI');

class AlarmManager {
    constructor () {
        this.jobs = {};
    }

    set (cronTime, to) {
        const job = new CronJob({
            cronTime: cronTime.toDate(),
            onTick: () => {
                LineBotAPI.events({
                    'to': to,
                    'messages': [{
                        'contentType': 1,
                        'text': '時間デスヨー！\n早く起きるデース！',
                    }]
                })
            },
            start: false,
            timeZone: 'Asia/Tokyo'
        });

        job.start();
        this.jobs[Object.keys(this.jobs).length] = job;
    }
}

module.exports = new AlarmManager();
