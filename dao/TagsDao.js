var dbutil = require('./DBUtil');

function insertTag(tag, ctime, utime, success){
    var insertSql = "insert into tags (`tag`, `ctime`, `utime`) values (?, ?, ?);";//sql语句这里表名前后要有空格，参数用 ``包裹
    var params = [tag, ctime, utime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(error, result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

function queryTag(tag, success){
    var insertSql = "select * from tags where tag = ?;";//sql语句这里表名前后要有空格，参数用 ``包裹
    var params = [tag];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(error, result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

function queryRandomTags(success){
    var querySql = "select * from tags;";//sql语句这里表名前后要有空格，参数用 ``包裹
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error, result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryRandomTags = queryRandomTags;
