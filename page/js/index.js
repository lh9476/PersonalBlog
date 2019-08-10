
var everyDay = new Vue({
    el:'#every_day',
    data:{
        content:'True happiness is of a retired nature, and an enemy to pomp and noise.',
    },
    computed:{
        getContent:function(){
            return this.content;
        }
    },
    created:function(){
        //请求数据，给content赋值
        axios({
            method:'GET',
            url:'/queryEveryDay',
        }).then(function(resp){
            everyDay.content = resp.data.data[0].content
            console.log(resp.data.data[0].content);
        }).catch(function(resp){
            console.log('请求失败');
        })
    }
})

var articleList = new Vue({
    el:'#articleList',
    data:{
        page:1,
        pageSize:5,
        count:100,
        pageNumList:[],
        articleList:[
            {
                title:'php hexdec超大数值的16进制转10进制',
                content:"使用php内置的hexdec函数在把超大的十六进制转换到十进制整型表示时，结果值如果超出平台整型的最大值时，可能会丢失精度",
                date:'2019-08-02',
                views:'705',
                tags:'test1 test2',
                id:'1',
                link:''
            }
        ]
    },
    computed:{
        jumpTo:function(){
            return function(page){
                this.getPage(page, this.pageSize)
            }
        },
        getPage:function(){
            return function(page, pageSize){
                var searcheUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
                if(searcheUrlParams == ''){
                    return;
                }
                var tag = "";
                for(var i = 0; i < searcheUrlParams.length; i++){
                    if(searcheUrlParams[i].split('=')[0] == 'tag'){
                        try{
                            tag = searcheUrlParams[i].split('=')[1];
                        }catch(e){
                            console.log(e);
                        }
                    }
                }
                if(tag == ''){   //不是查询情况，只是普通的展示博客文章列表
                    axios({
                        method:'get',
                        url:'/queryBlogByPage?page=' + (page - 1) + '&pageSize=' + pageSize,
                    }).then(function(resp){
                        console.log(resp.data.data)
                        var result = resp.data.data;
                        var list = [];
                        for(var i = 0; i < result.length; i++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime; 
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function(resp){
                        console.log('请求错误')
                    });
                    axios({
                        method:'get',
                        url:'/queryBlogCount',
                    }).then(function(resp){
                        console.log(resp);
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    }).catch(function(resp){
                        console.log('请求错误')
                    })
                }else{
                    axios({
                        method:'get',
                        url:'/queryByTag?page=' + (page - 1) + '&pageSize=' + pageSize + '&tag=' + tag,
                    }).then(function(resp){
                        console.log(resp.data.data)
                        var result = resp.data.data;
                        var list = [];
                        for(var i = 0; i < result.length; i++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime; 
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function(resp){
                        console.log('请求错误')
                    });
                    axios({
                        method:'get',
                        url:'/queryByTagCount?tag=' + tag,
                    }).then(function(resp){
                        console.log(resp);
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    }).catch(function(resp){
                        console.log('请求错误')
                    })
                }
            }
        },
        generatePageTool:function(){
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:"<<", page:1});
            if(nowPage > 2){
                result.push({text:nowPage - 2, page:nowPage - 2});
            }
            if(nowPage > 1){
                result.push({text:nowPage - 1, page:nowPage - 1});
            }
            result.push({text:nowPage, page:nowPage});
            if(nowPage + 1 <= (totalCount + pageSize -1) / pageSize){
                result.push({text:nowPage + 1, page:nowPage + 1})
            }
            if(nowPage + 2 <= (totalCount + pageSize -1) / pageSize){
                result.push({text:nowPage + 2, page:nowPage + 2})
            }
            result.push({text:">>",page:parseInt((totalCount + pageSize -1) / pageSize)})
            this.pageNumList = result;
            return result;
        }
    },
    created:function(){
        this.getPage(this.page, this.pageSize)
    }
})