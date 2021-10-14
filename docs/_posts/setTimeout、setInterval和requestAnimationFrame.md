---
title: setTimeout、setInterval和requestAnimationFrame
date: 2021-10-13 17:28:18
permalink: /pages/79ccea/
sidebar: auto
categories:
  - 技术
tags:
  - JavaScript
---

>setTimeout、setInterval和requestAnimationFrame的异同
<!-- more -->

## setTimeout 与 setInterval

>setTimeout() 是延时器，它在执行是，是在载入后延迟指定时间后，执行一次指定方法。

语法：
var timerId = setTimeout(func|code,delay)

func|code 必需，延迟执行的一串代码，或一个函数。

delay 非必需，默认为0，以毫秒计。执行或调用func|code的延迟时间

如果在执行前想取消，可以通过clearTimeout(timerId)来取消
```html
<button onclick="delayFun()">触发延迟弹框</button>
<button onclick="stopFun()">阻止弹框</button>
```
```javascript
let timer;

function delayFun(){
  timer = setTimeout(function(){
    alert('Hello')
  },5000)
}

function stopFun(){
  clearTimeout(timer)
}

```

>setInterval() 是定时器，它在执行时，从载入后开始每隔指定时间就执行一次。

语法：

var timer =  setInterval(func|code,millisec)

func|code 必需。定时执行的一串代码，或一个函数

millisec 必需，以毫秒计。定时执行的间隔时间。

如果想取消定时执行，可以通过clearInterval(timer)来取消

```html
<p>显示时间：<span id="date"></span></p>
<button onclick="stopTime">暂停</button>
```
```javascript
let timer = setInterval(function(){
  let date = new Date()
  var time = date.toLocaleTimeString()
  document.getElementById('date').innerHTML = time

},100)

function stopTime(){
  clearInterval(timer)
}

```
- 注意 使用setInterval会出现触发方法间隔时间越来越段执行频率越来越快的情况。
  
  用网上最普遍的解释就是：JavaScript是运行在单线程的环境中的，所以这就意味着定时器就成了要执行的计划！而不是必须要执行的铁律！ 为啥呢？ 当函数开始执行时在栈中创建出来一个栈帧，这个栈帧的执行是需要时间的，假设有3秒，在这三秒内，JavaScript的单线程特点就会确保在这3秒内全力的专一的去解决掉这个栈帧（函数）。所以在这个函数运行的时候定时器是没有能力终止他的运行的，因此当函数的运行时间大于间隔时间时，间隔时间1秒到了，但是程序还有2秒没有执行完，那你也给我老老实实的等着函数执行完

  我个人得理解就是，setInterval触发的任务可能还在执行过程中，而下一次触发的任务就已经被压入任务队列中了。

## requestAnimationFrame

>requestAnimationFrame(code)，一般用于动画，与 setTimeout 方法类似，区别是 setTimeout 是用户指定的，而 requestAnimationFrame 是浏览器刷新频率决定的，一般遵循 W3C 标准，它在浏览器每次刷新页面之前执行。

语法：

window.requestAnimationFrame(callback)

requestAnimationFrame比起setTimeout和setInterval的优势主要有两点：
1.requestAnimationFrame 会把每一桢中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60桢。

2.在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这就意味着更少的cpu,gpu的内存使用

-注意：IE9不支持改方法

```html
<div id="box" style="bankground:red,width:100px"></div>
<button onclick="animationStart">开始</button>
```
```javascript
let timer

function animationStart(){
  let box = document.getElementById('box')  
  timer = requestAnimationFrame(function fn(){
    if(parseInt(box.style.width) < 500){
      box.style.width = parseInt(box.style.width) + 5 +'px'
      timer = requestAnimationFrame(fn)
    }else{
      cancelAnimationFrame(timer)
    }
  })
}
```
最后一个很有意思的问题：

requestAnimationFrame回调在EventLoop中是宏任务吗？

一下是我觉得比较好的一个答案：[https://github.com/ginobilee/blog/issues/6](https://github.com/ginobilee/blog/issues/6)
