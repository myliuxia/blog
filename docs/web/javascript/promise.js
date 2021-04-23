const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor){
    try{
      executor(this.resolve,this.reject)
    }catch(error){
      this.reject(error)
    }
  }
  // 储存状态变量，初始值pending
  status= PENDING

  // 存储成功之后的值
  value=null
  // 存储失败后的原因
  reason = null 


  // 存储成功回调函数
  onFulfilledCallbacks = []
  // 存储失败回调函数
  onRejectedCallbacks = []
  
  // resolove和reject为什么要用箭头函数？
  // 如果直接调用的话，this指向是window或undefined
  // 用箭头函数就可以让this指向当前实例
  // 更改为成功后的状态
  resolve = (value) => {
    if(this.status === PENDING){
      this.status = FULFILLED
      this.value = value
      //将所哟成功的回调拿出来执行
      while(this.onFulfilledCallbacks.length){
         // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }
  reject = (reason) =>{
    if(this.status === PENDING){
      this.status === REJECTED
      this.reason = reason
      //将所哟成功的回调拿出来执行
      while(this.onRejectedCallbacks.length){
         // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onRejectedCallbacks.shift()(value)
      }
    }
  }

  then(onFulfilled,onRejected){
    // 如果不传参数。使用默认函数
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

    // 为了链式调用这里直接创建一个MyPromise，并在后面return出去
    const promise2 = new MyPromise((resolve,reject)=>{
      
      const fulfillMicrotask = () =>{
        // 创建一个微任务等待promise2完成初始话
        queueMicrotask(() => {
          try{
            // 调用成功回调，并将值返回
            const x = realOnFulfilled(this.value)
            resolvePromise(promise2,x,resolve,reject)

          }catch(error){
            reject(error)
          }
        })
      }

      const rejectedMisrotask = () => {
        queueMicrotask(()=>{
          try {
            // 调用成功回调，并将值返回
            const x = realOnRejected(this.reason)
            resolvePromise(promise2,x,resolve,reject)

          } catch(err){
            reject(err)
          }
        })
      }


      if(this.status == FULFILLED){
        fulfillMicrotask()
      }else if(this.status == REJECTED){
        // 调用失败回调，并返回失败原因
        rejectedMisrotask()
      } else if(this.status == PENDING){
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        this.onFulfilledCallbacks.push(fulfillMicrotask)
        this.onRejectedCallbacks.push(rejectedMisrotask()
        )
      }
    })
    return promise2
  }
}

function resolvePromise(promise2,x,resolve,reject){
  if(promise2 === x ){
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if(x instanceof MyPromise){
    x.then(resolve,reject)
  }else{
    resolve(x)
  }
}

export default MyPromise