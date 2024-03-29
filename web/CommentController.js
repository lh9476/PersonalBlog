var blogDao = require('../dao/BlogDao');
var timeUtil = require('../util/TimeUtil');
var respUtil = require('../util/RespUtil');
var url = require('url');
var tagsDao = require('../dao/TagsDao');
var tagBlogMapping = require('../dao/TagBlogMappingDao'); 
var commentDao = require('../dao/CommentDao');
var captcha = require('svg-captcha'); //验证码制作

var path = new Map();

function addComment(request, response){
    var params = url.parse(request.url, true).query;
    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '提交成功', null));
        response.end();
    })
}
path.set('/addComment', addComment);

function queryRandomCode(request, response){  //验证码制作
    var img = captcha.create({fontSize: 50, width: 100, height: 34});
    // console.log(img);
    response.writeHead(200);
    response.write(respUtil.writeResult('success', '提交成功', img));
    response.end();
}
path.set('/queryRandomCode', queryRandomCode);

function queryCommentsByBlogId(request, response){
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(parseInt(params.bid), function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}
path.set('/queryCommentsByBlogId', queryCommentsByBlogId);

function queryCommentsCountByBlogId(request, response){
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsCountByBlogId(parseInt(params.bid), function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}
path.set('/queryCommentsCountByBlogId', queryCommentsCountByBlogId);

function queryNewComments(request, response){
    commentDao.queryNewComments(5, function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}
path.set('/queryNewComments', queryNewComments);

module.exports.path = path;