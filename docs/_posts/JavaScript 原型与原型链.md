---
title: JavaScript 原型与原型链
date: 2021-10-22 15:30:13
permalink: /pages/b97566/
sidebar: auto
categories:
  - 技术
tags:
  - JavaScript
---

> 继承是所有面向对象语言中的一个重要特性。JavaScript的继承的方式是通过原型链来实现的。本文我会对JavaScript的实例、原型和原型链，以及如何实现继承给出一些自己的理解。
<!-- more -->

## 一、原型（prototype）
原型的概念：每一个javascript对象(除null外)创建的时候，就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型中“继承”属性。
例如：
```javascript
function Person(age){
  this.age = age
}
Person.prototype.name = 'liuxia'
let person1 = new Person(18)
let person2 = new Person(24)
person1.name = 'lx'
console.log(person1.name) // lx
console.log(person2.name) // liuxia
delete person1.name
console.log(person1.name) // liuxia
console.log(person2.name) // liuxia
```
上述例子中，**Person.prototype**指向一个属性集合的对象，而这个对象正是调用构造函数时创建的实例的原型，也就是 person1 和 person2 的原型。

其关系如下图：

![原型](/image/prototype.png)

## 二、__proto__
这是每个对象(除null外)都会有的属性，叫做__proto__，这个属性会指向该对象的原型。
```javascript
function Person() {
......
}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true

```
关系如图：

![__proto__关系图](/image/__proto__.png)

>补充说明：
绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 **Person.prototype** 中，实际上，它是来自于 Object.prototype ，与其说是一个属性，不如说是一个 getter/setter，当使用 **obj.__proto__** 时，可以理解成返回了 **Object.getPrototypeOf(obj)**

## 三、constructor 构造函数

每个原型都有一个constructor属性，指向该关联的构造函数。
```javascript
function Person() {
  ......
}
console.log(Person===Person.prototype.constructor)  //true
```
更新关系如图：

![constructor关系图](/image/constructor.png)

```javascript
function Person() {
......
}
var person = new Person();
console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
// 该实例并没有 constructor，因此会从实例原型中找  constructor
console.log(person.constructor === Person); // true
```
## 四、实例与原型、原型与原型
 当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。
 这里说到的原型的原型，其实也就时原型对象的原型，类似继承中"子与父、父与祖"的关系。

关系如图：

![原型与原型关系图](/image/prototypes.png)


## 五、原型链
简单的回顾一下构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。那么假如我们让原型对象等于另一个类型的实例，结果会怎样？显然，此时的原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立。如此层层递进，就构成了实例与原型的链条。这就是所谓的原型链的基本概念。——摘自《javascript高级程序设计》
所以整个原型链如下图：

![原型链关系图](/image/prototype-chain.png)


>补充说明：Object.prototype 的原型为Null, 也就是整个原型链的末端

## new 一个对象的过程
在《JavaScript模式》这本书中，new的过程说的比较直白，当我们new一个构造器，主要有三步：
- 创建一个空对象，将它的引用赋给 this，继承函数的原型。
- 通过 this 将属性和方法添加至这个对象
- 最后返回 this 指向的新对象，也就是实例（如果没有手动返回其他的对象）

我们先看几个例子

第一个例子：
```javascript
function Person (name) {
  this.name = name
}
let a = new Person('a')
console.log(a.name)   // 输出a
```

第二个例子：

```javascript
function Person(name) {
  let o = {}
  this.name = name 
  return  o
}
let a = new Person('a') 
console.log(a.name )   // 输出undefined
```

第三个例子：

```javascript
function Person(name) {
  this.name = name
  return 'jack'
}
let a = new Person('a')
console.log(a.name) // 输出a
```
我们发现如果在构造函数Person里不写return 语句，它其实隐式的返回当前this所代表的对象。如果写了return，就要分两种情况，如果返回的是一个对象，就直接返回如例子二，如果返回一个非对象，此时内部仍然返回this所代表的对象如例子三。
