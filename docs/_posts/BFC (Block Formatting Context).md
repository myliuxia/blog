---
title: BFC (Block Formatting Context)
date: 2022-03-07 10:02:21
permalink: /pages/d32196/
sidebar: auto
categories:
  - 技术
tags:
  - html
---
>BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。
<!-- more -->
## 什么是BFC
>定义：BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。
### Box
Box 是 CSS 布局的对象和基本单位，一个页面有多个 Box 组成。元素的类型和display 属性，决定了这个 Box 的类型。不同类型的 Box，会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此 Box 内的元素会以不同的方式渲染。Box 类型如下：
- 块级盒子（block-level box）：display 属性为 block，list-item，table 的元素，会生成块级盒子。
- 块级盒子（block-level box）：display 属性为 inline, inline-block, inline-table 的元素，会生成块级盒子。
- 块/行混合盒子（run-in box）：display 属性为 run-in，css3属性，兼容性不好。

### Formatting Context

Formatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。

## BFC的布局规则
- 内部的Box会在垂直⽅向，⼀个接⼀个地放置
- Box垂直⽅向的距离由margin决定。属于同⼀个BFC的两个相邻Box的margin会发⽣重叠
- BFC的区域不会与float的元素区域重叠
- 计算BFC的高度时，浮动子元素也参与计算。意味着可以利用BFC解决浮动带来的高度塌陷的文通。、
- BFC就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。意味着可以用给父元素设置BFC，解决margin-top塌陷的问题。

## 如何创建BFC
- 根元素
- float的值不是none
- position的值为absolute或fixed
- display的值为 inline-block、table-cell、flex、table-caption和inline-flex
- overflow的值不是visible

## BFC的作用
- 清楚内部浮动
- 防止锤子margin重叠
- 自适应两栏布局
