var dataset ={}
function download_mem_info(tel) {
    //$("#studentid").val(studentid);
    $.post(
        "https://cssaunimelb.com/ajax/get_mem_info",
        {
            //请按照ALICE引擎请求规范填写
            verb: "CHECK VALID",
            noun: "user_info",
            field: "telnum",
            value: telnum
        },
        function (data, status) {
            dataset['applicant_memid'] = JSON.parse(data)['memid'];
            dataset['applicant_telnum'] = telnum;
            dataset['has_member'] = '1';
            dataset['verb'] = "INSERT INTO"; //数据动作
            dataset['noun'] = "event_user_reg"; //操作对象
            console.log(dataset);
            $.post(
                "https://cssaunimelb.com/ajax/reg_event",
                {
                    'timestamp': Date.now(),
                    'datapack': JSON.stringify(dataset)
                },
                function (data, statue) {
                    if (data == '200') {
                        $('#success').attr('style','display:block;');
                        console.log("successful registration");
                    } else if (data == "201") {
                        $('#warning').attr('style','display:block;');
                        alert("数据库故障，请联系信息部");
                    } else if (data == "202") {
                        $('#waiting').attr('style','display:block;');
                        alert("人数超过限制");
                    }
                }
            )
        }
    );
}

function regEvent() {
    telnum = getUrlVariable('telnum');
    event_id = getUrlVariable('event_id');
    new_member = getUrlVariable('new_member');
    dataset['event_id'] = event_id;
    dataset['timeofcreate'] = Date.now();

    if (new_member != '') {
        dataset['applicant_telnum'] = telnum;
        dataset['has_member'] = '0';
        dataset['verb'] = "INSERT INTO"; //数据动作
        dataset['noun'] = "event_user_reg"; //操作对象
        console.log(dataset);
        $.post(
            "https://cssaunimelb.com/ajax/reg_event",
            {
                'timestamp': Date.now(),
                'datapack': JSON.stringify(dataset)
            },
            function (data, statue) {
                if (data == '200') {
                    $('#success').attr('style','display:block;');
                    alert("successful registration");
                } else if (data == "201") {
                    $('#warning').attr('style','display:block;');
                } else if (data == "202") {
                    $('#waiting').attr('style','display:block;');
                }
            }
        )
    }
    else {
        download_mem_info(telnum);
    }
    
};