var dataset = {};

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
var telnum = getQueryVariable('telnum');
//$("#studentid").val(studentid);
window.onload = $.post(
    "https://cssaunimelb.com/ajax/get_mem_info",
    {
        //请按照ALICE引擎请求规范填写
        verb: "CHECK VALID",
        noun: "newmember_quene",
        field: "telnum",
        value: telnum
    },
    function (data, status) {
        console.log(data);
        dataset = JSON.parse(data);
        $("#studentid").val(dataset["studentid"]);
        $("#firstname").val(dataset["firstname"]);
        $("#surname").val(dataset["surname"]);
    }
);
//此处为ALICE引擎的操作指令符
//o['key_type'] = "B"; //密钥类型

function checkInput() {
    input_set = $(".weui-input");
    for (var i=0; i<input_set.length; i++){
        if (!input_set[i].value) {
            return false
        }
    };
    return true;
}

function onClick() {
    //通讯层
    dataset['verb'] = "INSERT INTO"; //数据动作
    dataset['noun'] = "user_info"; //操作对象
    dataset['timeofcreate'] = String(Date.now()); //生成时间戳
    if (dataset["studentid"] == '000000') {
        dataset["is_identified"] = '0'
    } else {
        dataset["is_identified"] = '1'
    }
    dataset["firstname"] = $("#firstname").val();
    dataset["surname"] = $("#surname").val();
    dataset["memid"] = $("#memid").val();
    if (checkInput()) {
        $.post(
            "https://cssaunimelb.com/ajax/membership_activate",
            {
                'timestamp': Date.now(),
                'datapack': JSON.stringify(dataset)
            },
            function (data, statue) {
                if (data == '100') {
                    console.log("successful submission");
                    alert("激活成功");
                    window.location.href = "./index.html";
                } else if (data == "101") {
                    alert("数据库故障，请联系信息部");
                }
            }
        );
    } else {
        alert("表单信息不完整，请检查");
    };;
};