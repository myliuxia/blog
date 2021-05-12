---
title: Array 常用方法总结
date: 2021-04-23 14:04:56
categories: 
  - 技术
tags: 
  - JavaScript
sidebar: auto
author: 
  name: liuxia
  link: https://github.com/myliuxia
permalink: /pages/1ed60d/
---
>javascript中Array对象常用的方法，如:join、push、pop、shift、unShift、sort等
<!-- more -->
# Array 常用方法总结

### 1、创建数组

``` javascript
  var arr = []
  var arr = new Array()
```

### 2、join 

``` javascript
  var str = arr.join()
  var str = arr.join('')
```

### 3、push 和 pop (原数组改变)

push: 接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后【数组的长度】。
pop: 数组末尾移除最后一项，减少数组的 length 值，然后返回移除的项。

### 4、shift 和 unShift (原数组改变)

shift：删除原数组第一项，并返回【删除元素的值】；如果数组为空则返回undefined；
unshift: 将参数添加到原数组开头，并返回【新数组长度】

### 5、sort (原数组改变)
按升序排列数组项——即最小的值位于最前面，最大的值排在最后面。在排序时，sort()方法会调用每个数组项的 toString()转型方法，然后比较得到的字符串，以确定如何排序。即使数组中的每一项都是数值， sort()方法比较的也是字符串。


``` javascript
  var arr1 = ['a', 'd', 'b', 'c']
  arr1.sort()  // ['a','b','c','d']
  var arr2 = [13, 24, 51, 3]
  arr2.sort()  // [13, 24, 3, 51] ,按第一个数字顺序排列
  arr2.sort((a, b) => { return a - b }) // [3, 13, 24, 51] ,升序
  arr2.sort((a, b) => { return b - a }) // [51, 24, 13, 3] ,降序
```
将数组中某个元素移动到数组第一位或最后一位

``` javascript
  var list = [1, 2, 3, 4, 5, 6, 7], target = 4
  list.map(item => item).sort((a, b) => {
    if(a === target && b !== target){
      return -1
    } else {
      return 1
    }
  })
  // [4, 1, 2, 3, 5, 6, 7]
  
  list.map(item => item).sort((a, b) => {
    if(a !== target && b === target){
      return -1
    } else {
      return 1
    }
  })
  // [1, 2, 3, 5, 6, 7, 4]
```

### 6、slice 
返回从原数组中指定开始下标到结束下标之间的项组成的新的数组。slice()方法可以接受一个或两个参数，既要返回项的起始和结束位置。在只有一个参数的情况下，slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。

``` javascript
  var arr = [1, 2, 3, 4, 5]
  var _arr = arr.slice(1, 3)       // [2 , 3], 返回 （3 - 1） = 2 个元素的数组
```

注意：slice返回的是数组的浅拷贝，如果数组元素是引用数据类型，元素修改会影响到原数组。

``` javascript
  var objArr = [{a: 1},{b: 2}]
  var _objArr = objArr.slice(0, 1)
  _objArr[0].a = 3
  objArr[0] // a: 3
```

### 7、splice (原数组改变)
删除：指定两个参数：要删除的第一项的位置和要删除的项数。

``` javascript
  splice(0, 2) // 删除数组的前两项。返回值为删除的元素
```
插入：只需提供3个参数：起始位置、0（删除的项数）、要插入的项

``` javascript
  splice(2, 0，4，6) // 从当前数组的位置 2 开始插入4和6.返回值为删除的元素及[]
```
替换：提供3个参数：起始位置、删除的项数、要插入的项
``` javascript
  splice(2, 1，4，6) // 删除当前数组的位置 2的项，然后再从2开始插入4和6.返回值为删除的元素及[1]
```

### 8、indexOf() 和 lastIndexOf()
indexOf()：接收一或两个参数：要查找的项和（可选的）表示查找起点位置的索引。默认从数组的开头（位置 0）开始向后查找。

lastIndexOf：接收一或两个参数：要查找的项和（可选的）表示查找起点位置的索引。默认从数组的末尾开始向前查找。

### 9、map
“映射”，对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。且原数组不变

``` javascript
var arr = [1, 2, 3, 4, 5]
var arr2 = arr.map((item) => { 
  return item*item
})
console.log(arr2)    // [1, 4, 9, 16, 25]
```

### 10、filter

“过滤”功能，数组中的每一项运行给定函数，返回满足过滤条件组成的数组。且原数组不变

``` javascript
  var arr = [1, 2, 3, 4, 5]
  var _arr = arr.filter((item) => { return item >= 3 })         // [3, 4, 5]
```

### 11、reverse（原数组改变）
用于颠倒数组中元素的顺序。

``` javascript
  var arr = [1, 2, 3]
  arr.reverse()       // [3, 2, 1]
```

### 12、some 和 every （ES6）
some(): 测试数组中的某些元素是否通过了指定函数的测试。(一真即真)
``` javascript
  var arr = [1, 2, 3]
  var flag = arr.some((item)=>{
    return item>=3
  })       // true
```

every(): 测试数组的所有元素是否都通过了指定函数的测试。(一假即假)
``` javascript
  var arr = [1, 2, 3]
  var flag = arr.every((item)=>{
    return item>=3
  })       // false
```

### 13、数组扁平化

（1）map
``` javascript
  function flatten(arr) {
    var res = []
    arr.map(item => {
      if(Array.isArray(item)) {
        res = res.concat(flatten(item))
      } else {
        res.push(item)
      }
    })
    return res
  }
```
（2）[].concat 
es6的扩展运算符能将二维数组变为一维

``` javascript
  [].concat(...[1, 2, 3, [4, 5]])         // [1, 2, 3, 4, 5]
```
根据这个结果我们可以做一个遍历，若arr中含有数组则使用一次扩展运算符，直至没有为止。
``` javascript
  function flatten(arr) {
    while(arr.some(item => Array.isArray(item))) {
      arr = [].concat(...arr)
    }
    return arr
  }       // [1, 2, 3, 4, 5]
```
(3) flat
es6提供了一个新方法 flat(depth)，参数depth，代表展开嵌套数组的深度，默认是1
``` javascript
let arr = [1, [2, 3, [4, [5]]]];
arr.flat(3); // [1,2,3,4,5]
```

### 14、from （ES6）

将类数组转换为数组
``` javascript
let array = {
    0: 'name', 
    1: 'age',
    2: 'sex',
    3: ['user1','user2','user3'],
    'length': 4
}
let arr = Array.from(array)
console.log(arr) // ['name','age','sex',['user1','user2','user3']]
```
将Set解构的数据转换为数组
``` javascript
let arr = [1,2,3,4,5,6,7,8,9]
let set = new Set(arr)
console.log(Array.from(set))  // [1,2,3,4,5,6,7,8,9]
console.log(Array.from(set, item => item + 1)) // [2,3,4,5,6,7,8,9,10]
```

### 15、reduce
计算数组元素相加后的总和
``` javascript
var arr = [65, 44, 12, 4];
var total = arr.reduce((accumulator,currentValue) => accumulator + currentValue)
console.log(total) // 125
```


### 15、find 和 findIndex (ES6)
Array.find()：找到满足条件的第一个元素返回，如果未找到，则返回undefined。

``` javascript
const arr1 = [1, 2, 3, 4, 5]
var ret1 = arr1.find((value, index, arr) => {
  return value > 3
})

var ret2 = arr1.find((value, index, arr) => {
  return value > 6
})
console.log(ret1) // 4
console.log(ret2) // undefined
```

Array.findIndex()：找到满足条件的第一个元素，返回其位置，如果未找到，则返回-1

``` javascript
const arr1 = [1, 2, 3, 4, 5]
var ret3 = arr1.findIndex((value, index, arr) => {
  return value > 3
})

var ret4 = arr1.findIndex((value, index, arr) => {
  return value > 6
})
console.log(ret3) // 3
console.log(ret4) // -1
```