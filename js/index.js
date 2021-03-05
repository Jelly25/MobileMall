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
  // 搜索框获得焦点，value值为空，失去焦点value值为默认内容
  $('.search-content .search input').on('focus', function () {
    $(this).val('');
    $(this).prop('placeholder', '');
  });
  $('.search-content .search input').on('blur', function () {
    $(this).prop('placeholder', '儿童服饰春季上新');
  });
  // 点击搜索进入搜索页面
  $('.search-content .login').on('click', function () {
    var keywords = $(this).siblings('.search').find('input').val();
    if (keywords === '') {
      alert('请输入要查询的商品');
      return false;
    } else {
      window.location.href = '/mobileWeb/search.html?key=' + keywords;
    }
  })
  // 功能入口
  $('.home nav').on('click', 'a', function () {
    alert('该功能模块暂未开放，敬请期待');
  })
  // 换一批
  var fa = 0;
  $('.recommend_top span').on('click', function () {
    if (fa === 0) {
      $(this).parent().siblings('.recommend_bottom').children('img').prop('src', 'upload/recommend2.gif');
      fa = 1;
    } else if (fa === 1) {
      $(this).parent().siblings('.recommend_bottom').children('img').prop('src', 'upload/recommend3.gif');
      fa = 2;
    } else {
      $(this).parent().siblings('.recommend_bottom').children('img').prop('src', 'upload/recommend1.gif');
      fa = 0;
    }
  })
  // ajax请求数据
  $.ajax({
    url: 'backdata.php',
    success: function (data) {
      // console.log(data);
      // console.log(template('template', data));
      $('.home #gallery-wrapper').append(template('template', data));
      // 添加到购物车
      $('.white-panel .btm .addcar').on('click', function () {
        // 创建小li
        var li = $('<li><input type = "checkbox" class="checkbox_single"><div class="imgbox"><img src="' + $(this).parent().siblings('.thumb').prop('src') + '" alt=""></div><div class="details"><div class="details_title">' + $(this).parent().siblings('p').text() + '</div><div class="details_sort">' + $(this).parent().siblings('h2').text() + '</div><div class="details_price"><span class="good_price">' + $(this).siblings('h3').text() + '</span><div class="btn"><button class="decrement">-</button><span class="number">1</span><button class="increment">+</button></div></div></div></li>');
        // console.log(li);
        // 添加到ul里
        $('.shopcar ul').append(li);
        //8.购物车为空,显示背景图片
        if ($('.shopcar ul li').length === 0) {
          $('.shopcar .box').css('visibility', 'hidden');
          $('.shopcar .bigbg').show();
        } else {
          $('.shopcar .box').css('visibility', 'visible');
          $('.shopcar .bigbg').hide();
        }
        // 商品数量
        $('.shopcar .box span').html($('.shopcar ul li').length);
        // 单个复选框被选中的个数等于商品个数时，全选状态为选中
        var goodsnum = $('.shopcar ul li').length;
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
      })
    }
  })
  // 返回顶部
  // 页面添加滚动事件
  $(window).on('scroll', function () {
    // 当页面卷去头部距离大于瀑布流商品的offsetTop值时，返回顶部按钮显示，固定定位，否则隐藏
    if ($(this).scrollTop() >= $('.home #gallery-wrapper').offset().top) {
      $('.home .backTop').stop().fadeIn();
      $('.home .backTop').css({
        position: 'fixed',
        top: 500,
        zIndex: 999
      });
      // backTOP添加点击事件
      $('.home .backTop').on('click', function () {
        // 给html和body添加animate动画
        $('html,body').stop().animate({
          scrollTop: 0
        })
      })
    } else {
      $('.home .backTop').stop().fadeOut();
    }
  })

  // 分类页面逻辑
  $('.category .category_list .item_list').on('click', function () {
    var idx = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('.category .category_con .item_con').eq(idx).stop().show().siblings().stop().hide();
  })

  // 会员页面逻辑
  // 倒计时
  var outtime = +new Date('2021-3-6 00:00:00');
  countDown();
  function countDown() {
    var nowtime = +new Date();
    var totalSeconds = (outtime - nowtime) / 1000;
    var h = parseInt(totalSeconds / 60 / 60 % 24);
    h = h < 10 ? '0' + h : h;
    $('.acttitle .time .h').html(h);
    var m = parseInt(totalSeconds / 60 % 60);
    m = m < 10 ? '0' + m : m;
    $('.acttitle .time .m').html(m);
    var s = parseInt(totalSeconds % 60);
    s = s < 10 ? '0' + s : s;
    $('.acttitle .time .s').html(s);
  }
  setInterval(countDown, 1000);

  // 购物车页面逻辑
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
        $('.shopcar .box span').html(goodsnum);
      })
    } else {
      $('.shopcar .footer .right').stop().show().siblings('.del').stop().hide();
      flag = true;
    }
  })
  // 9.去逛逛
  $('.shopcar .bigbg .seemore').on('click', function () {
    window.location.href = '/mobileWeb/index.html';
  })
  // 8.购物车为空,显示背景图片
  if ($('.shopcar ul li').length === 0) {
    $('.shopcar .box').css('visibility', 'hidden');
    $('.shopcar .bigbg').show();
  }
})