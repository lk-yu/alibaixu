//给文件域绑定change事件
$('#file').on('change', function () {
    //获取用户选择到的文件
    let file = this.files[0]
    // console.log(file);
    //创建formData对象实现二进制文件上传
    let formData = new FormData();
    formData.append('image',file);
    //向服务器发送请求 实现图片上传
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        //告诉ajax方法，不要处理formData参数的格式
		processData: false,
        //告诉ajax不设置文件类型
        contentType: false,
        success:function (params) {
            // console.log(params);
            $('#image').val(params[0].image)
        }
    })
})
//提交添加完成表单功能
$('#slidesForm').on('submit',function(e){
    //阻止表单默认提交行为
    e.preventDefault();
    //获取登录用户在表单中输入的内容
    let formData = $(this).serialize();
    // console.log(formData);
    //向服务器端发送请求 添加轮播图数据
    $.ajax({
        type:'post',
        url:'/slides',
        data:formData,
        success:function(){
            //请求成功 刷新页面
            location.reload();
        }
    })
})
//向服务器发送请求 获取轮播图列表数据
$.ajax({
    type:'get',
    url:'/slides',
    success:function(res){
        // console.log(res);
        let html = template('slidesTpl',{lis:res});
        console.log(html);
        $('#slidesBox').html(html);
    }
})
//删除轮播图功能事件 动态生成事件委托绑定
$('#slidesBox').on('click','.del',function(){
    let id = $(this).attr('data-id');
    // alert(id);
    //向服务器发送请求 实现轮播数据删除功能
    $.ajax({
        type:'delete',
        url:'/slides/' + id,
        success:function(){
            location.reload();
        }
    })
    
})
