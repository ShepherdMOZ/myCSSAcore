/*创建新会员信息表*/
CREATE TABLE newmember_quene (
    ref_id INT IDENTITY(1,1), 
    timeofcreate TEXT NOT NULL,
    surname VARCHAR(45) NOT NULL,
    firstname VARCHAR(45) NOT NULL,
    dob VARCHAR(16) NOT NULL,
    gender VARCHAR(1) NOT NULL,
    studentid VARCHAR(6) DEFAULT('000000'),
    expire VARCHAR(16) DEFAULT('000000'),
    studentmail VARCHAR(45) NOT NULL,
    faculty VARCHAR(128) NOT NULL,
    telnum VARCHAR(10) NOT NULL,
    postcode VARCHAR(4) NOT NULL,
    origin VARCHAR(32) NOT NULL,
    PRIMARY KEY (ref_id),
);


CREATE TABLE user_info (
    ref_id INT IDENTITY(1,1), 
    timeofcreate TEXT NOT NULL,
    surname VARCHAR(45) NOT NULL,
    firstname VARCHAR(45) NOT NULL,
    dob VARCHAR(16) NOT NULL,
    gender VARCHAR(1) NOT NULL,
    studentid VARCHAR(6) DEFAULT('000000'),
    expire VARCHAR(16) DEFAULT('000000'),
    studentmail VARCHAR(45) NOT NULL,
    faculty VARCHAR(128) NOT NULL,
    telnum VARCHAR(10) NOT NULL,
    postcode VARCHAR(4) NOT NULL,
    origin VARCHAR(32) NOT NULL,
    memid VARCHAR(5) NOT NULL,
    is_identified BOOLEAN NOT NULL,
    PRIMARY KEY (ref_id),
);



-- 活动管理页面
CREATE TABLE event_info (
    event_id INT NOT NULL,
    event_name VARCHAR(128) NOT NULL,
    commence_date VARCHAR(20) NOT NULL,
    commence_time VARCHAR(20) NOT NULL,
    applicant_limit INT NOT NULL,
    expire_date VARCHAR(45) NOT NULL,
    picture_uri TEXT DEFAULT "VOID",
    PRIMARY KEY (event_id)
);


CREATE TABLE event_user_reg (
    ref_id INT NOT NULL,
    event_id INT NOT NULL,
    applicant_telnum VARCHAR(11) NOT NULL,
    applicant_memid VARCHAR(5) DEFAULT "VOID",
    has_member VARCHAR(1) DEFAULT "0",
    code_used VARCHAR(1) DEFAULT "0"
    PRIMARY KEY (ref_id),
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES event_info(event_id)
);

-- 运行环境参数
CREATE TABLE sys_param_cache(
    cache_id INT,
    param_name VARCHAR(45) NOT NULL,
    param_type VARCHAR(16) NOT NULL,
    param_value VARCHAR(128) NOT NULL,
    timeofcreate VARCHAR(128) NOT NULL,
    time_expire VARCHAR(128) NOT NULL,
    PRIMARY KEY (cache_id)
)