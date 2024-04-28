if (document.body.clientWidth > 992) {
    function getBasicInfo() {
        /* 窗口高度 */
        var ViewH = $(window).height();
        /* document 高度 */
        var DocH = $("body")[0].scrollHeight;
        /* 滚动的高度 */
        var ScrollTop = $(window).scrollTop();
        /* 可滚动的高度 */
        var S_V = DocH - ViewH;
        var Band_H = ScrollTop / (DocH - ViewH) * 100;
        return {
            ViewH: ViewH,
            DocH: DocH,
            ScrollTop: ScrollTop,
            Band_H: Band_H,
            S_V: S_V
        }
    };
    function show(basicInfo) {
        if (basicInfo.ScrollTop > 0.001) {
            $(".neko").css('display', 'block');
        } else {
            $(".neko").css('display', 'none');
        }
    }
    (function ($) {
        $.fn.nekoScroll = function (option) {
            var defaultSetting = {
                top: '0',
                scroWidth: 6 + 'px',
                z_index: 9999,
                zoom: 0.9,
                borderRadius: 5 + 'px',
                right: 60 + 'px',
                // 这里可以换为你喜欢的图片，例如我就换为了雪人，但是要抠图
                nekoImg: "https://raw.githubusercontent.com/fubuki-no-donuts/pic_bed/main/imgs/arona_toTop.png",
                hoverMsg: "喵喵喵~",
                color: "#6f42c1",
                during: 500,
                blog_body: "body",
                imgScaleL: 2
            };
            var setting = $.extend(defaultSetting, option);
            var getThis = this.prop("className") !== "" ? "." + this.prop("className") : this.prop("id") !== "" ? "#" +
                this.prop("id") : this.prop("nodeName");
            if ($(".neko").length == 0) {
                this.after("<div class=\"neko\" id=" + setting.nekoname + " data-msg=\"" + setting.hoverMsg + "\"></div>");
            }
            let basicInfo = getBasicInfo();
            $(getThis)
                .css({
                    'position': 'fixed',
                    'width': setting.scroWidth,
                    'top': setting.top,
                    'height': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 + 'px',
                    'z-index': setting.z_index,
                    'background-color': setting.bgcolor,
                    "border-radius": setting.borderRadius,
                    'right': setting.right,
                    'background-image': 'url(' + setting.scImg + ')',
                    'background-image': '-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)', 'border-radius': '2em',
                    'background-size': 'contain'
                });
            $("#" + setting.nekoname)
                .css({
                    'position': 'fixed',
                    'top': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 - 50 + 'px',
                    'z-index': setting.z_index * 10,
                    'right': setting.right,
                    'background-image': 'url(' + setting.nekoImg + ')',
                });
            show(getBasicInfo());
            $(window)
                .scroll(function () {
                    let basicInfo = getBasicInfo();
                    show(basicInfo);
                    $(getThis)
                        .css({
                            'position': 'fixed',
                            'width': setting.scroWidth,
                            'top': setting.top,
                            'height': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 + 'px',
                            'z-index': setting.z_index,
                            'background-color': setting.bgcolor,
                            "border-radius": setting.borderRadius,
                            'right': setting.right,
                            'background-image': 'url(' + setting.scImg + ')',
                            'background-image': '-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)', 'border-radius': '2em',
                            'background-size': 'contain'
                        });
                    $("#" + setting.nekoname)
                        .css({
                            'position': 'fixed',
                            'top': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 - 50 + 'px',
                            'z-index': setting.z_index * 10,
                            'right': setting.right,
                            'background-image': 'url(' + setting.nekoImg + ')',
                        });
                    if (basicInfo.ScrollTop == basicInfo.S_V) {
                        $("#" + setting.nekoname)
                            .addClass("showMsg")
                    } else {
                        $("#" + setting.nekoname)
                            .removeClass("showMsg");
                        $("#" + setting.nekoname)
                            .attr("data-msg", setting.hoverMsg);
                    }
                });
            this.click(function (e) {
                btf.scrollToDest(0, 500)
            });
            $("#" + setting.nekoname)
                .click(function () {
                    btf.scrollToDest(0, 500)
                });
            return this;
        }
    })(jQuery);

    $(document).ready(function () {
        //部分自定义
        // 在设置 nekoImg 时应用缩放比例
        // $("#myscoll").nekoScroll({
        //     bgcolor: 'rgb(0 0 0 / .5)', //背景颜色，没有绳子背景图片时有效
        //     borderRadius: '2em',
        //     zoom: 0.9,
        // });

        //自定义（去掉以下注释，并注释掉其他的查看效果）
        function isDarkMode() {
            var htmlElement = document.querySelector('html');
            var dataTheme = htmlElement.getAttribute('data-theme');
            return dataTheme == 'dark';
        }


        var aronaImg = 'https://raw.githubusercontent.com/fubuki-no-donuts/pic_bed/main/imgs/arona_top.png';
        var aronaColor = '#1e90ff'; //rgba(30,144,255,1);
        var puranaColor = '#6f42c1'; //rgba(111,66,193,1);
        var puranaImg = 'https://raw.githubusercontent.com/fubuki-no-donuts/pic_bed/main/imgs/purana_top.png';

        // 监听 data-theme 属性变化
        var observer = new MutationObserver(function(mutationsList) {
        for(var mutation of mutationsList) {
            if (mutation.attributeName === 'data-theme') {
                // data-theme 属性发生变化时重新检查暗黑模式
                var isDarkTheme = isDarkMode();
                var colorSet = isDarkTheme ? puranaColor : aronaColor;
                var nekoImgUrl = isDarkTheme ? puranaImg : aronaImg;
                $("#myscoll").nekoScroll({
                    nekoname:'arona',
                    nekoImg: nekoImgUrl,
                    bgcolor: colorSet,
                    zoom:0.9,
                    hoverMsg:'喵~',
                    right:'100px',
                    fontFamily:'楷体',
                    fontSize:'14px',
                    fontColor: colorSet,
                    scroWidth:'8px',
                    z_index:100,
                    during:1200,
                });
                $(".neko").hover(function() {
                    $(this).css("color", colorSet);
                });
        }
        }
        });

        // 监听 html 元素的变化
        observer.observe(document.querySelector('html'), { attributes: true });

        var isDarkTheme = isDarkMode();
        var nekoImgUrl = isDarkTheme ? puranaImg : aronaImg;
        var colorSet = isDarkTheme ? puranaColor : aronaColor;
        $("#myscoll").nekoScroll({
            nekoname:'arona', //nekoname，相当于 id
            nekoImg: nekoImgUrl,
            // nekoImg:'https://raw.githubusercontent.com/fubuki-no-donuts/pic_bed/main/imgs/arona_toTop.png', //neko 的背景图片
            //scImg:"img/绳 1.png", //绳子的背景图片
            bgcolor:colorSet, //背景颜色，没有绳子背景图片时有效
            zoom:0.9, //绳子长度的缩放值
            hoverMsg:'喵~', //鼠标浮动到 neko 上方的对话框信息
            right:'100px', //距离页面右边的距离
            fontFamily:'楷体', //对话框字体
            fontSize:'14px', //对话框字体的大小
            fontColor: colorSet, //对话框字体颜色
            scroWidth:'8px', //绳子的宽度
            z_index:100, //不用解释了吧
            during:1200, //从顶部到底部滑动的时长
        });
        $("#myscoll img").css("transform", "scale(0.5)");
        $(".neko").hover(function() {
            $(this).css("color", colorSet);
        });
        
    })
}