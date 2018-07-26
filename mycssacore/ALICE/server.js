//Asychronoic Link Integration Cascading Engine (ALICE)
//Designed by Josh.Le.LU
//2018

//Component: ALICE - Websocket Server Bootloader
//Version: 0.0.1
//Signature: Josh.Le.LU
//Modified at: 2018.07.08

var Alice = require('./alice.js');


//  --->MySQL Connector
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: '',
    password: '',
    database: ''
});//警告：Git Push之前请务必清空此处参数！！
connection.connect();

//  ---> Socket.IO Transponder
console.log("ALICE is alive");
var Msg = '';
var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ port: 8888 });

wss.on('connection', function (ws) {
    let testdata = {};
    testdata.name = 'Connection Test';
    testdata.timecode = Date.now();
    ws.send(JSON.stringify(testdata));

    ws.on('message', function incomming(message) {
        console.log('Received from client: %s', message);
        //console.log(Alice.Reader(message));
        connection.query(Alice.Reader(message), function (error, results, fields) {
            if (error) {
                throw error;
                ws.send("2");
            } else {
            console.log(Alice.Reader(message));
            ws.send("1");
            }
          });
    });
});

