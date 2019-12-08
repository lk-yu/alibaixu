//向服务器发送请求 获取到评论列表数据
$.ajax({
    type:'get',
    url:'/comments',
    success:function(res){
        // console.log(res)
        let html = template('commentsTpl',res);
        // console.log(html);
        $('#commentsBox').html(html);
        let pageHTML = template('pageTpl',res);
        $('#pageBox').html(pageHTML);
    }
})
//实现分页
function changePage (page) {
	$.ajax({
		type: 'get',
		url: '/comments',
		data: {
			page: page
		},
		success: function (response) {
			// console.log(response)
			var html = template('commentsTpl', response);
			$('#commentsBox').html(html);
			var pageHTML = template('pageTpl', response);
			$('#pageBox').html(pageHTML)
		}
	})
}
//更改评论状态的功能 动态绑定点击事件
$('#commentsBox').on('click','.status',function(){
    //获取当前评论状态
    let status = $(this).attr('data-status');
    // console.log(status);
    //获取当前要修改的评论的id
    let id = $(this).attr('data-id');
    // console.log(id);
    //向服务器端发送请求 更改评论状态
    $.ajax({
        type:'put',
        url:'/comments/' + id,
        data:{
            //当按钮显示是审核,那么当我们电机的时候,就切换状态
            state: status == 0 ? 1 : 0
        },
        success:function(){
            location.reload();
        }
    })
    
})
//实现删除评论功能 动态生成绑定事件
$('#commentsBox').on('click','.del',function(){
    //进行用户二次确认操作
    if (confirm('您真的要进行删除操作么?')) {
        //获取登录用户想要删除的id值
        let id = $(this).attr('data-id')
        // console.log(id);
        // 向服务器发送请求 进行页面操作后更新渲染
        $.ajax({
            url:'/comments/' + id,
            type:'delete',
            //发送请求成功
            success:function(){
                location.reload();
            }
        })
        
    }
})
