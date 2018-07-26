//Asychronoic Link Integration Cascading Engine (ALICE)
//层叠链路异步聚合引擎
//Designed by Josh.Le.LU
//2018

//Component: ALICE - AJAX Server Router
//Version: 0.0.3
//Signature: Josh.Le.LU
//Modified at: 2018.07.18

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Alice = require('./alice.js');
var srvDate = new Date();
var current_reg =0;
var event_limit =0;

//允许跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

//post解释器
//默认情况下Express并不知道该如何处理该请求体，因此我们需要增加bodyParser中间件，用于分析  
//application/x-www-form-urlencoded和application/json  
//请求体，并把变量存入req.body。我们可以像下面的样子来“使用”中间件[这个保证POST能取到请求参数的值]：     
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//->MySQL Connector
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: '',
    password: '',
    database: ''
});//警告：Git Push之前请务必清空此处参数！！


//系统内路由 Router
connection.connect();
//---->实名信息
app.post('/ajax/get_mem_info', function (req, res) {
    sql_query = "SELECT * FROM " + String(req.body.noun) + " WHERE " + String(req.body.field) + "='" + String(req.body.value) + "';";
    console.log(srvDate.toLocaleDateString() + ' ' + srvDate.toLocaleTimeString() + "【请求】实名信息：" + sql_query);
    connection.query(sql_query, function (error, results, fields) {
        if (error) { throw error }
        else if (results[0]) {
            //console.log(JSON.stringify(results));
            res.send(JSON.stringify(results[0]));
        };
    });
})

//---->队列中-信息核验
app.post('/ajax/check_id', function (req, res) {
    sql_query = "SELECT * FROM " + String(req.body.noun) + " WHERE " + String(req.body.field) + "='" + String(req.body.value) + "';";
    console.log(srvDate.toLocaleDateString() + ' ' + srvDate.toLocaleTimeString() + "【校验】表单字段：" + sql_query);
    connection.query(sql_query, function (error, results, fields) {
        if (error) { throw error }
        else if (results[0]) {
            console.log("Valid");
            res.send("Valid");
        } else {
            console.log("Invalid");
            res.send("Invalid");
        }
    });
})

//---->新会员注册-信息申报通道
app.post('/ajax/submit_membership_application', function (req, res) {
    sql_query = Alice.Reader(req.body.datapack);
    console.log(srvDate.toLocaleDateString() + ' ' + srvDate.toLocaleTimeString() + "【写入】新会员信息：" + sql_query);
    connection.query(sql_query, function (error, results, fields) {
        if (error) {
            res.send("101");
            throw error
        }
        else {
            res.send("100");
        }
    });
})

//---->新会员注册-激活
app.post('/ajax/membership_activate', function (req, res) {
    sql_query = Alice.Reader(req.body.datapack);
    console.log(srvDate.toLocaleDateString() + ' ' + srvDate.toLocaleTimeString() + "【激活】新会员：" + sql_query);
    connection.query(sql_query, function (error, results, fields) {
        if (error) {
            res.send("101");
            throw error
        }
        else {
            res.send("100");
        }
    });
})

//---->活动报名-确认
app.post('/ajax/reg_event', function (req, res) {
    data = JSON.parse(req.body.datapack);
    console.log(data);
    event_id = data['event_id'];
    connection.query("SELECT * FROM event_info WHERE event_id= " + event_id + ";", function (error, results, fields) {
        event_limit = parseInt(results[0]['applicant_limit']);
        console.log(event_limit);
    });
    connection.query("SELECT * FROM sys_param_cache WHERE cache_id=1", function (error, results, fields) {
        if (error) {
            console.log('ERROR',results);
            throw error;
        } else{
        current_reg = parseInt(results[0]['param_value']);
        console.log(current_reg);
        }
    });
    data['quene_no'] = current_reg + 1;
    connection.query("UPDATE sys_param_cache SET param_value = "+String(data['quene_no'])," WHERE cache_id = 1 ");
    sql_query = Alice.Reader(JSON.stringify(data));
    console.log(srvDate.toLocaleDateString() + ' ' + srvDate.toLocaleTimeString() + "【活动报名】" + sql_query);
    connection.query(sql_query, function (error, results, fields) {
        if (error) {
            res.send("201"); //数据故障
            throw error
        }
        else {
            if (event_limit >= current_reg){
            res.send("200"); //报名成功返回码
            } else {
                res.send("202");  //人数超限，进入waiting list
            };
        }
    });
});

//端口配置
var server = app.listen(8088, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log(srvDate.toLocaleDateString() + ' ' + srvDate.toLocaleTimeString() + "Connection established at https://%s:%s", host, port);
})