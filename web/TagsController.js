var blogDao = require('../dao/BlogDao');
var timeUtil = require('../util/TimeUtil');
var respUtil = require('../util/RespUtil');
var url = require('url');
var tagsDao = require('../dao/TagsDao');
var tagBlogMapping = require('../dao/TagBlogMappingDao'); 

var path = new Map();

function queryRandomTags(request, response){
    tagsDao.queryRandomTags(function(result){   //随机排序结果
        result.sort(function(){
            return Math.random() > 0.5 ? true : false;
        })
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}
path.set('/queryRandomTags', queryRandomTags)

function queryByTag(request, response){
    var params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, function(result){
        if(result == null || result.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end();
        }else{
            tagBlogMapping.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), function(result){
                var blogList = [];
                for(var i = 0; i < result.length; i++){
                    blogDao.queryBlogById(result[i].blog_id, function(result){
                        blogList.push(result[0]);
                    })
                }
                getResult(blogList, result.length, response)
            })
        }
    })
    
}
path.set('/queryByTag', queryByTag)

function getResult(blogList, len, response){
    if(blogList.length < len){
        setTimeout(function(){
            getResult(blogList, len, response)
        },10);
    }else{
        for(var i = 0; i < blogList.length; i++){
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/g, "");
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1, 5}>/g, "");
            blogList[i].content = blogList[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', blogList));
        response.end();
    }
}

function queryByTagCount(request, response){
    var params = url.parse(request.url, true).query;
    tagsDao.queryTag(params.tag, function(result){
        tagBlogMapping.queryByTagCount(result[0].id, function(result){
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end();
        })
    })
    
}
path.set('/queryByTagCount', queryByTagCount)

module.exports.path = path