---
title: JavaScript 基础
sidebar: auto
categories: 
  - 技术
tags: 
  - JavaScript
date: 2022-11-11 16:21:08
permalink: /pages/49fb28/
---

> 总结前端工程师需要掌握的Javascript基础知识点
<!-- more -->
## 变量和类型

### JavaScript规定了几种数据类型
目前JS数据类型总共有8种: **Number**、**String**、**Boolean**、**Object**、**null**、**undefined**、**Symbol**、**BigInt**

其中 `Symbol` 是`ES6`新增的一种数据类型。

`BigInt`则是谷歌67版本中还出现了一种数据类型，是指安全存储、操作大整数。


### `JavaScript`对象的底层数据结构是什么

### `Symbol`类型在实际开发中的应用、可手动实现一个简单的`Symbol`

### `JavaScript`中的变量在内存中的具体存储形式

### 基本类型对应的内置对象，以及他们之间的装箱拆箱操作

### 理解值类型和引用类型

### `null` 和 `undefined` 的区别

### 至少可以说出三种判断`JavaScript`数据类型的方式，以及他们的优缺点，如何准确的判断数组类型

### 可能发生隐式类型转换的场景以及转换原则，应如何避免或巧妙应用

### 出现小数精度丢失的原因，`JavaScript`可以存储的最大数字、最大安全数字，`JavaScript`处理大数字的方法、避免精度丢失的方法



## 原型和原型链

### 理解原型设计模式以及`JavaScript`中的原型规则

### `instanceof`的底层实现原理，手动实现一个`instanceof`

### 实现继承的几种方式以及他们的优缺点

### 至少说出一种开源项目(如`Node`)中应用原型继承的案例

### 可以描述new一个对象的详细过程，手动实现一个new操作符

### 理解`es6` `class`构造以及继承的底层实现原理



## 作用域和闭包

### 理解词法作用域和动态作用域

### 理解`JavaScript`的作用域和作用域链

### 理解`JavaScript`的执行上下文栈，可以应用堆栈信息快速定位问题

### `this` 的原理以及几种不同使用场景的取值

### 闭包的实现原理和作用，可以列举几个开发中闭包的实际应用

### 理解堆栈溢出和内存泄漏的原理，如何防止

### 如何处理循环的异步操作

### 理解模块化解决的实际问题，可列举几个模块化方案并理解其中原理



## 执行机制

### 为何`try`里面放`return`，`finally`还会执行，理解其内部机制

### `JavaScript`如何实现异步编程，可以详细描述`EventLoop`机制

### 宏任务和微任务分别有哪些

### 可以快速分析一个复杂的异步嵌套逻辑，并掌握分析方法

### 使用`Promise`实现串行

### `Node`与浏览器`EventLoop`的差异

### 如何在保证页面运行流畅的情况下处理海量数据



## 语法和API

### 理解`ECMAScript`和`JavaScript`的关系

### 熟练运用`es5`、`es6`提供的语法规范，

### 熟练掌握`JavaScript`提供的全局对象（例如`Date`、`Math`）、全局函数（例如`decodeURI`、`isNaN`）、全局属性（例如`Infinity`、`undefined`）

### 熟练应用`map`、`reduce`、`filter` 等高阶函数解决问题

### `setInterval`需要注意的点，使用`settimeout`实现`setInterval`

### `JavaScript`提供的正则表达式`API`、可以使用正则表达式（邮箱校验、`URL`解析、去重等）解决常见问题

### `JavaScript`异常处理的方式，统一的异常处理方案
