/* 
* @Author: anchen
* @Date:   2016-04-28 14:04:52
* @Last Modified by:   anchen
* @Last Modified time: 2016-04-29 13:24:57
*/

$(document).ready(function(){

    //侧边栏笔顺、部首等切换
    $('.menulist .item_left').on('click', function() {
        event.preventDefault();
        /* Act on the event */
        var index=$(this).index();
        // 侧边栏样式变换
        $('.menulist .item_left').removeClass('on');
        $(this).addClass('on');
        
        //左侧显示和隐藏
        $('.cardmain .mainbox .main').addClass('hide_dom');
        $('.cardmain .mainbox .main').eq(index).removeClass('hide_dom');
    });

    //中间多媒体和解析的显示和隐藏
    $('.menulist .item_mid').on('click', function() {
        event.preventDefault();
        /* Act on the event */
        var index=$(this).index();
        // 侧边栏样式变换
        if (index===5) {
            $('.card_media,.card_analyse').addClass('hide_dom');
            $('.card_media').removeClass('hide_dom');
        }else if (index===4) {
            $('.card_media,.card_analyse').addClass('hide_dom');
            $('.card_analyse').removeClass('hide_dom');
        }
        
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            if ($('.cardmain').hasClass('on')) {
                $('.cardmain').removeClass('on');
            }
            
        }else{
            $('.menulist .item_mid').removeClass('on');
            $(this).addClass('on');
            if ($('.cardmain').hasClass('on')) {
                
            }else{
                $('.cardmain').addClass('on');
            }
        }       
    });

    //多媒体状态切换
    $('.mediatab .tab_media_cell').on('click', function() {
        event.preventDefault();
        /* Act on the event */
        //多媒体图标切换
        var index=$(this).index();
        $('.mediatab .tab_media_cell').removeClass('on');
        $(this).addClass('on');

        //多媒体显示和隐藏
        $('.card_media .mediastage .mediabox').addClass('hide_dom');
        $('.card_media .mediastage .mediabox').eq(index).removeClass('hide_dom');
    });
});