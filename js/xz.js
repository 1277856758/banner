class BannerCompont {
    constructor(props) {
        this.default = {
            bannerWrap: 'banner',
            banInser: 'bannerInser',
            banBut: 'arrow',
            direction: 'transverse',
            arr: [
                {   //  1
                    width:200,
                    height: 110,
                    top:0,
                    left:0,
                    opacity:0,
                    zIndex:0
                },
                {  // 2
                    width:200,
                    height: 110,
                    top:0,
                    left:0,
                    opacity:80,
                    zIndex:3
                },
                {   // 3
                    width:400,
                    height: 300,
                    top:150,
                    left:0,
                    opacity:100,
                    zIndex:4
                },
                {  // 4
                    width:200,
                    height: 110,
                    top:490,
                    left:0,
                    opacity:80,
                    zIndex:3
                },
                {   //5
                    width:200,
                    height: 110,
                    top:490,
                    left:0,
                    opacity:0,
                    zIndex:0
                }
            ]
        }
        Object.assign(this.default, props)
        this.install()
    }
  
    install () {
        this.slide = document.getElementById("banner");
        this.liArr = this.slide.getElementsByTagName("li");
        this.arrow = this.slide.children[1];
        this.btn = Object.values(this.arrow.children);
        //创建一个flag变量，开闭原则，为了再点击按钮完成所有样式之后才可以继续点击
        this.flag = true;
        this.initial();
        this.watchClick();
        this.mouseenter();
        this.mouseleave();
    }

    initial () {
        let boxW = parseInt(this.getStyle(this.slide,'width'));
        let boxH = parseInt(this.getStyle(this.slide,'height'));
        console.log(boxH, boxW*0.6)
        if (this.default.direction === 'vertical'){
            this.btn[0].style.top = 0;
            this.btn[0].style.left = 0;
            this.btn[0].style.height = this.default.arr[0].height + 'px';
            this.btn[0].style.width = this.default.arr[0].width + 'px';
            this.btn[1].style.top = this.default.arr[4].top + 'px';
            this.btn[1].style.height = this.default.arr[4].height + 'px';
            this.btn[1].style.width = this.default.arr[4].width + 'px';
            this.btn[1].style.left = 0;
        } else {
            let w1 = boxW*0.6
            let w2 = (boxW - w1)/2;
            let h1 = boxH
            let h2 = boxH*0.3;

            let l1 = w2 + 10;
            let l2 = w2 + 10 * 2  + w1;

            let t2 =  boxH/2;
            console.log(t2)

            this.default.arr[0].height = h2;
            this.default.arr[1].height = h2;
            this.default.arr[2].height = h1;
            this.default.arr[3].height = h2;
            this.default.arr[4].height = h2;

            this.default.arr[0].width = w2;
            this.default.arr[1].width = w2;
            this.default.arr[2].width = w1;
            this.default.arr[3].width = w2;
            this.default.arr[4].width = w2;

            this.default.arr[0].top = t2;
            this.default.arr[1].top = t2;
            this.default.arr[2].top = 0;
            this.default.arr[3].top = t2;
            this.default.arr[4].top = t2;

            this.default.arr[0].left = 0;
            this.default.arr[1].left = 0;
            this.default.arr[2].left = l1;
            this.default.arr[3].left = l2;
            this.default.arr[4].left = l2;
            console.log(this.default.arr)
        }
        this.move();
        //页面加载样式
        // for(let i=0;i<liArr.length;i++){
        //     //利用数组中的JSON语句，给图片设置样式
        //     this.animate(liArr[i],{
        //         "width":arr[i].weight,
        //         "width":arr[i].height,
        //         "top":arr[i].top,
        //         "left":arr[i].left,
        //         "opacity":arr[i].opacity,
        //         "zIndex":arr[i].zIndex
        //     });
        // }
    }

    mouseenter () {
        this.slide.onmouseenter = () => {
            this.animate(this.arrow,{"opacity":100});
        };
    }

    mouseleave () {
        this.slide.onmouseleave = () => {
            this.animate(this.arrow,{"opacity":0});
        };
    }

    watchClick () {
        let _this = this,
            btn =  this.btn;
        for(let k in btn){
            btn[k].onclick = function(){
                //判断按钮是哪一个，
                //如果按钮的className是prev，为move传递一个布尔值为true的参数，表示他是左侧；
                //反之传递false，表示他是右侧按钮
                if(this.className === "prev"){
                    if(_this.flag){
                        //点击之后将flag设置为false，这样在这个样式完全显示之前点击按钮没有变化
                        _this.flag = false;
                        _this.move(true);
                    }
                }else{
                    if(_this.flag){
                        _this.flag = false;
                        _this.move(false);
                    }
                }
            };
        }
    }

    move(bool){
        let _this = this,
            liArr = this.liArr,
            arr =  this.default.arr;
        if(bool === true || bool === false){
            if(bool){
                //上一张，将第一个样式删除放到数组的最后位置
                arr.push(arr.shift());
            }else{
                //下一张，将最后一个样式删除放在数组的最前面
                arr.unshift(arr.pop());
            }
        }
        //之后再次给图片设置样式
        for(var i=0;i<liArr.length;i++){
            //利用数组中的JSON语句，给图片设置样式
            this.animate(liArr[i],arr[i],function(){
                _this.flag = true;
            });
        }
    }

    getStyle (ele,attr) {
        if(window.getComputedStyle){
            return window.getComputedStyle(ele,null)[attr];
        }
        return ele.currentStyle[attr];
    }

    animate (ele,json,fn) {
        let _this = this;
        //先清定时器
        clearInterval(ele.timer);
        ele.timer = setInterval(function () {
            //开闭原则
            let bool = true;
            //遍历属性和值，分别单独处理json
            //attr == k(键)    target == json[k](值)
            for(let k in json){
                //四部
                let leader;
                //判断如果属性为opacity的时候特殊获取值
                if(k === "opacity"){
                    leader = _this.getStyle(ele,k)*100 || 1;
                }else{
                    leader = parseInt(_this.getStyle(ele,k)) || 0;
                }
                //1.获取步长y
                let step = (json[k] - leader)/10;
                //2.二次加工步长
                step = step>0?Math.ceil(step):Math.floor(step);
                leader = leader + step;
                //3.赋值
                //特殊情况特殊赋值
                if(k === "opacity"){
                    ele.style[k] = leader/100;
                    //兼容IE678
                    ele.style.filter = "alpha(opacity="+leader+")";
                    //如果是层级，一次行赋值成功，不需要缓动赋值
                    //为什么？需求！
                }else if(k === "zIndex"){
                    ele.style.zIndex = json[k];
                }else{
                    ele.style[k] = leader + "px";
                }
                //4.清除定时器
                //判断: 目标值和当前值的差大于步长，就不能跳出循环
                //不考虑小数的情况：目标位置和当前位置不相等，就不能清除清除定时器。
                if(json[k] !== leader){
                    bool = false;
                }
            }

            //console.log(1);
            //只有所有的属性都到了指定位置，bool值才不会变成false；
            if(bool){
                clearInterval(ele.timer);
                //所有程序执行完毕了，现在可以执行回调函数了
                //只有传递了回调函数，才能执行
                if(fn){
                    fn();
                }
            }
        },25);
    }

    
}
// window.onload = function(){
//         //arr数组存放图片样式的JSON
//         let arr = [
//             {   //  1
//                 width:200,
//                 top:200,
//                 left:0,
//                 opacity:0,
//                 zIndex:0
//             },
//             {  // 2
//                 width:200,
//                 top:200,
//                 left:0,
//                 opacity:80,
//                 zIndex:3
//             },
//             {   // 3
//                 width:700,
//                 top:50,
//                 left:250,
//                 opacity:100,
//                 zIndex:4
//             },
//             {  // 4
//                 width:200,
//                 top:200,
//                 left:1000,
//                 opacity:80,
//                 zIndex:3
//             },
//             {   //5
//                 width:200,
//                 top:200,
//                 left:1000,
//                 opacity:0,
//                 zIndex:0
//             }
//         ];
//         //获取元素
//         let slide = document.getElementById("banner");
//         let liArr = slide.getElementsByTagName("li");
//         let arrow = slide.children[1];
//         let btn = arrow.children;
//         //创建一个flag变量，开闭原则，为了再点击按钮完成所有样式之后才可以继续点击
//         let flag = true;
    
//         //鼠标移入时左右按钮显示，离开隐藏
//         slide.onmouseenter = function(){
//             animate(arrow,{"opacity":100});
//         };
//         slide.onmouseleave = function(){
//             animate(arrow,{"opacity":0});
//         };
    
//         //页面加载样式
//       for(let i=0;i<liArr.length;i++){
//             //利用数组中的JSON语句，给图片设置样式
//             animate(liArr[i],{
//                 "width":arr[i].width,
//                 "top":arr[i].top,
//                 "left":arr[i].left,
//                 "opacity":arr[i].opacity,
//                 "zIndex":arr[i].zIndex
//             });
//         }
//         //可以使用move函数直接给图片设置样式
//         //move();
    
//         //左右切换图片
//             //点击左侧按钮，将第一个样式删除放到数组的最后位置
//             //点击右侧按钮，将最后一个样式删除放在数组的最前面
//         //使用for...in为按钮绑定事件，或者单独绑定
//         for(let k in btn){
//             btn[k].onclick = function(){
//                 //判断按钮是哪一个，
//                 //如果按钮的className是prev，为move传递一个布尔值为true的参数，表示他是左侧；
//                 //反之传递false，表示他是右侧按钮
//                 if(this.className === "prev"){
//                     if(flag){
//                         //点击之后将flag设置为false，这样在这个样式完全显示之前点击按钮没有变化
//                         flag = false;
//                         move(true);
//                     }
//                 }else{
//                     if(flag){
//                         flag = false;
//                         move(false);
//                     }
//                 }
//             };
//         }
//         //创建函数
//         function move(bool){
//             if(bool === true || bool === false){
//                 if(bool){
//                     //上一张，将第一个样式删除放到数组的最后位置
//                     arr.push(arr.shift());
//                 }else{
//                     //下一张，将最后一个样式删除放在数组的最前面
//                     arr.unshift(arr.pop());
//                 }
//             }
//             //之后再次给图片设置样式
//             for(var i=0;i<liArr.length;i++){
//                 //利用数组中的JSON语句，给图片设置样式
//                 animate(liArr[i],arr[i],function(){
//                     flag = true;
//                 });
//                 /* animate(liArr[i],{
//                     "width":arr[i].width,
//                     "top":arr[i].top,
//                     "left":arr[i].left,
//                     "opacity":arr[i].opacity,
//                     "zIndex":arr[i].zIndex
//                 },function(){
//                     //在这里将flag设置为true
//                     flag = true;
//                 }); */
//             }
//         };
    
//         function getStyle(ele,attr){
//             if(window.getComputedStyle){

//                 return window.getComputedStyle(ele,null)[attr];
//             }
//             return ele.currentStyle[attr];
//         }
    
//         //参数变为3个
//         function animate(ele,json,fn){
//             //先清定时器
//             clearInterval(ele.timer);
//             ele.timer = setInterval(function () {
//                 //开闭原则
//                 let bool = true;
//                 //遍历属性和值，分别单独处理json
//                 //attr == k(键)    target == json[k](值)
//                 for(let k in json){
//                     //四部
//                     let leader;
//                     //判断如果属性为opacity的时候特殊获取值
//                     if(k === "opacity"){
//                         leader = getStyle(ele,k)*100 || 1;
//                     }else{
//                         leader = parseInt(getStyle(ele,k)) || 0;
//                     }
//                     //1.获取步长y
//                     let step = (json[k] - leader)/10;
//                     //2.二次加工步长
//                     step = step>0?Math.ceil(step):Math.floor(step);
//                     leader = leader + step;
//                     //3.赋值
//                     //特殊情况特殊赋值
//                     if(k === "opacity"){
//                         ele.style[k] = leader/100;
//                         //兼容IE678
//                         ele.style.filter = "alpha(opacity="+leader+")";
//                         //如果是层级，一次行赋值成功，不需要缓动赋值
//                         //为什么？需求！
//                     }else if(k === "zIndex"){
//                         ele.style.zIndex = json[k];
//                     }else{
//                         ele.style[k] = leader + "px";
//                     }
//                     //4.清除定时器
//                     //判断: 目标值和当前值的差大于步长，就不能跳出循环
//                     //不考虑小数的情况：目标位置和当前位置不相等，就不能清除清除定时器。
//                     if(json[k] !== leader){
//                         bool = false;
//                     }
//                 }
    
//                 //console.log(1);
//                 //只有所有的属性都到了指定位置，bool值才不会变成false；
//                 if(bool){
//                     clearInterval(ele.timer);
//                     //所有程序执行完毕了，现在可以执行回调函数了
//                     //只有传递了回调函数，才能执行
//                     if(fn){
//                         fn();
//                     }
//                 }
//             },25);
//         };
//     };