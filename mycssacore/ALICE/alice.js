//Asychronoic Link Integration Cascading Engine (ALICE)
//Designed by Josh.Le.LU
//2018

//Component: ALICE - Data Reader/Writer
//Version: 0.0.1
//Signature: Josh.Le.LU
//Modified at: 2018.07.10

//---------------------标准操作符---------------------//
// INSERT INTO: 插入记录
// UPDATING: 更新记录
//
//
//
//--------------------------------------------------//
function insert_record(Opt_data){
    var Operant = "";
    Operant += Opt_data['verb'] + ' ' + Opt_data['noun'] + '(';
    delete Opt_data['verb'];
    delete Opt_data['noun'];
    for (var key in Opt_data) {
        Operant += String(key) + ',';
    };
    Operant=Operant.substring(0,Operant.length-1);
    Operant += ') VALUES (';
    for (var key in Opt_data) {
        Operant += "'" + Opt_data[key] + "'" + ',';
    };
    Operant=Operant.substring(0,Operant.length-1);
    Operant += ');'
    return Operant
};

function update_record(Opt_data){
    var Operant = "";
    Operant += 'UPDATE' + ' ' + data['noun'] + '(';
    delete data['verb'];
    delete data['noun'];
};

// function regist_event(Opt_data){
//     var Operant = "";
    
// };

exports.Reader = function(IncomingString) {
    var sql_state = "";
    data = JSON.parse(IncomingString);
    if (data['verb'] == 'INSERT INTO') {
        sql_state = insert_record(data);
    }
    if (data['verb'] == 'UPDATING'){
        sql_state = update_record(data);
    }
    // if (data['verb'] == 'REGIST EVENT'){
    //     sql_state = regist_event(data);
    // };
    return sql_state;
};

exports.Writer = function() {

}
