---
title: JavaScript基础——原型和原型链
sidebar: auto
categories: 
  - 技术
tags: 
  - JavaScript
date: 2023-01-09 13:36:46
permalink: /pages/3c54f0/
---

> 总结前端工程师需要掌握的Javascript基础知识点
<!-- more -->
# 原型和原型链

## 理解原型设计模式以及`JavaScript`中的原型规则

## `instanceof`的底层实现原理，手动实现一个`instanceof`

### 原理
`instanceof`运算符用于检测构造函数的`prototype`属性是否出现在某个实例对象的原型链上。
### 实现`instanceof`
根据`instanceof`的原理，实现如下：
```javascript
function new_instnce_of(leftValue, rightValue){
  let rightProto = rightValue.prototype; // 取右表达式的 prototype 值
  leftValue = leftValue._proto_; // 取左表达式的 _proto_ 值

  while(true){
    if(leftValue === null){
      return false;
    }
    if(leftValue === rightProto){
      return true
    }
    leftValue = leftValue._proto_
  }

}
```


## 实现继承的几种方式以及他们的优缺点

### 1、原型链继承

我们使用原型继承时，主要利用sub.prototype=new super，这样连通了子类-子类原型-父类。

核心：将父类的实例作为子类的原型。

```javascript
// 父类，带属性
function Super(){
  this.flag = true
}
// 为了提高复用性，方法绑定在父类原型属性上
Super.prototype.getFlag = function(){
  return this.flag
}

// 来个子类
function Sub（）{
  this.subFlag = false
}

// 实现继承
Sub.prototype = new Super()
// 给子类添加子类特有的方法，注意顺序要在继承之后
Sub.prototype.getSubFlag = function(){
  return this.subFlag
}

// 构造实例
var obj = new Sub();
```
特点：
1、非常纯粹的继承关系，实例是子类的实例，也是父类的实例
2、父类新增原型方法/原型属性，子类都能访问到
缺点：
来自原型对象的应用属性是所有实例共享的，即属性没有私有化，原型上属性的改变会作用到所有的实例上。

### 2、构造函数继承
在构造子类构造函数时内部使用call或apply来调用父类的构造函数

核心：使用父类的的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）
```javascript
function Super(){
  this.flag = true
}
function Sub（）{
  Super.call(this) // 如果父类可以需要接收参数，这里也可以直接传递
}

var obj = new Sub()
obj.flag = false
var obj_1 = new Sub()
console.log(obj.flag) // 依然是true，不会相互影响
```





## 至少说出一种开源项目(如`Node`)中应用原型继承的案例

## 可以描述new一个对象的详细过程，手动实现一个new操作符
 - 创建一个空对象
 - 设置原型链：设置新对象的 constuctor 属性为构造函数的名称，设置新对象的__proto__属性指向构造函数的 prototype 对象
 - 通过this将属性和方法添加到这个对象
 - 返回值：如果无返回值或者返回一个非对象值，则将新对象返回；如果返回值是一个先对象的话那么直接返回该对象

如下实现一个new方法：
```javascript
function NewRelize(){
   //获取构造器 和 构造器后的参数 （数组的shift方法删除第一项，并且返回被删除的项）；删除后arguments就剩下传递的参数了
   let Con=Array.prototype.shift.call(arguments);
   //以构造器的prototype为原型，创建新对象
   let newObj=Object.create(Con.prototype);
   //将新对象和调用参数传给构造器，执行
   let result=Con.apply(newObj,arguments);
   //如果构造器没有手动返回对象，则返回新创建的对象
   return typeof result=='object'?result:newObj;
}
```

```javascript
function Person(name,age){
     this.name=name;
     this.age=age;
}
let newj=NewRelize(Person,'zhangsan',11);
console.log(newj.name);
console.log(newj.age);

```
## 理解`es6` `class`构造以及继承的底层实现原理


## 作用域和闭包

## 理解词法作用域和动态作用域

## 理解`JavaScript`的作用域和作用域链

## 理解`JavaScript`的执行上下文栈，可以应用堆栈信息快速定位问题

## `this` 的原理以及几种不同使用场景的取值

## 闭包的实现原理和作用，可以列举几个开发中闭包的实际应用

## 理解堆栈溢出和内存泄漏的原理，如何防止

## 如何处理循环的异步操作

## 理解模块化解决的实际问题，可列举几个模块化方案并理解其中原理


