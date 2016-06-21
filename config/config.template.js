const config = {
    prod: {
        port: '**PORT**',
        ssl: {
            key: '../cert/server.key',
            passphrase: '**PASSPHRASE**',
            cert: '../cert/server.crt',
            ca: '../cert/ca.crt'
        },
        line: {
            channelId: '**CHANNEL_ID**',
            channelSecret: '**CHANNEL_SECRET**',
            mid: '**MID**'
        }
    },
    dev: {
        port: 3000
    }
};

module.exports = config;