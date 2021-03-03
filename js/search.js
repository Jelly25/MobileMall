$(function () {
  // 顶部导航条
  // window.location.search获得传递过来的key参数，并放到title里
  var keyword = window.location.search.substr(1).split('=')[1];
  keyword = decodeURIComponent(keyword);
  $('.topbar .title').text(keyword)
  // 返回功能 location.assign()
  $('.topbar .back').on('click', function () {
    window.location.assign('/mobileWeb/index.html');
  })
})