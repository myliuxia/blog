---
title: Vue 高频面试题
categories: 
  - 技术
tags: 
  - vue
  - 面试
sidebar: auto
author: 
  name: liuxia
  link: https://github.com/myliuxia
date: 2022-03-09 16:09:16
permalink: /pages/8b1c04/
---
> 汇总vue相关的高频面试题
<!-- more -->

## 一、Vue2.0 响应式原理
![图片](/image/vue_data.png)

### 核心实现类:
Observer : 它的作用是给对象的属性添加 getter 和 setter，用于依赖收集和派发更新

Dep : 用于收集当前响应式对象的依赖关系,每个响应式对象包括子对象都拥有一个 Dep 实例（里面 subs 是 Watcher 实例数组）,当数据有变更时,会通过 dep.notify()通知各个 watcher。

Watcher : 观察者对象 , 实例分为渲染 watcher (render watcher),计算属性 watcher (computed watcher),侦听器 watcher（user watcher）三种

### Watcher 和 Dep 的关系
watcher 中实例化了 dep 并向 dep.subs 中添加了订阅者,dep 通过 notify 遍历了 dep.subs 通知每个 watcher 更新。

### 依赖收集
- initState 时,对 computed 属性初始化时,触发 computed watcher 依赖收集
- initState 时,对侦听属性初始化时,触发 user watcher 依赖收集
- render()的过程,触发 render watcher 依赖收集
- re-render 时,vm.render()再次执行,会移除所有 subs 中的 watcer 的订阅,重新赋值。

### 派发更新
- 组件中对响应的数据进行了修改,触发 setter 的逻辑
- 调用 dep.notify()
- 遍历所有的 subs（Watcher 实例）,调用每一个 watcher 的 update 方法。
### 原理
当创建 Vue 实例时,vue 会遍历 data 选项的属性,利用 Object.defineProperty 为属性添加 getter 和 setter 对数据的读取进行劫持（getter 用来依赖收集,setter 用来派发更新）,并且在内部追踪依赖,在属性被访问和修改时通知变化。

每个组件实例会有相应的 watcher 实例,会在组件渲染的过程中记录依赖的所有数据属性（进行依赖收集,还有 computed watcher,user watcher 实例）,之后依赖项被改动时,setter 方法会通知依赖与此 data 的 watcher 实例重新计算（派发更新）,从而使它关联的组件重新渲染。

一句话总结:
vue.js 采用数据劫持结合发布-订阅模式,通过 Object.defineproperty 来劫持各个属性的 setter,getter,在数据变动时发布消息给订阅者,触发响应的监听回调

## 二、Vue3.0 怎么实现数据劫持的，为什么弃用defineProperty
在vue2.x中是采用Object.defineProperty对数据进行劫持，但对于数组和对象数据的监听上存在一定的局限。

### vue2.x对于数组的监听
Object.defineProperty 本身有一定的监控到数组下标变化的能力,但是在 Vue 中,从性能/体验的性价比考虑,尤大大就弃用了这个特性。为了解决这个问题,经过 vue 内部处理后可以使用以下几种方法来监听数组
```
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```
由于只针对以上7种方法进行了hack处理，所以其他数组的属性也会检测不到。

如官方的原文：由于 JavaScript 的限制， Vue 不能检测以下变动的数组：

>当你利用索引直接设置一个项时，例如： vm.items[indexOfItem] = newValue<br/>
当你修改数组的长度时，例如： vm.items.length = newLength
### vue2.x对于对象的监听
Object.defineProperty 只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历。Vue 2.x 里,是通过 递归 + 遍历 data 对象来实现对数据的监控的,如果属性值也是对象那么需要深度遍历,显然如果能劫持一个完整的对象是才是更好的选择。

###  vue3.0 采用了Proxy对数据进行劫持
因为 Proxy 可以劫持整个对象,并返回一个新的对象。Proxy 不仅可以代理对象,还可以代理数组。还可以代理动态增加的属性。


## 三、vue 是如何对数组方法进行变异的 ?
vue源码如下
```javascript
// \core\observer\array.js
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})
```
Vue 通过原型拦截的方式重写了数组的 7 个方法,首先获取到这个数组的ob,也就是它的 Observer 对象,如果有新的值,就调用 observeArray 对新的值进行监听,然后手动调用 notify,通知 render watcher,执行 update

## 四、Vue 生命周期及父子组件生命周期钩子函数执行顺序

### 单一组件生命周期钩子函数执行顺序

- beforeCreate：在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
- created：实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
- beforeMount：在挂载开始之前被调用：相关的 render 函数首次被调用。
- Mounted: el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
- beforeUpdate：数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
- updated：由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
- beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用。
- destroyed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

另外Vue的keep-alive组件独有的两个钩子函数：
- activated：keep-alive 组件激活时调用。
- deactivated：keep-alive 组件停用时调用。


### 父子组件生命周期钩子函数执行顺序

加载渲染过程：
>父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted

子组件更新过程:
>父beforeUpdate->子beforeUpdate->子updated->父updated

父组件更新过程:
>父beforeUpdate->父updated

销毁过程
>父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

## 五、computed 的实现原理
computed 本质是一个惰性求值的观察者。

computed 内部实现了一个惰性的 watcher,也就是 computed watcher,computed watcher 不会立刻求值,同时持有一个 dep 实例。

其内部通过 this.dirty 属性标记计算属性是否需要重新求值。

当 computed 的依赖状态发生改变时,就会通知这个惰性的 watcher,

computed watcher 通过 this.dep.subs.length 判断有没有订阅者,

有的话,会重新计算,然后对比新旧值,如果变化了,会重新渲染。 **(Vue 想确保不仅仅是计算属性依赖的值发生变化，而是当计算属性最终计算的值发生变化时才会触发渲染 watcher 重新渲染，本质上是一种优化。)**

没有的话,仅仅把 this.dirty = true。 **(当计算属性依赖于其他数据时，属性并不会立即重新计算，只有之后其他地方需要读取属性的时候，它才会真正计算，即具备 lazy（懒计算）特性。)**

## 六、computed 和 watch 有什么区别及运用场景?
### 区别
- computed 计算属性 : 依赖其它属性值,并且 computed 的值有缓存,只有它依赖的属性值发生改变,下一次获取 computed 的值时才会重新计算 computed 的值。

- watch 侦听器 : 更多的是「观察」的作用,无缓存性,类似于某些数据的监听回调,每当监听的数据变化时都会执行回调进行后续操作。

### 运用场景

当我们需要进行数值计算,并且依赖于其它数据时,应该使用 computed,因为可以利用 computed 的缓存特性,避免每次获取值时,都要重新计算。

当我们需要在数据变化时执行异步或开销较大的操作时,应该使用 watch,使用 watch 选项允许我们执行异步操作 ( 访问一个 API ),限制我们执行该操作的频率,并在我们得到最终结果前,设置中间状态。这些都是计算属性无法做到的。

## 七、Vue 中 key 的作用是什么 

key 是每个 vnode 的唯一 id,依靠 key,我们的diff操作可以更准确、更快速（对于简单列表页渲染来说 diff 节点也更快,但会产生一些隐藏的副作用,比如可能不会产生过渡效果,或者在某些节点有绑定数据（表单）状态，会出现状态错位。）

diff 算法的过程中，先会进行新旧节点的首尾交叉对比，当无法匹配的时候会用新节点的key与旧节点进行对比，从而快速的找到相应节点

更准确：因为带 key 就不是就地复用了，在sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更家准确，如果不加key,会导致之前节点的状态被保留下来，会产生一系列的bug。

更快速：key的唯一性可以被Map数据结构充分利用，相比于遍历查找的时间复杂度 O(n),Map的时间复杂度仅仅为 O(1).

源码如下：
```javascript
function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
```

## 八、Vue 组件 data 为什么必须是函数？
> new Vue()实例中，data 可以直接是一个对象，为什么在 vue 组件中 data 必须是个函数呢？

应为组件是可以复用的, JS 里对象是引用关系，如果组件 data 是一个对象，那么子组件中的 data 属性会相互污染。

所以一个组件的 data 选项必须是一个函数，因此每个组件实例可以维护一份被返回对象的独立的拷贝。new Vue() 的实例是不会被复用的，所以不存在以上问题

## 九、nextTick 的原理
> 官方文档：
> 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。

如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。

然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。

Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。
**在 vue2.5 的源码中，macrotask 降级的方案依次是：setImmediate、MessageChannel、setTimeout**

vue 的 nextTick 方法的实现原理:

- vue 用异步队列的方式来控制 DOM 更新和 nextTick 回调先后执行
- microtask 因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕
- 考虑兼容问题,vue 做了 microtask 向 macrotask 的降级方案

## 十、vm.$set()实现原理是什么?
受现代 JavaScript 的限制 (而且 Object.observe 也已经被废弃)，Vue 无法检测到对象属性的添加或删除。

由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的。

对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性。

那么 Vue 内部是如何解决对象新增属性不能响应的问题的呢?
源码如下：
``` typescript
// src\core\observer\index.js
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
export function set (target: Array<any> | Object, key: any, val: any): any {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  // target 为数组
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 修改数组的长度, 避免索引>数组长度导致splice()执行有误
    target.length = Math.max(target.length, key)
    // 利用数组的splice变异方法触发响应式
    target.splice(key, 1, val)
    return val
  }  
  // target为对象, key在target或者target.prototype上 且必须不能在 Object.prototype 上,直接赋值
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  } 
  // 以上都不成立, 即开始给target创建一个全新的属性
  // 获取Observer实例
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  // target 本身就不是响应式数据, 直接赋值
  if (!ob) {
    target[key] = val
    return val
  }
   // 进行响应式处理
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```
过程：
- 如果目标是数组,使用 vue 实现的变异方法 splice 实现响应式
- 如果目标是对象,判断属性存在,即为响应式,直接赋值
- 如果 target 本身就不是响应式,直接赋值
- 如果属性不是响应式,则调用 defineReactive 方法进行响应式处理
