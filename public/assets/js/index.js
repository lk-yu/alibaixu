//并行多发请求
$.when(
    //文章总数量获取数据
    $.ajax({
        type: 'get',
        url: '/posts/count'
    }),
    // 分类总数量获取数据
    $.ajax({
        type: 'get',
        url: '/categories/count'
    }),
    // 评论总数量获取数据
    $.ajax({
        type: 'get',
        url: '/comments/count'
    })


).done(function (r1, r2, r3) {
    console.log(r1, r2, r3);
    let html = template('dashboardTpl',{
        r1:r1[0],
        r2:r2[0],
        r3:r3[0]
    })
    $('#dashboardBox').html(html)
})