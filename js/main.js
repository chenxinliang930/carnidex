$(document).ready(function (){
    var images = [
        // "https://img.alicdn.com/tfs/TB1ZznpbeuSBuNjy1XcXXcYjFXa-1920-718.jpg",
       "http://www.gmmc.com.cn/img/banner/201808tmall/pc.jpg",
        "http://www.gmmc.com.cn/img/banner/outlander718/pc.jpg",
        "http://www.gmmc.com.cn/img/banner/phev78gcyh/1920890.jpg"
    ];
    
    var browserWidth = document.body.clientWidth;
    var imageNum = images.length;
    var curIndex = 1;
    var timer;
    var isTimer = true;
    $('.bannerUl li').width(browserWidth);              //获取浏览器的宽度
    $('.bannerUl').width(browserWidth * (imageNum + 2));            //获取所有图片的应占的总宽度
    $('.blockClick').width(35 * imageNum + 7 * (imageNum - 1));        //设置点击块的总宽度
    $('.bannerUl').css('margin-left', -browserWidth + 'px');
    
    $.each(images, function(index, item) {
        $('.bannerUl').append("<li><img src="+item+" width="+browserWidth+" /></li>");
        var active = index == 0 ? 'active' : '';
        $('.blockClick').append("<li data-index="+ ++index +" class="+active+"></li>")
    })
    $('.bannerUl').append("<li><img src="+images[0]+" width="+browserWidth+" /></li>");
    $('.bannerUl').prepend("<li><img src="+images[images.length - 1]+" width="+browserWidth+" /></li>");
    setTimeout(function() {
        $('.indexBanner>p').css('display', 'block');
        $('.indexBanner>p').css('top',$('.bannerUl').height()/2 - 25 + 'px');
        $('.blockClick').css('margin-top', $('.bannerUl').height() - 31 + 'px');
    }, 500);

    $(window).resize(function(e) {
        browserWidth = document.body.clientWidth;
        $('.bannerUl li').width(browserWidth);              //获取浏览器的宽度
        $('.bannerUl').width(browserWidth * (imageNum + 2));            //获取所有图片的应占的总宽度

        $('.bannerUl li img').width(browserWidth);
        $('.indexBanner>p').css('top',$('.bannerUl').height()/2 - 30 + 'px');
        $('.blockClick').css('margin-top', $('.bannerUl').height() - 31 + 'px');

        clearInterval(timer);
        $('.bannerUl').stop(false,false)
        $('.bannerUl').css('margin-left',-(curIndex) * browserWidth + 'px');
    })

    //轮播动
    function actionBanner(activeWidth) {
        $('.bannerUl').animate({
            "margin-left": activeWidth
        }, 400, function() {
            var left = parseInt($('.bannerUl').css('margin-left').split('px')[0]);
            if( -left == browserWidth * (imageNum + 1)) {
                $('.bannerUl').css('margin-left', -browserWidth + 'px');
                left = -browserWidth;
            }

            if( left == 0) {
                $('.bannerUl').css('margin-left', -browserWidth * imageNum + 'px');
                left = -browserWidth * imageNum;
            }
            curIndex = (-left / browserWidth);
            $.each($('.blockClick li'), function(index, item) {
                $(item).removeClass('active')
                if ($(item).data('index') == curIndex) {
                    $(item).addClass('active');
                }
            })
            if (isTimer) {
                startIntrtval();
            }
        })
    }

    //计算banner动画距离
    function getMoveWidth() {
        var moveWidth = -(curIndex) * browserWidth;
        actionBanner(moveWidth);
    }

    //启动定时器
    function startIntrtval() {
        timer = setTimeout(function() {
            clearInterval(timer);
            var moveWidth = -(curIndex + 1) * browserWidth;
            actionBanner(moveWidth);
        },3000)
    }

    startIntrtval();

    $('.blockClick li').on('click', function(e) {
        clearInterval(timer);
        $('.bannerUl').stop(false,false)
        $.each($('.blockClick li'), function(index, item) {
            $(item).removeClass('active')
        })
        $(this).addClass('active');
        curIndex = parseInt($(this).data('index'));
        getMoveWidth();
    })

    $('.indexBanner>p').on('click', function(e) {
        clearInterval(timer);
        $('.bannerUl').stop(false,true)
        if ($(e.target).hasClass('left')) {
            curIndex = --curIndex;
            getMoveWidth();
        } else {
            curIndex += 1;
            getMoveWidth();
        }
    })

    $('.indexBanner').on('mouseover', function() {   //鼠标滑到轮播区域停止轮播
        clearInterval(timer);
        isTimer = false;
    })
    $('.indexBanner').on('mouseout', function(e) {
        if (!isTimer) {
            isTimer = true;
            startIntrtval();
        }
    })



})
     // 获取元素
  var box = my$('box');
  var screen = box.children[0];
  var ul = screen.children[0];
  var ol = screen.children[1];


  // 箭头 arrow
  var arr = my$('arr');
  var arrLeft = my$('left');
  var arrRight = my$('right');

  // 图片的宽度
  var imgWidth = screen.offsetWidth/3;

  // 1 动态生成序号
  // 页面上总共有多少张图片    5 没有克隆的li
  var count = ul.children.length;
  for (var i = 0; i < count; i++) {
    var li = document.createElement('li');
    ol.appendChild(li);
    setInnerText(li, i + 1);
    // 2 点击序号 动画的方式 切换图片
    li.onclick = liClick;

    // 让当前li记录他的索引
    // 设置标签的自定义属性
    li.setAttribute('index', i);
  }
  function liClick() {
    // 2.1 取消其它li的高亮显示，让当前li高亮显示
    for (var i = 0; i < ol.children.length; i++) {
      var li = ol.children[i];
      li.className = '';
    }
    // 让当前li高亮显示
    this.className = 'current';
    // 2.2 点击序号，动画的方式切换到当前点击的图片位置
    
    // 获取自定义属性
    var liIndex = parseInt(this.getAttribute('index'));
    animate(ul, -liIndex * imgWidth);

    // 全局变量index  和 li中的index保持一致
    index = liIndex;
  }
  // 让序号1高亮显示
  ol.children[0].className = 'current';

  // 3 鼠标放到盒子上显示箭头
  box.onmouseenter = function () {
    // arr.style.display = 'block';
    // 清除定时器
    clearInterval(timerId);
  }

  box.onmouseleave = function () {
    // arr.style.display = 'none';
    // 重新开启定时器
    timerId = setInterval(function () {
      arrRight.click();
    }, 2000);
  }
  // 4 实现上一张和下一张的功能
  // 下一张
  
  var index = 0; // 第一张图片的索引
  arrRight.onclick = function () {
    // 判断是否是克隆的第一张图片，如果是克隆的第一张图片，此时修改ul的坐标，显示真正的第一张图片
    if (index === count) {
      ul.style.left = '0px';
      index = 0;
    }
    // 
    // 总共有5张图片，但是还有一张克隆的图片  克隆的图片的索引是5
    // 4 < 5
    index++;
    if (index < count) {
        // animate(ul, -index * imgWidth);
        // //
        // 获取图片对应的序号，让序号点击
        ol.children[index].click();
    } else {
      //如果是最后一张图片 以动画的方式，移动到克隆的第一张图片
      animate(ul, -index * imgWidth);
      // 取消所有序号的高亮显示，让第一序号高亮显示
      for (var i = 0; i < ol.children.length; i++) {
        var li = ol.children[i];
        li.className = '';
      }
      ol.children[0].className = 'current';
    }
  }
  // 上一张
  arrLeft.onclick = function () {
    // 如果当前是第一张图片，此时要偷偷的切换到最后一张图片的位置（克隆的第一张图片）
    if (index === 0) {
      index = count;
      ul.style.left = - index * imgWidth + 'px';
    }

    index--;
    ol.children[index].click();

    // // 如果不是第一张的话 index--
    // if (index > 0) {
    //   index--;
    //   // animate(ul, -index * imgWidth);
    //   ol.children[index].click();
    // }
  }

  // 无缝滚动
  // 获取ul中的第一个li
  var firstLi = ul.children[0];
  var secondLi = ul.children[1];
  var thirdLi = ul.children[2];
  // 克隆li  cloneNode()  复制节点  
  // 参数  true  复制节点中的内容
  //       false  只复制当前节点，不复制里面的内容
  var cloneLi = firstLi.cloneNode(true);
  var cloneLitwo = secondLi.cloneNode(true);
  var cloneLithree = thirdLi.cloneNode(true);

  ul.appendChild(cloneLi);
  ul.appendChild(cloneLitwo);
  ul.appendChild(cloneLithree);


  // 5 自动切换图片
  var timerId = setInterval(function () {
    // 切换到下一张图片
    arrRight.click();
  }, 2000);
