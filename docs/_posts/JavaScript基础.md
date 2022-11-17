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

### 1、JavaScript规定了几种数据类型
目前JS数据类型总共有8种: **Number**、**String**、**Boolean**、**Object**、**null**、**undefined**、**Symbol**、**BigInt**

其中 `Symbol` 是`ES6`新增的一种数据类型。

`BigInt`则是谷歌67版本中还出现了一种数据类型，是指安全存储、操作大整数。


### 2、JavaScript 对象的底层数据结构是什么
#### 先介绍下语言中所有的底层存储方式
- 数组（Array）
  `数组`是一种聚合数据类型，它是将具有相同类型的若干变量有序的组织在一起的集合。数组可以说是最基础的数据结构，在各种编程语言中都有对应。一个数组可以分解为多个数组元数，按照数据元素的类型，数组可以分为整型数组、字符型数组、浮点型数组、指针数组和结构数组等。数组也可以有一维、二维和多维等表现形式。

- 栈（Stack）
  `栈`是一种特殊的`线性表`，它只能在一个表的一个固定端进行数据结点的插入和删除操作。栈按照`后进先出`的原则来存储数据，也就是说，先插入的数据将被压入栈底，最后插入的数据在栈顶。读取数据时，从栈顶开始逐个读取。

- 队列（Queue）
  `队列`和栈类似，也是一种特殊的线性表。和栈不同的是，队列是按照`先进先出`的原则来存储数据。队列中只允许在一端插入数据，而在另一端进行删除操作。

- 链表（Linked List）
  `链表`是一种数据元素按照链式存储结构进行存储的数据结构，这种存储结构具有在物理上存在非连续的特点。链表由一系列数据结点构成，每个数据结点包括数据域和指针域两个部分。其中，指针域保存了下一个数据存放的地址。链表结构中数据元数的逻辑顺序是通过链表中指针链接次序来实现的。

- 树（tree）
  `树`是典型的非线性结构，它是包含2个节点的有穷集合。在树结构中，有且仅有一个根结点，该结点没有前驱结点。在树结构中的其他结点都有且仅有一个前驱结点，而且可以有两个后继结点。

- 图（Graph）
  `图`是另一种非线性数据结构。在图结构中，数据结点一般称为顶点，而边是顶点的有序偶对。如果两个顶点之间存在一条边，那么就表示这两个顶点具有相邻关系。

- 堆（Heap）
  `堆`是一种特殊的树形数据结构，一般讨论的堆都是二叉树。堆的特点是根结点的值是所有结点中最小的或者最大大，并且根结点的两个子树也是一个堆结构

- 散列表（Hash）
  散列表源于`散列函数`（Hash Function），其思想是如果在结构中存在关键词和T相等的记录，那么必定在F(T)的存储位置可以周到该记录，这样就可以部用进行比较操作而直接取得所有记录。

#### JavaScript中使用的数据存储方式是`堆（Heap）` 和 `栈（Stack）`
`JavaScript基本类型数据`都是直接按值存储在栈中的（`Undefined`、`Null`、不是`new`出来的`布尔`、`Number`和`String`）,每种类型的数据占用的内存空间的大小是确定的，并由系统自动分配和自动释放。这样带来的好处就是，内存可以及时得到回收，相对于堆来说，更加容易管理内存空间。

`JavaScript引用类型数据`被存储于堆中（如`对象`、`数组`、`函数`等。它们是通过拷贝和`new`出来的）。但说是存储在堆中也不太准确，因为引用类型的数据的地址指针是存储于栈中的，当我们想要访问应用类型值的时候，需要先从栈中获得对象的地址指针，然后通过指针找到堆中所需的数据。

### 3、`Symbol`类型在实际开发中的应用、可手动实现一个简单的`Symbol`
`Symbol`是`ES6`新出的一种数据类型，可以简单理解为唯一的量，独一无二的值。在实际开发中我们主要在一下地方应用：
- 作为对象的key属性，防止对象属性被从写
- Symbol类型可以用住私有变量
  ```javascript
  const name = Symbol('name')
  class People {
    construct(n){
      this[name] = n
    }
    sayName(){
      console.log(this[name])
    }
  }
  ```
  使用闭包主要是保护这个Symbol，它无法直接在闭包外面访问。这样除了使用`Object.getOwnpropertySymbols（）`之外我们无法访问`this[name]`属性，基本可以认为是私有的。

- 定义一组常量，保证这组常量的值都是不相等的
  ```javascript
  const COLOR_RED = Symbol();
  const COLOR_GREEN = Symbol();
  function getComplement(color){
    switch (color){
      case COLOR_RED:
        return 'red';
      case COLOR_GREEN:
        return 'green'
      default:
        throw new Error('Undefined color')
    }
  }
  ```
  常量使用 Symbol 值最大的好处，就是其他任何值都不可能有相同的值了，因此可以保证上面的switch语句会按设计的方式工作。

### 4、基本类型对应的内置对象，以及他们之间的装箱拆箱操作

### 5、`null` 和 `undefined` 的区别
`null`表示为空，代表此处不应该有值的存在，一个对象可以是null,代表是个空对象，而null本生也是对象。

```javascript
null instanceof Object // false

typeof null // 'object'
```

`undefined` 表示【不存在】，JavaScript 是一门动态类型语言，成员除了表示存在的空值外，还有可能根本就不存在（因为存不存在只有在运行时才知道），这就是`undefined`存在的意义。

### 6、至少可以说出三种判断`JavaScript`数据类型的方式，以及他们的优缺点，如何准确的判断数组类型

- instanceof
  判断对象和构造函数在原型链上是否有关系，如果有关系，返回真，否则返回假。故其对于引用类型的类型检测支持很好，但是无法对基本类型数据进行类型检测。
  ```javascript
  console.log({} instanceof Object) // true
  console.log([] instanceof Array) // true
  console.log(new Date() instanceof Date) // true
  console.log(function(){} instanceof Function) // true
  console.log(function(){} instanceof Object) // true
  console.log('123' instanceof String) // true
  ```

- typeof
  可以对基本类型做出准确的判断，但对于引用类型，用它就有点力不从心了。
  typeof 返回一个表示数据类型的字符串，返回结果包括：number、boolean、string、object、undefined、function等6种数据类型
  注意：typeof  null会返回object，因为特殊值null被认为是一个空的对象引用
  ```javascript
  console.log(typeof 1) // number
  console.log(typeof '1') // string
  console.log(typeof true) // boolean
  console.log(typeof null) // object
  console.log(typeof undefined) // undefined
  console.log(typeof []) // object
  console.log(typeof {}) // object
  console.log(typeof Symbol()) // symbol
  ```
- Object.prototype.toString().call()
  对于基本类型和引用类型都可以判断（除了自定义的类）
  ```javascript
  // 基本数据类型
  Object.prototype.toString.call(1) == '[Object Number]' // true
  Object.prototype.toString.call(new Number(1)) == '[Object Number]' // true

  // 对象
  Object.prototype.toString.call({}) == '[Object Object]' // true
  function abc(){}
  Object.prototype.toString.call(new abd()) == '[Object Object]' // true
  // 数组
  Object.prototype.toString.call([]) == '[Object Array]' // true
  // 函数
  Object.prototype.toString.call(function(){}) == '[Object Function]' // true

  ```
### 7、可能发生隐式类型转换的场景以及转换原则，应如何避免或巧妙应用
  一般发生隐式类型转换存在两种场景中：
  - 数学运算符
  - 逻辑语句中
#### 数学运算符
**减、乘、除**：在对各种`非Number`类型运用数学运算符（- * /）时，会先将`非Number`类型转换为`Number`类型。例如：
```javascript
1 - true // 0，先将 true 转换为数字 1，再执行 1 - 1
1 - null // 1，先将 null 转换为数字 0，再执行 1 - 0
1 - undefined  // NaN，undefined 转换为数字是 NaN
1 * ['5'] // 5，['5']首先会变成'5',然后再变成数字 5
```
其中如最后一个例子这样的，遇到引用类型的隐式转换会先掉用valueOf(),然后再调用toString()进行转换


**加**：它比较特殊，其隐式转换规则优先级如下：

  1、一侧为 String 类型时，另一侧会尽量转化成为字符串类型

  2、一侧为 Number 类型时，且另一侧为基本数据类型，则另一侧会尽量转换成 Number 类型

  3、一侧为 Number 类型，且另一侧为引用类型，会将它们俩都转换成 String 类型然后拼接

  4、两侧都是基本类型，且都不是 String，Number。则两侧都会尽量向 Number 类型去转换

  5、两侧都是引用类型，都转换成 String 类型然后拼接

  
  ```javascript
  /*规则1*/
  '123' + 12 // '12312'
  '123' + [] // '123'

  /*规则2*/
  123 + true // 124
  123 + false // 123
  123 + null // 123
  123 + undefined // NaN
  123 + '123'

  /*规则3*/
  123 + [] // '123'
  123 + [12] // '12312'
  123 + {} // '123[object Object]'

  /*规则4*/
  true + null // 1
  undefined + null // NaN

  /*规则5*/
  {} + [12] // '[object Object]12'
  [] + [] // ''
  ```

  #### 逻辑语句中的类型转换
  逻辑语句包含：if(xxx)、while(xxx)和for循环中的判断，还有就是||、&& 

  **单个变量 （也就是没有 == 的时候）** 

  如果只有单个变量，会先将变量转换为Boolean值。(其实逻辑运算符也是单个单个地判断变量的)
  ```javascript
  0 && true // false， 左边 0 优先转换为 false，然后因为是 && 所有就不用看后面的了
  '0' && true // true, 左边 '0'优先转换为 true,然后因为是 && 继续往后看是true，所以最终结构true
  0 || false // false, 左边 0 优先转换为 false，然后因为是 || 继续往后看是false, 所以最终结构false
  '0' || false // true, 左边 '0'优先转换为 true,然后因为是 || 所有就不用看后面的了
  ```
  **使用 == 比较 （===不会存在类型转换）**

  1、NaN和其他任何类型比较永远返回 false（包括和他自己）

  2、Boolean 和其他任何类型比较，Boolean 首先被转换为 Number 类型。

  3、String和Number比较，先将String转换为Number类型。

  4、null == undefined比较结果是true，除此之外，null、undefined和其他任何结果的比较值都为false。

  5、基本类型和引用类型做比较时，引用类型会依照ToPrimitive规则转换为基本类型（调用先valueOf然后调用toString）。如果还是没法得到一个基本类型，就会抛出 TypeError。

  ```javascript
  /**规则1**/
  NaN == NaN // false

  /**规则2**/
  true == 1  // true 
  true == '2'  // false, 先把 true 变成 1，而不是把 '2' 变成 true
  true == ['1']  // true, 先把 true 变成 1， ['1']拆箱成 '1', 再参考规则3
  true == ['2']  // false, 同上
  undefined == false // false ，首先 false 变成 0，然后参考规则4
  null == false // false，同上

  /**规则3**/
  123 == '123' // true, '123' 会先变成 123
  '' == 0 // true, ''" 会首先变成 0

  /**规则4**/
  null == 0 //false, 虽然null有些时候会隐式转换成 0. 但这里是不相等的！
  null == undefined //true
  undefined == false // false
  undefined == false // false

  /**规则5**/
  '[object Object]' == {a: 1}  // true, 对象和字符串比较，对象通过 toString 得到一个基本类型值
  '1,3' == [1, 3]  // true ，同上
  ```

### 8、出现小数精度丢失的原因，`JavaScript`可以存储的最大数字、最大安全数字，`JavaScript`处理大数字的方法、避免精度丢失的方法
<!-- 计算机存储双精度浮点数需要先把十进制数转换为二进制的科学记数法的形式，然后计算机以自己的规则{符号位+(指数位+指数偏移量的二进制)+小数部分}存储二进制的科学记数法，因为存储时有位数限制（64位），并且某些十进制的浮点数再转换为二进制时会出现无限循环，会造成二进制的舍入操作（0舍1入），当再次转换为十进制十就造成了计算误差。 -->
- **出现小数精度丢失的原因：**
  
  在ECMAScript数据类型中的Number类型是使用IEEE-754（一种二进制表示法）格式来表示的整数和浮点数值。而IEEE-754数值的浮点运算时出现参数舍入误差问题，即出现小数精度丢失。

- **JavaScript可以存储的最大数字以及最大安全数字:**
  
  最大数字是Number.MAX_VALUE、最大安全数字是Number.MAX_SAFE_INTEGER。Number.MAX_VALUE大于Number.MAX_SAFE_INTEGER，我的理解是js可以精确表示最大安全数字以内的数，超过了最大安全数字但没超过最大数字可以表示，但不精确，如果超过了最大数字，则这个数值会自动转换成特殊的Infinity值。

  由于内存的限制，ECMAScript并不能保存世界上所有的数值，ECMAScript能够表示的最小数值是Number.MIN_VALUE，能够表示的最大数值是Number.MAX_VALUE。超过数值是正值，则被转成Infinity（正无穷），如果是负值则被转成-Infinity（负无穷）。如果在某次返回了正或负的Infinity值，那么该值将无法继续参与下一次的计算，所以我们需要确定一个数值是不是有穷的，即是不是位于最小和最大的数值之间，可以使用isFinite()函数，如果该函数参数在最小和最大数值之间时会返回true。注意，如果参数类型不是数值，Number.isFinite一律返回false。

  JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。


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
