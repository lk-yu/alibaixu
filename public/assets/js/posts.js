//页面一上来就向服务器端发送请求索要文章列表数据
$.ajax({
    url:'/posts',
    type: 'get',
    success: function (parmas) {
        // console.log(parmas);
        //parmas是一个对象 但是我们查找的是这个parmas里面的一个数组 所以在下面模板中的第二个参数需要以对象形式传递
        //拼接模板引擎
        let html = template('listUserTpl',parmas)              
        // console.log(html);
        //拼接分页模板引擎
        let pages = template('pageTpl',parmas)
        $('#listUser').html(html)
        $('#pagenation').html(pages)
    }
})




//定义点击页码跳转的函数
function changePage(page) {
    // 向服务器端发送请求索要文章列表数据
$.ajax({
    url:'/posts',
    type: 'get',
    //传递分页信息
    data:{
        page:page
    },
    success: function (parmas) {
        console.log(parmas);
        //parmas是一个对象 但是我们查找的是这个parmas里面的一个数组 所以在下面模板中的第二个参数需要以对象形式传递
        //拼接模板引擎
        let html = template('listUserTpl',parmas)              
        // console.log(html);
        //拼接分页模板引擎
        let pages = template('pageTpl',parmas)
        $('#listUser').html(html)
        $('#pagenation').html(pages)
    }
})
}

//文章数据列表筛选功能
//向服务器发送请求索要文章分类信息
$.ajax({
    url:'/categories',
    type:'get',
    success: function (data) {
        console.log(data);
        let html = template('classTpl',{data: data})
        // console.log(html);
        $('#classSlect').html(html);
    }
})

//当用户提交筛选文章表单时
$('#filterForm').on('submit',function () {
    //获取到用户选择的信息
    let formData = $(this).serialize()
    // 向服务器端发送请求索要文章列表数据
    $.ajax({
        url:'/posts',
        type: 'get',
        data: formData,
        success: function (parmas) {
            // console.log(parmas);
            //parmas是一个对象 但是我们查找的是这个parmas里面的一个数组 所以在下面模板中的第二个参数需要以对象形式传递
            //拼接模板引擎
            let html = template('listUserTpl',parmas)              
            // console.log(html);
            //拼接分页模板引擎
            let pages = template('pageTpl',parmas)
            $('#listUser').html(html)
            $('#pagenation').html(pages)
        }
    })


    //阻止表单默认行为
    return false
})
//进行删除文章功能操作
$('#listUser').on('click','.del',function(){
    //弹框 进行二次确认操作
    if (confirm('您真的要进行删除操作吗')) {
        //获取登录用户想要删除的文章id
        let id = $(this).attr('data-id');
        console.log(id);
        //发送请求给服务端 执行删除操作
        $.ajax({
            url:'/posts/' + id,
            type:'delete',
            success:function(){
                location.reload();
            }
        })
        
    }
})