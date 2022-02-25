---
title: 基于Promise A+规范手写一个Promise类
date: 2022-02-23 09:35:47
permalink: /pages/8ab9aa/
sidebar: auto
categories:
  - 随笔
tags:
  - 
---
> 基于Promise A+规范手写一个Promise类
<!-- more -->

## 1、Promise核心逻辑实现

原生promise使用如下：
```javascript
const promise = new Promise((resolve,reject)=>{
  resolve('success')
  reject('err')
})

promise.then(val=>{
  console.log('resolve',val)
},res=>{
  console.log('reject',res)
})
```

根据原生Promise的使用，可分析出Promise的一些基本特征：
- Promise 是一个类，在执行这个类的时候会传入一个执行方法，并在会立即执行
- Promise 会又三种状态
  
  - Pending 等待
  - Fulfilled 完成
  - Rejected 失败
- 状态只能由Pending -> Fulfilled 或 Pennding -> Rejected，且不可二次修改
- Promise 中使用resolve 和 reject 两个函数来修改状态
- then方法则是根据状态执行响应的回调方法,状态为成功则调用成功回调函数，反之则调用失败回调函数

根据以上基本特征我们确定这个类的大致结构：
```javascript
// 先定义三个状态常量
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
// 创建一个了
class MyPromise{
  constructor(executor){
    // 构造函数接收一个执行器，并立即执行
    // 执行器 传入resolve 和 reject 方法
    executor(this.resolve,this.reject)
  }
  // 存储状态的变量
  _status = PENDING
  // 成功之后的值
  _value = null
  // 失败的原因
  _reason = null
  // 更改成功后的状态
  resolve = (value) => {
    if(this._status === PENDING){
      this._status = FULFILLED
      this._value = value
    }
  }

  // 更改失败后的状态
  reject = (reason) => {
    if(this._status === PENDING){
      this._status = REJECTED
      this._reason = reason
    }
  }

  then(onFulfilled,onRejected){
    if(this._status === FULFILLED){
      onFulfilled(this._value)
    }else if(this._status === REJECTED){
      onRejected(this._reason)
    }
  }
}
```
## 2、Promise类中加入异步逻辑

原生使用如下：

```javascript
const promise = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('success')
    reject('err')
  },2000)
})
promise.then(val=>{
  console.log('resolve',val)
},res=>{
  console.log('reject',res)
})
```
添加异步后，then不会立即执行对应的回调，因为这个时候promise的状态还处于 pending 状态，所以我们需要在 then 方法中对 pending 状态做响应处理。

改造后的代码如下：


```javascript
// 先定义三个状态常量
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
// 创建一个了
class MyPromise{
  constructor(executor){
    // 构造函数接收一个执行器，并立即执行
    // 执行器 传入resolve 和 reject 方法
    executor(this.resolve,this.reject)
  }
  // 存储状态的变量
  _status = PENDING
  // 成功之后的值
  _value = null
  // 失败的原因
  _reason = null
  // 存放成功后的回调
  _onFulfilledCallback = null
  // 存放失败后的回调
  _onRejectedCallback = null

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if(this._status === PENDING){
      this._status = FULFILLED
      this._value = value
      this._onFulfilledCallback && this._onFulfilledCallback(this._value)
    }
  }

  // 更改失败后的状态
  reject = (reason) => {  
    // 只有状态是等待，才执行状态修改
    if(this._status === PENDING){
      this._status = REJECTED
      this._reason = reason
      this._onRejectedCallback && this._onRejectedCallback(this._reason)
    }
  }

  then(onFulfilled,onRejected){
    if(this._status === FULFILLED){
      onFulfilled(this._value)
    }else if(this._status === REJECTED){
      onRejected(this._reason)
    }else if(this._status === PENDING){
      // 状态为等待，则记录回调函数
      // 等到执行成功失败函数的时候再执行
      this._onFulfilledCallback = onFulfilled
      this.onRejectedCallback = onRejected
    }
  }
}
```

## 3、实现 then 方法的多次调用
之前的代码，多次调用then, 如果是执行方法是同步代码，则直接执行当前then的回调，如果执行方法异步方法，那么我们现在的MyPromise只会执行最后一次then的回调。
所以对MyPromise加以调整

- 增加两个数组存放回调函数
```javascript
// 存储成功回调函数
// _onFulfilledCallback = null
_onFulfilledCallbacks = []
// 存储失败回调函数
// _onRejectedCallback = null
_onRejectedCallbacks = []
```
- 将回调函数存入数组中
```javascript
then(onFulfilled,onRejected){
  if(this._status === FULFILLED){
    onFulfilled(this._value)
  }else if(this._status === REJECTED){
    onRejected(this._reason)
  }else if(this._status === PENDING){
    // 状态为等待，则记录回调函数
    // 等到执行成功失败函数的时候再执行
    this._onFulfilledCallback.push(onFulfilled) 
    this._onRejectedCallback.push(onRejected) 
  }
}
```
- 循环执行回调函数
```javascript
// 更改成功后的状态
resolve = (value) => {
  // 只有状态是等待，才执行状态修改
  if(this._status === PENDING){
    this._status = FULFILLED
    this._value = value
    // 循环执行回调
    while(this._onFulfilledCallback.length){
      this._onFulfilledCallback.shift()(value)
    }
  }
}

// 更改失败后的状态
reject = (reason) => {  
  // 只有状态是等待，才执行状态修改
  if(this._status === PENDING){
    this._status = REJECTED
    this._reason = reason
    // 循环执行回调
    while(this._onRejectedCallback.length){
      this._onRejectedCallback.shift()(reason)
    }
  }
}
```
## 4、实现 then 方法的链式调用
then 方法要链式调用，那么就需要返回一个 Promise 对象。

then 方法里 return 一个返回值作为下一个 then 方法的参数，如果是 return 一个Promise对象，则需要判断它的状态。

修改如下：
- 修改 then 方法
```javascript
then(onFulfilled,onRejected){
  // 为了链式调用，这里创建一个MyPromise，并return出去
  const promise = new MyPromise((resolve,reject)=>{
    if(this._status === FULFILLED){
      // 获得回调处理结果
      let res = onFulfilled(this._value)
      // 集中处理回调返回值
      this.resolvePromise(res,resolve,reject)
    }else if(this._status === REJECTED){
      let res = onRejected(this._value)
      // 集中处理回调返回值
      this.resolvePromise(res,resolve,reject)
    }else if(this._status === PENDING){
      // 状态为等待，则记录回调函数
      // 等到执行成功失败函数的时候再执行
      this._onFulfilledCallback.push(()=>{
          let res = onFulfilled(this._value)
          this.resolvePromise(res,resolve,reject)
      }) 
      this._onRejectedCallback.push(()=>{
        let res = onRejected(this._value)
        this.resolvePromise(res,resolve,reject)
      }) 
    }
  })
  return promise
}
// 处理回调返回值
resolvePromise(res, resolve, reject){
  // 判断 res 是不是 MyPromise 实例
  if(res instanceof MyPromise){
     res.then(resolve,reject) 
  }else{
    resolve(res)
  }
}
```
## 5、then 特殊情况处理与异常捕获
### 识别 Promise 是否返回自己

当 then 方法返回自己的Promise 对象时，则会出相循环调用的情况，这时我们需要处理这种情况。因此对代码做出以下调整：
```javascript

then(onFulfilled, onRejected) {
  // 为了链式调用，这里创建一个MyPromise，并return出去
  const promise = new MyPromise((resolve, reject) => {
    if (this._status === FULFILLED) {
      // 获得回调处理结果
      let res = onFulfilled(this._value)
      // 集中处理回调返回值
      this.resolvePromise(promise, res, resolve, reject)
    } else if (this._status === REJECTED) {
      let res = onRejected(this._value)
      // 集中处理回调返回值
      this.resolvePromise(res, resolve, reject)
    } else if (this._status === PENDING) {
      // 状态为等待，则记录回调函数
      // 等到执行成功失败函数的时候再执行
      this._onFulfilledCallback.push(() => {
        let res = onFulfilled(this._value)
        this.resolvePromise(promise, res, resolve, reject)
      })
      this._onRejectedCallback.push(() => {
        let res = onRejected(this._value)
        this.resolvePromise(promise, res, resolve, reject)
      })
    }
  })
  return promise
}

// 处理回调返回值
resolvePromise(promise, res, resolve, reject) {
  if (promise === res) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 判断 res 是不是 MyPromise 实例
  if (res instanceof MyPromise) {
    res.then(resolve, reject)
  } else {
    resolve(res)
  }
}
```
运行会发现，报错：
```
ReferenceError: Cannot access 'promise' before initialization
```
不能在 promise 初始化前使用，那么这个时候就需要用到一个异步函数去等待 promise 初始完成，这里使用 **queueMicrotask** 来创建一个微任务

改造如下：
```javascript
then(onFulfilled, onRejected) {
  // 为了链式调用，这里创建一个MyPromise，并return出去
  const promise = new MyPromise((resolve, reject) => {
    if (this._status === FULFILLED) {
      queueMicrotask(()=>{
        // 获得回调处理结果
        let res = onFulfilled(this._value)
        // 集中处理回调返回值
        this.resolvePromise(promise, res, resolve, reject)
      })
    } else if (this._status === REJECTED) {
      queueMicrotask(()=>{
        let res = onRejected(this._value)
        // 集中处理回调返回值
        this.resolvePromise(res, resolve, reject)
      })
    } else if (this._status === PENDING) {
      // 状态为等待，则记录回调函数
      // 等到执行成功失败函数的时候再执行
      this._onFulfilledCallback.push(() => {
        queueMicrotask(()=>{
          let res = onFulfilled(this._value)
          this.resolvePromise(promise, res, resolve, reject)
        })
      })
      this._onRejectedCallback.push(() => {
        queueMicrotask(()=>{
          let res = onRejected(this._value)
          this.resolvePromise(promise, res, resolve, reject)
        })
      })
    }
  })
  return promise
}
```

### 错误捕获

- 捕获执行器错误

```javascript

  constructor(executor){
    // 构造函数接收一个执行器，并立即执行
    // 执行器 传入resolve 和 reject 方法
    try {
      executor(this.resolve,this.reject)
    }catch(err){
      // 如果有错误，直接执行 reject
      this.reject(err)
    }
  }

```

- then 执行时的错误捕获
```javascript
then(onFulfilled, onRejected) {
  ......
      queueMicrotask(()=>{
        try{
          // 获得回调处理结果
          let res = onFulfilled(this._value)
          // 集中处理回调返回值
          this.resolvePromise(promise, res, resolve, reject)
        }catch(err){
          reject(error)
        }
      })
  ......
  }
```

### then 参数可选
```javascript
then(onFulfilled, onRejected) {
  // 如果不传，就使用默认函数
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
  ......
}
```
## 实现 resolve 和 reject 的静态调用

为支持 Promise.resolve 和 Promise.reject 的用法，我们在MyPromise类中添加两个静态方法：
```javascript
class MyPromise{
  ......
  // resolve 静态方法
  static resolve(arg){
    // 如果参数时MyPromise实例就直接返回
    if(arg instanceof MyPromise){
      return arg
    }
    // 转换成常规方式
    return new MyPromise((resolve, reject)=>{
      resolve(arg)
    })
  }
  // reject 静态方法
  static reject(reason){
    return new MyPromise((resolve, reject)=>{
      reject(reason)
    })
  }

}

```

## Promise A+ 测试

### 安装 promises-aplus-tests 并配置启动命令

```shell
npm install promises-aplus-tests -D
```

```json
// package.json
{
  "name": "promise",
  "version": "1.0.0",
  "description": "手写的promise",
  "main": "MyPromise.js",
  "scripts": {
    "test": "promises-aplus-tests MyPromise"
  },
  "author": "liuxia",
  "license": "ISC",
  "devDependencies": {
    "promises-aplus-tests": "^2.1.2"
  }
}
```
然后开启测试
```shell
npm run test
```
我们会发现如下报错：
```
TypeError: adapter.deferred is not a function
```

### 手写代码中加入 deferred

```javascript

MyPromise {
  ......
}

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
}
module.exports = MyPromise
```

### 完善 resolvePromise 方法
```javascript

// 处理回调返回值
function resolvePromise(promise, x, resolve, reject) {
  // 如果返回的是自己，抛出错误并返回
  if (promise === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 判断 x 是不是 MyPromise 实例
  if (typeof x === 'object' || typeof x === 'function') {
    if(x === null){
      return resolve(x)
    }
    let then
    try {
      // 把 x.then 赋值给then
      then = x.then
    }catch(error){
      // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
      return reject(error);
    }

    // 如果 then 是函数
    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x, // this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          y => {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          r => {
            if (called) return;
            called = true;
            reject(r);
          });
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return;

        // 否则以 error 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    resolve(x)
  }
}
```





