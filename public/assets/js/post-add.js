//向服务器端发送请求获取文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (data) {
        // console.log(data);
        let html = template('categoryTpl', {
            data
        })
        $('#category').html(html)
    }
})

//图片上传功能
$('#feature').on('change', function () {
    //获取到用户选择的文件
    let file = this.files[0]
    //通过formData实现图片上传
    let formData = new FormData()
    formData.append('cover', file)
    //请求服务器
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        //告诉ajax方法不要处理data属性对应的参数
        processData: false,
        //不设置参数类型 在formData参数中已经设定好了
        contentType: false,
        success: function (data) {
            // console.log(data);
            //将文件上传的图片地址保存在隐藏域中
            $('#thumbnail').val(data[0].cover)
        }
    })

})

//文件添加功能
//当添加文章表单提交的时候
$('#addForm').on('submit', function () {
    //获取表单中的内容
    let formData = $(this).serialize()
    // console.log(typeof(formData)); //string
    console.log(formData);

    $.ajax({
        url: '/posts',
        type: 'post',
        data: formData,
        success: function () {
            location.href = '/admin/posts.html'
        },
        error: function (err, val) {
            console.log(err);
        }
    })
    //阻止表单默认行为
    return false
})
let id = getUrlParams('id');
// console.log(id);
//当准备做修改文章操作
if (id != -1) {
    //根据id获取文章的详细内容
    $.ajax({
        type:'get',
        url:'/posts/'+ id,
        success:function(res1){
            $.ajax({
                type:'get',
                url:'/categories',
                success:function(res2){
                    res1.res2 = res2;
                    console.log(res1)
                    let html = template('modifyTpl',res1);
                    console.log(html);
                    $('#parentBox').html(html);
                }
            })
        }
    })
}
// 从浏览器的地址中url 获取查询参数
function getUrlParams(params) {
    let paramsArray = location.search.substr(1).split('&');
    //循环这个分割后的数组
    for (let i = 0; i < paramsArray.length; i++) {
        const element = paramsArray[i].split('=');
        if (element[0] == params) {
            return element[1];
        }
    }
    return -1;
}
//当修改完成文章信息表单发生提交行为的时候
$('#parentBox').on('submit', '#modifyForm', function () {
	// 获取管理员在表单中输入的内容
	var formData = $(this).serialize()
	// 获取管理员正在修改的文章id值
	var id = $(this).attr('data-id');
	$.ajax({
		type: 'put',
		url: '/posts/' + id,
		data: formData,
		success: function () {
			location.href = '/admin/posts.html';
		}
	})
	// 阻止表单默认提交行为
	return false;
});