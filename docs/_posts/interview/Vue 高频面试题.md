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

## Vue2.0 响应式原理
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

## Vue3.0 怎么实现数据劫持的，为什么弃用defineProperty
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


### vue 是如何对数组方法进行变异的 ?
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

## Vue 生命周期及父子组件生命周期钩子函数执行顺序


