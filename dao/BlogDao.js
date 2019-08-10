var dbutil = require('./DBUtil');

function insertBlog(title, content, tags, views, ctime, utime, success){
    var insertSql = "insert into blog (`title`, `content`, `tags`, `views`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?);";//sql语句这里表名前后要有空格，参数用 ``包裹
    var params = [title, content, tags, views, ctime, utime];

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

function queryBlogByPage(page, pageSize, success){
    var insertSql = "select * from blog order by id desc limit ?,?;";//sql语句这里表名前后要有空格，参数用 ``包裹
    var params = [page * pageSize, pageSize];

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

function queryBlogById(id, success){
    var querySql = "select * from blog where id = ?;";//sql语句这里表名前后要有空格，参数用 ``包裹
    var params = [id];

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

function queryBlogCount(success){
    var querySql = "select count(1) as count from blog;";//sql语句这里表名前后要有空格，参数用 ``包裹
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

function queryAllBlog(success){
    var querySql = "select * from blog order by id desc;";//sql语句这里表名前后要有空格，参数用 ``包裹
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

function addViews(id, success){
    var querySql = "update blog set views = views + 1 where id = ?;";//sql语句这里表名前后要有空格，参数用 ``包裹
    var params = [id];

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

function queryHotBlog(size, success){
    var querySql = "select * from blog order by views desc limit ?;";//sql语句这里表名前后要有空格，参数用 ``包裹
    var params = [size];

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


module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;