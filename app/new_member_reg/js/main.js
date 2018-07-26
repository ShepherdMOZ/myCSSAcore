//
formdata = {};
formdata['gender'] = 'O';



// fillJSON = function (obj) {
//     formdata[String(obj.name)] = obj.value;
//     console.log(JSON.stringify(formdata));
// }

function checkInput() {
    input_set = $(".weui-input");
    for (var i=0; i<input_set.length; i++){
        if (!input_set[i].value) {
            return false
        } else {
            formdata[String(input_set[i].name)] = input_set[i].value;
        }
    };
    return true;
}
$("#telnum").bind('keyup', function () {
    if ($("#telnum").val().length == 10) {
        //$.ajax()远程获取json数据
        $.ajax({
            type: "POST",
            url: "https://cssaunimelb.com/ajax/check_id",
            crossDomain: true,
            data: {
                //请按照ALICE引擎请求规范填写
                verb: "CHECK VALID",
                noun: "user_info",
                field: "telnum",
                value: $("#telnum").val()
            },
            success: function (response, status, xhr) {
                console.log(response);
                if (response == "Valid") {
                    alert('该号码已被注册，请重新填写');
                    $("#telnum").val("");
                };
            }
        });
    };
});


function onClick() {
    //通讯层
    if (checkInput()) {
        //ALICE引擎操作符
        formdata['verb'] = 'INSERT INTO';
        formdata['noun'] = 'newmember_quene';
        formdata['timeofcreate'] = Date.now();
        $.post(
            "https://cssaunimelb.com/ajax/submit_membership_application",
            {
                'timestamp': Date.now(),
                'datapack': JSON.stringify(formdata)
            },
            function (data, statue) {
                if (data == '100') {
                    console.log("successful submission");
                    if (!getUrlVariable("event_id")){
                        window.location.href = "./success.html";
                    } else {
                        next_uri = "../events_mgr/proceed_reg.html?event_id="+getUrlVariable("event_id")+"&telnum="+$("#telnum").val()+"&new_member=1";
                        window.location.href=next_uri;
                    }
                   
                } else if (data == "101") {
                    alert("数据库故障，请联系信息部");
                }
            }
        );
    } else {
        alert("表单信息不完整，请检查");
    };
}


