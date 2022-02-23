

// 先定义三个状态常量
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
// 创建一个了
class MyPromise{
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
  // 存储状态的变量
  _status = PENDING
  // 成功之后的值
  _value = null
  // 失败的原因
  _reason = null
  // 存放成功后的回调
  _onFulfilledCallback = []
  // 存放失败后的回调
  _onRejectedCallback = []

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if(this._status === PENDING){
      this._status = FULFILLED
      this._value = value
      // 循环执行回调
      while(this._onFulfilledCallback.length){
        const cb = this._onFulfilledCallback.shift()
        cb && cb(this._value)
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
        const cb = this._onRejectedCallback.shift()
        cb && cb(this._value)
      }
    }
  }

  then(onFulfilled, onRejected) {
    // 如果不传，就使用默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
    // 为了链式调用，这里创建一个MyPromise，并return出去
    const promise = new MyPromise((resolve, reject) => {
      if (this._status === FULFILLED) {
        queueMicrotask(()=>{
          try{
            // 获得回调处理结果
            let res = onFulfilled(this._value)
            // 集中处理回调返回值
            this.resolvePromise(promise, res, resolve, reject)
          }catch(err){
            this.reject(err)
          }
        })
      } else if (this._status === REJECTED) {
        queueMicrotask(()=>{
          try{
            let res = onRejected(this._value)
            // 集中处理回调返回值
            this.resolvePromise(res, resolve, reject)
          }catch(err){
            this.reject(err)
          }
        })
      } else if (this._status === PENDING) {
        // 状态为等待，则记录回调函数
        // 等到执行成功失败函数的时候再执行
        this._onFulfilledCallback.push(() => {
          queueMicrotask(()=>{
            try{
              let res = onFulfilled(this._value)
              this.resolvePromise(promise, res, resolve, reject)
            }catch(err){
              this.reject(err)
            }
          })
        })
        this._onRejectedCallback.push(() => {
          queueMicrotask(()=>{
            try{
              let res = onRejected(this._value)
              this.resolvePromise(promise, res, resolve, reject)
            }catch(err){
              this.reject(err)
            }
          })
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
export default MyPromise