# 防抖/节流

### 防抖
所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
```javascript
/**
 * @desc 函数防抖
 * @param func 函数 
 * @param wait 延迟执行毫秒数
 * @param immediate 是否立即执行，true 表立即执行，false 表非立即执行
 */
function debounce(func, wait = 300, immediate = true) {
  let timer;
  const _debounce = function () {
    let args = arguments;
    let context = this
    if (timer) clearTimeout(timer)

    if (immediate && !timer) {
      timer = setTimeout(null, wait)
      func.apply(context, args)
    } else {
      timer = setTimeout(() => {
        func.apply(context, args)
        timer = null
      }, wait)
    }
  }
  _debounce.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
  return _debounce
}
```
### 节流
所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。  
函数节流 时间戳版（函数会立即执行）
```javascript
/**
 * 函数节流 时间戳版（函数会立即执行）
 * @param func 函数 
 * @param wait 延迟执行毫秒数
 */
function throttleByTimestamp(func, wait = 300) {
  let previous = 0
  const _throttle = function () {
    let args = arguments
    let context = this
    let now = Data.now()
    if (now - previous > wait) {
      func.apply(context, args)
      previous = now
    }
  }
  return _throttle
}
```
函数节流 定时器版（函数不会立即执行）  
```javascript
/**
 * 函数节流 定时器版（函数不会立即执行）
 * @param func 函数 
 * @param wait 延迟执行毫秒数
 */
function throttleByTimer(func, wait = 300) {
  let timer = 0
  const _throttle = function () {
    let args = arguments
    let context = this
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
      }, wait)
    }
  }
  return _throttle
}
```
函数节流 整合版  
```javascript
/**
 * @desc 函数节流 整合版
 * @param func 函数 
 * @param wait 延迟执行毫秒数
 * @param immediate 是否立即执行，true 表立即执行，false 表非立即执行
 */
function throttle(func, wait = 300, immediate = true) {
  let previous = new Data(0).getTime()
  let timer
  const _throttle = function () {
    let args = arguments
    let context = this
    if (immediate) {
      let now = new Data().getTime()
      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null
          func.apply(context, args)
        }, wait)
      }
    }
  }
  _throttle.cancel = () => {
    previous = 0
    clearTimeout(timer)
    timer = null
  }
  return _throttle
}
```