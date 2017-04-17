/**
 * Created by jlw on 2016/1/18.
 */

function winSize() {
    var winWidth = 0;
    var winHeight = 0;
    if(document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth){
        winWidth = document.documentElement.clientWidth;
        winHeight = document.documentElement.clientHeight;
    }
    return {
        'width': winWidth,
        'height': winHeight
    };
}

function getRatio() {
    var size = winSize();
    if (size.width / size.height > 1920 / 1200) {
        return size.height / 1200;
    } else {
        return size.width / 1920;
    }
}

function layoutReset(){

    //var htmlEle = document.getElementsByTagName('html')[0];
    var wrapperEle = document.getElementById('wrapper');
    var layoutEle = document.getElementById('layout');
    var defaultWidth = 1920;
    var defaultHeight = 1200;
    var defaultFontSize = 24;

    var resize = function(){
        var idx;
        var handles = window.layoutResetHandles;

        var winSizeValue = winSize();
        var fontSize = 0;
        var wrapperWidth = winSizeValue.width;
        var wrapperHeight = winSizeValue.height;
        //wrapperEle.style.marginTop = 0;
        if(winSizeValue.width/winSizeValue.height <= defaultWidth/defaultHeight){
            fontSize = winSizeValue.width/defaultWidth*defaultFontSize;
            wrapperWidth = winSizeValue.width < defaultWidth ? winSizeValue.width : defaultWidth;
            wrapperHeight = defaultHeight * wrapperWidth / defaultWidth;
            if(winSizeValue.height > wrapperHeight){
                //wrapperEle.style.marginTop = (winSizeValue.height - wrapperHeight) / 2 + 'px'
            }
        }else{
            fontSize = winSizeValue.height/defaultHeight*defaultFontSize;
            wrapperHeight = winSizeValue.height < defaultHeight ? winSizeValue.height : defaultHeight;
            wrapperWidth = defaultWidth * wrapperHeight / defaultHeight;
        }
        // layoutEle.style.width = winSizeValue.width + 'px';
        // layoutEle.style.height = winSizeValue.height + 'px';
        layoutEle.style.fontSize = fontSize + 'px';
        //wrapperEle.style.width = wrapperWidth + 'px';
        //wrapperEle.style.height = wrapperHeight + 'px';

        if(handles) {
            for (idx in handles) {
                handles[idx]();
            }
        }
    };

    resize();
    window.onresize = function(){
        resize();
    }
}

window.onload = function(){
    layoutReset();
};

/**
 * 布局调整事件
 * @param handle
 */
window.onLayoutReset = function(handle) {
    if (!window.layoutResetHandles) window.layoutResetHandles = [];
    window.layoutResetHandles.push(handle);
};

