$('#logout').on('click', function () {
  var isConfirm = confirm('您真的要退出吗?');
  if (isConfirm) {
    // alert('用户点击了确认按钮')
    $.ajax({
      type: 'post',
      url: '/logout',
      success: function () {
        location.href = 'login.html';
      },
      error: function () {
        alert('退出失败')
      }
    })
  }
});
// 封装的日期处理函数
template.defaults.imports.formDate = function (date) {
  //date是要处理的日期 是一个字符串类型
  //需要将日期字符串转换成日期对象
  newDate = new Date(date)
  //拼接字符串 并将其返回

  //检测到调用getFullYear()等方法后得到的是number数据类型 
  //padStart()是字符串的方法 所以需要将其转换为字符串
  //实验得到 不能用加引号的方式转换为字符串 要用toString强制转换
  // return typeof(newDate.getMonth()+1) //number 

  // return (newDate.getMonth()+1).toString().padStart(2,'0')
  // return typeof("newDate.getMonth()+1")
  return newDate.getFullYear() + '-' + (newDate.getMonth() + 1).toString().padStart(2, '0') + '-' + newDate.getDate().toString().padStart(2, '0')
}
//封装转化字符串函数
function serializeObj(form) {
  var arr = form.serializeArray();
  var obj = {};
  arr.forEach((item) => {
    obj[item.name] = item.value;
  });
  return obj;
}
//向服务器发送 拿到登陆用户信息
$.ajax({
  type: 'get',
  url: '/users/'+ userId,
  success: function (data) {
    console.log(data);
    //渲染数据至页面
    $('.avatar').prop('src',data.avatar)
    $('.name').html(data.nickName)
  }
})
