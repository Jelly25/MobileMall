$(function () {
  // fastclick
  FastClick.attach(document.body);
  // tab栏添加点击事件
  $('.tab_list').on('click', '.item', function () {
    var index = $(this).index();
    $('.tab_con .item').eq(index).stop().show().siblings().stop().hide();
    // 点击item添加current类,其余兄弟移除current类
    $(this).addClass('current').siblings().removeClass('current')
  })
  // 首页页面逻辑
  // 功能入口
  $('.home nav').on('click', 'a', function () {
    alert('该功能模块暂未开放，敬请期待')
  })
  // 换一批
  $('.recommend_top span').on('click', function () {
    $(this).parent().siblings('.recommend_bottom').children('img').prop('src', 'upload/recommend2.gif')
  })
  // 购物车页面逻辑
  // 页面padding-bottom

  // 1.购物车商品数量
  var goodsnum = $('.shopcar ul li').length;
  $('.shopcar .box span').html(goodsnum);
  // 2.全选与反选功能
  $('.shopcar .footer .left .checkbox_multi').on('change', function () {
    // 单个商品的复选框的checked属性跟着全选按钮的checked属性走
    $('.shopcar ul li .checkbox_single').prop('checked', $(this).prop('checked'));
    totalPrice();
  })
  // 单个复选框被选中的个数等于商品个数时，全选状态为选中
  $('ul li .checkbox_single').on('change', function () {
    // 单个复选框被选中的个数
    var checkednum = $('ul li .checkbox_single:checked').length;
    if (checkednum === goodsnum) {
      $('.shopcar .footer .left .checkbox_multi').prop('checked', true);
    } else {
      $('.shopcar .footer .left .checkbox_multi').prop('checked', false);
    }
    totalPrice();
  })
  // 3.增加减少商品数量
  // 拿到当前商品的单价
  var unit_price = parseInt($('.good_price').text().substr(1));
  $('ul li .details .details_price .btn .increment').on('click', function () {
    var goodnum = $(this).siblings('.number').html();
    goodnum++;
    $(this).siblings('.number').html(goodnum);
    // 4.商品价格变化
    // 与数量相乘,得到总价
    $(this).parent().siblings('.good_price').text('￥' + (unit_price * goodnum).toFixed(2));
    // 调用求和
    totalPrice();
  })
  $('ul li .details .details_price .btn .decrement').on('click', function () {
    var goodnum = $(this).siblings('.number').html();
    if (goodnum <= 1) {
      return false;
    } else {
      goodnum--;
      $(this).siblings('.number').html(goodnum);
      // 4.商品价格变化
      $(this).parent().siblings('.good_price').text('￥' + (unit_price * goodnum).toFixed(2))
      // 调用求和
      totalPrice();
    }
  })
  // 5.计算总价
  function totalPrice() {
    var money = 0;//总价
    $('ul li .checkbox_single:checked').each(function (i, ele) {
      var goods_price = parseFloat($(ele).siblings('.details').find('.good_price').text().substr(1));
      money += goods_price;
    })
    $('.shopcar .footer .right .total_price').text('￥' + money.toFixed(2));
  }
  //6.结算
  $('.shopcar .footer .right .checkout').on('click', function () {
    var total = $('.shopcar .footer .right .total_price').text().substr(1);
    if (total == 0) {
      alert('您还没有选择要购买的商品！');
      return false;
    } else {
      alert('购买成功，本次花费了' + total + '元')
    }
  })
  //7.点击管理切换为移除商品，
  var flag = true;
  $('.shopcar .header span').on('click', function () {
    if (flag) {
      $('.shopcar .footer .right').stop().hide().siblings('.del').stop().show();
      flag = false;
      // 实现移除功能
      $('.shopcar .footer .del').on('click', function () {
        $('ul li .checkbox_single:checked').each(function (i, ele) {
          $('.shopcar .footer .right .total_price').text('￥0.00');
          $(ele).parent().remove();
        })
        //8.购物车为空,显示背景图片
        if ($('.shopcar ul li').length === 0) {
          $('.shopcar .box').css('visibility', 'hidden');
          $('.shopcar .bigbg').show();
        }
        // 商品数量
        goodsnum = $('.shopcar ul li').length;
        $('.shopcar .box span').html(goodsnum)
      })
    } else {
      $('.shopcar .footer .right').stop().show().siblings('.del').stop().hide();
      flag = true;
    }
  })
  // 9.去逛逛
  $('.shopcar .bigbg .seemore').on('click', function () {

  })
})