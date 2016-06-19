var config = {
    prod: {
        port: '**PORT**',
        ssl: {
            key: '../cert/server.key',
            cert: '../cert/server.crt',
            ca: '../cert/ca.crt'
        }
    },
    dev: {
        port: 3000
    }
};

module.exports = config;