/* 
* @Author: anchen
* @Date:   2016-04-28 14:04:52
* @Last Modified by:   anchen
* @Last Modified time: 2016-07-26 20:17:29
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

    //田字格
    var isTianzige = 0;  //0是未展开，1是展开
    $('.tianzige').on('click', function() {
        event.preventDefault();
        /* Act on the event */
        if(isTianzige == 0){
            $('.wordcard_jiexi_container').fadeOut(175,function(){
                $('.chinesegrid').fadeIn(200);
            });
            isTianzige = 1;
        } else if (isTianzige == 1){
            $('.chinesegrid').fadeOut(175,function(){
                $('.wordcard_jiexi_container').fadeIn(200);
            });
            isTianzige = 0;
        }
    });
    //如果是田字格状态
    $('.duomeiti').on('click', function() {
        event.preventDefault();
        /* Act on the event */
        if (isTianzige == 1){
            $('.chinesegrid').fadeOut(175,function(){
                $('.wordcard_jiexi_container').fadeIn(200);
            });
            isTianzige = 0;
        }
    });
    // 田字格底部交互
    var tzgCurrentIndex = 0;
    $('.gridmode_option').on('click', function() {
        event.preventDefault();
        /* Act on the event */
        var thisDom = $(this);
        var index = thisDom.index();
        $('.gridmode_option').removeClass('on');
        thisDom.addClass('on');
        if(index == 0 || index == 1){
            $('.chinesegrid_write_gridnum_single').removeClass('hide_dom');
            $('.chinesegrid_write_gridnum_eight').addClass('hide_dom');
            if(index == 0){
                $('.chinesegrid_write_gridnum_single').addClass('hide_line');
            }else if (index == 1){
                $('.chinesegrid_write_gridnum_single').removeClass('hide_line');
            }  
        } else if (index==2){
            $('.chinesegrid_write_gridnum_single').addClass('hide_dom');
            $('.chinesegrid_write_gridnum_eight').removeClass('hide_dom');
        }
    });

    //田字格on，off切换
    $('.tzg_switch.gridword_show').on('click', function() {
        event.preventDefault();
        /* Act on the event */
        $(this).toggleClass('on');
        $('.tzg_show_canvas').toggleClass('hide_dom');
    });
    $('.tzg_switch.gridhelp_line').on('click', function() {
        event.preventDefault();
        /* Act on the event */
        $(this).toggleClass('on');
        $('.wordwrap_inner').toggleClass('hide_dom');
    });

    //橡皮擦UE
    $('.icon_xpc').on('click', function() {
        event.preventDefault();
        /* Act on the event */
        $('.write_tool').removeClass('on');
        $(this).parents('.write_tool').addClass('on');
        $('.xpc_type_container').removeClass('hide_dom');
    });
    $('.xpc_clearall').on('click', function() {
        event.preventDefault();
        /* Act on the event */
        $('.chinesegrid_pop').removeClass('hide_dom');
    });
    $('.xpc_ordi').on('click', function() {
        event.preventDefault();
        /* Act on the event */
        $('.xpc_ordi').removeClass('hide_dom');
        $('.xpc_type_container').addClass('hide_dom');
    });
    $('.btn_gridprom_tip').on('click', function() {
        event.preventDefault();
        /* Act on the event */
        $('.chinesegrid_pop').addClass('hide_dom');
        $('.xpc_type_container').addClass('hide_dom');
        $('.write_tool').removeClass('on');
        $('.write_tool:nth-of-type(1)').addClass('on');
    });
    
});