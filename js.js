window.onload = function () {
    // 取到各个id，省了很多麻烦（代码长度的问题）
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');// 这里取到的是一个数组，因为buttons下面的是很多个span
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;//自定义属性，为了后面取到 点击的是哪个按钮
    var animated = false;//这里是因为，后面加了一个移动的动画效果，避免多次按，然后效果没了。
    var timer;//存放定时器


//箭头切换，offset是位移量，在调用这个函数的时候，具体传入值
    function animate(offset) {

        animated = true;
        var newLeft = parseInt(list.style.left)+offset;//newLeft是目标值,parseInt(list.style.left)是当前值，list.style.left取到的是一个字符串，parseInt把字符串转为数值

        //切换动画，根据位移来
        var time = 300;//位移总时间
        var interval = 10;//位移间隔时间
        var speed = offset/(time/interval);//每次位移量
        function go() {
            if (speed<0&&parseInt(list.style.left)>newLeft||speed>0&&parseInt(list.style.left<newLeft)){
                list.style.left = parseInt(list.style.left) + speed +'px';
                setTimeout(go,interval);//10ms以后再运行一下go函数。
            }else {
                animated = false;
                list.style.left = newLeft+'px';
                if (newLeft>-600){
                    list.style.left = -3000 + 'px';
                }
                if (newLeft<-3000){
                    list.style.left = -600 +'px';
                }
                // debugger;
            }
        }
        go();

    }
//点击右边的按钮，下一张图片
    next.onclick = function () {
        if (index==5){
            index =1;
        }else {
            index +=1;
        }

        showButton();
        if (!animated){//如果没有动画则执行
            animate(-600);
        }
    }

    prev.onclick = function () {
        if (index==1){
            index = 5;
        }else {
            index-=1;
        }
        showButton();
       if (!animated){
           animate(600);
       }
    }

//小圆点高亮
    function showButton() {
        for(i=0;i<buttons.length;i++){
            //如果当前的圆点亮了，把它的class  on 取消掉，让它不亮
            if (buttons[i].className == 'on')
                buttons[i].className = ' ';
        }//否则就加上class on 让它亮
        buttons[index-1].className = 'on';
    }

//按钮切换
    for (var i =0;i<buttons.length;i++){
        buttons[i].onclick = function () {
            if (this.className == 'on'){//如果点击的这个小按钮，已经亮了，就不做任何改变。on这个类，在css里定义了样式，所以加了on这个class 就会有相应亮的效果。
                return;
            }
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -600*(myIndex-index);//计算了一下，发现，亮和不亮的偏移量可以根据这个来判断。myIndex取到的是目标的index，index是当前的index、

            animate(offset);
            index = myIndex;
            showButton();
        }
    }

    //自动播放：每隔一段时间，自动  按钮切换
    function play() {
        timer=setInterval(function () {
            next.onclick();
        },2000);//每隔两秒，点一下右箭头。setInterval可以多次调用，而setTimeout只能一次调用。
    }
//清除定时器，不再自动播放，在鼠标移上去的时候执行
    function stop() {
        clearInterval(timer);
    }
    container.onmousemove = stop;//鼠标移上来，就不再自动播放，
    container.onmouseout = play;//鼠标移走的时候，就自动播放
    play();//正常的时候让它自动播放
}