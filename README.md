# LineAlarm

Lineで可愛い女の子に朝起こしてもらうためのアプリケーション

## Installation

```
npm install
cp ./config/config.template.js ./config/config.js
vim ./config/config.js
```

## Run
```
npm start
```
## Develop
```
npm run start-dev
```
この方法で起動すると、LineAPIサーバとの通信を考えないhttpサーバが立ち上がります。
以下のようなjsonをlocalhostになげることでデバッグできます。
```
curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"result":[{"from":"u2ddf2eb3c959e561f6c9fa2ea732e7eb8","fromChannel":1341301815,"to":["u0cc15697597f61dd8b01cea8b027050e"],"toChannel":1441301333,"eventType":"138311609000106303","id":"ABCDEF-12345678901","content":{"location":null,"id":"325708","contentType":1,"from":"uff2aec188e58752ee1fb0f9507c6529a","createdTime":1332394961610,"to":["u0a556cffd4da0dd89c94fb36e36e1cdc"],"toType":1,"contentMetadata":null,"text":"おはよう"}}]}' http://localhost:3000/line/callback
```
投げているjsonは、LineAPI リファレンスのもの
https://developers.line.me/bot-api/api-reference#receiving_messages_example

## Test
```
npm test
```
