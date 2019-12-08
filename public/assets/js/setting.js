//绑定change 事件 获取用户选择到的图片
$('#logo').on('change', function () {
    // alert(1)
    //获取用户选择到的图片
    let file = this.files[0];
    // console.log(file);
    //创建formData对象 实现图片二进制上传
    let formData = new FormData();
    //将用户选择到的图片添加到formData对象中
    formData.append('logo', file);
    //向服务器端发送请求 实现文件上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉ajax方法,不要处理formData参数的格式
        processData: false,
        //告诉ajax方法不设置文件类型
        contentType: false,
        success: function (res) {
            //将图片的路径保存在文件域中
            $('#hiddenLogo').val(res[0].logo)
            //将logo图片显示在页面中
            $('#preview').prop('src', res[0].logo)
        }
    })

})
//实现添加站点功能,表单提交
$('#settingsForm').on('submit', function (e) {
    //阻止默认提交事件
    e.preventDefault()

    function serializeObj(e) {
        var arr = e.serializeArray();
        var obj = {};
        arr.forEach((item) => {
            obj[item.name] = item.value;
        });
        return obj;
    }
    let res = serializeObj($(this));
    if (!res.comment) {
        res.comment = false;
    };
    if (!res.review) {
        res.review = false;
    }
    $.ajax({
        type: 'post',
        url: '/settings',
        data: res,
        success: function () {
            location.reload();
        }
    })

})

//向服务器发送请求 获取数据
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (res) {
        console.log(res);

        if (res) {
            //将logo的地址放到隐藏域中
            $('#hiddenLogo').val(res.logo);
            //将logo显示在页面中
            $('#preview').prop('src', res.logo);
            //将网站标题显示在页面中
            $('#site_name').val(res.title);
            //渲染站点描述显示在页面中
            $('#site_description').val(res.description);
            //渲染站点关键词显示在页面中
            $('#site_keywords').val(res.keywords);
            // 是否开启评论功能显示在页面中
            $('#comment_status').prop('checked', res.comment);
            // 是否经过人工审核显示在页面中
            $('#comment_reviewed').prop('checked', res.review);
        }
    }
})