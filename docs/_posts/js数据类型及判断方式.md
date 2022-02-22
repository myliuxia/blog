---
title: JavaScript 数据类型及判断方式
date: 2022-02-22 11:02:32
permalink: /pages/01e593/
sidebar: auto
categories:
  - 技术
tags:
  - JavaScript
---

>JavaScript 数据类型相关问题，及判断数据类型的几种方式和其适用场景。
<!-- more -->

# JavaScript数据类型相关
## JavaScript属于什么类型的语言？
 - 使用之前就需要确认其变量类型的称为 *静态语言*
 - 在运行过程中需要检查数据类型的语言称为 *动态语言*
 - 支持隐式类型转换的语言称为*弱类型语言*，反正为*强类型语言*
 - **JavaScript**属于*动态语言*，*弱类型语言*

## JavaScript有那些数据类型？
- Number
- String
- Boolean
- undefined
- null
- Object
- Bigint
- Symbol

我们经常使用的类型如：**Array**，**Function** 都属于数据类型**object**

## 什么是值类型和引用类型？

### 存储位置

值类型的变量会保存在**栈内存**中，如果在一个函数中申明一个值类型，那么这个变量当函数执行之后会**自动销毁**。

引用类型的变量名会保存在**栈内存**中，但是变量值会存储在**堆内存**中，引用类型的变量不会自动销毁，当没有引用引用它时，系统的**垃圾回收机制**会回收它。

### 赋值方式
值类型的变量直接赋值就是深赋值，修改**b**的值不会影响**a**。
```javascript
let a = 1
let b = a 
a = 2
// a = 2;b = 1
```
引用类型的变量直接赋值实际上是传递引用，只是浅赋值，修改值会影响所有引用该地址的变量。
```javascript
let a = {
  name:'liuxia'
}
let b = a
b.name = 'yimin'
// a.name = 'yimin
// b.name = 'yimin'
```

### 添加属性和方法
值类型无法添加属性和方法
```javascript
let a = 1
a.name = 'liuxia'
// a.name = undefined
```
应用类型可以添加属性和方法
```javascript
let a = {}
a.name = 'liuxia'
// a.name = 'liuxia'
```

## 值类型和引用类型分别有那些？

- 基本值类型：**Number**,**String**,**Boolean**,**undefined**,**Symbol**
- 应用类型：**Object**
- 特殊的引用类型：**null**,指针指向空地址
- 特殊的引用类型：**function**,不用于存储数据，所以没有复制，拷贝函数一说


## 什么是虚值和真值？分别有哪些？
**转换为布尔值时** 变为 **false** 的值为 **虚值**，变为 **true** 的值为 **真值**。

可以使用 **Boolean函数** 或者 **!!** 运算符来检测是否时虚值。

虚值包含：
- 长度为0的字符串
- 数字0
- false
- undefined
- null
- NaN

真值包含：
- 空数组
- 空对象

# JavaScript数据类型判断

## typeof运算符
- 识别所有值类型
- 识别函数类型
- 识别引用类型，但是无法区分对象，数组以及**null**。
- **Infinity** 和 **NaN** 会被识别为 **number**
- 我们可以使用 **typeof** 来检测一个变量是否存在，如 **if(typeof a!="undefined"){}**，而当使用 **if(a)** 时，如果 a 不存在（未声明），则会报错。
  
```javascript
let a
const b = null
const c = 100
const d = 'liuxia'
const e = true
const f = Symbol('f')
const foo = () => {}
const arr = []
const obj = {}
console.log(typeof a) //=> undefined
console.log(typeof b) //=> object
console.log(typeof c) //=> number
console.log(typeof d) //=> string
console.log(typeof e) //=> boolean
console.log(typeof f) //=> symbol
console.log(typeof foo) //=> function
console.log(typeof arr) //=> object
console.log(typeof obj) //=> object
console.log(typeof Infinity) //=> number
console.log(typeof NaN) //=> number
```
## instanceof 方法
用于判断 **A** 是否为 **B** 的实例，表达式为：**A instanceof B**。这里的 **B** 可以式 **A** 实例的 **父类型** 或 **祖先类型**。

- 用来检测引用数据类型，值类型都会返回 **false**
- 如果 **A** 是 **B** 的实例，则返回 **true**,否则返回 **false**
- 检测所有 **new** 操作符创建的对象都是**Object**的实例
- 检测 **null** 和 **undefined** 会返回 **false**
```javascript
const foo = () => {}
const arr = []
const obj = {}
const data = new Date()
const number = new Number()
console.log(foo instanceof Function) // true
console.log(arr instanceof Array) // true
console.log(obj instanceof Object) // true
console.log(data instanceof Object) // true
console.log(number instanceof Object) // true
console.log(null instanceof Object) // false
console.log(undefined instanceof Object) // false
```
## constructor方法
- 除了 **undefined** 和 **null** 之外，其他类型都可以通过 **constructor** 属性来判断类型。
  ```javascript
  const c = 100
  const d = 'liuxia'
  const e = true
  const f = Symbol('f')
  const reg = /^[a-zA-Z]{5,20}$/
  const foo = () => {}
  const arr = []
  const obj = {}
  const date = new Date();
  const error = new Error();
  console.log(c.constructor === Number) //=> true
  console.log(d.constructor === String) //=> true
  console.log(e.constructor === Boolean) //=> true
  console.log(f.constructor === Symbol) //=> true
  console.log(reg.constructor === RegExp) //=> true
  console.log(foo.constructor === Function) //=> true
  console.log(arr.constructor === Array) //=> true
  console.log(obj.constructor === Object) //=> true
  console.log(date.constructor === Date) //=> true
  console.log(error.constructor === Error) //=> true
  ```
## Object.prototype.toString.call
- 对于 **Object.prototype.toString()** 方法，会返回一个形如 **[object XXX]** 的字符串
- 使用 **Object.prototype.toString.call** 的方式来判断一个变量的类型是最准确的方法
- **Object.prototype.toString.call** 换成 **Object.prototype.toString.apply** 也可以
```javascript
let a
const b = null
const c = 100
const d = 'warbler'
const e = true
const f = Symbol('f')
const reg = /^[a-zA-Z]{5,20}$/
const foo = () => { }
const arr = []
const obj = {}
const date = new Date();
const error = new Error();
const args = (function() {
  return arguments;
})()
console.log(Object.prototype.toString.call(a)) //=> [object Undefined]
console.log(Object.prototype.toString.call(b)) //=> [object Null]
console.log(Object.prototype.toString.call(c)) //=> [object Number]
console.log(Object.prototype.toString.call(d)) //=> [object String]
console.log(Object.prototype.toString.call(e)) //=> [object Boolean]
console.log(Object.prototype.toString.call(f)) //=> [object Symbol]
console.log(Object.prototype.toString.call(reg)) //=> [object RegExp]
console.log(Object.prototype.toString.call(foo)) //=> [object Function]
console.log(Object.prototype.toString.call(arr)) //=> [object Array]
console.log(Object.prototype.toString.call(obj)) //=> [object Object]
console.log(Object.prototype.toString.call(date)) //=> [object Date]
console.log(Object.prototype.toString.call(error)) //=> [object Error]
console.log(Object.prototype.toString.call(args)) //=> [object Arguments]
```
封装成函数使用：
```javascript
const getPrototype = (e) => {
 return Object.prototype.toString.call(e).split(' ')[1],replace(']','')
}
console.log(getPrototype('abc')) // => String
```
