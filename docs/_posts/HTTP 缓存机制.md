---
title: HTTP 缓存机制
date: 2022-02-28 13:53:05
permalink: /pages/7f207d/
sidebar: auto
categories:
  - 技术
tags:
  - http
---

> 浏览器和服务器之间通信是通过HTTP协议，在频繁通信的过程中为了提升性能，hTTP提供了一套缓存机制
<!-- more -->

## 浏览器请求资源过程

流程如下图:

![浏览器请求资源过程](/image/http_cache.png)

可以看出整个过程缓存机制分为两个阶段，先是强缓存阶段再是协商缓存阶段

## 强缓存
强制缓存分为两种情况
- Expires（http1.0）
- Cache-Control（http1.1）

### Expires
Exprires的值为**服务端**返回的数据到期时间。当再次请求时的**浏览器端当前时间**小于返回的此时间，则直接使用缓存数据。但由于**服务端时间**和**客户端时间**可能有误差，这也将导致缓存命中的误差，另一方面，Expires是HTTP1.0的产物，故现在大多数使用Cache-Control替代。

### Cache-Control
Cache-Control有很多属性，不同的属性代表的意义也不同。
- private：客户端可以缓存
- public：客户端和代理服务器都可以缓存
- max-age=t：缓存内容将在t秒后失效
- no-cache：需要使用协商缓存来验证缓存数据
- no-store：所有内容都不会缓存

## 协商缓存
协商缓存也分两种
- Last-Modified（响应头） 和 If-Modified-Since（请求头）
- ETag（响应头）和 If-None-Match（请求头）

### Last-Modified 和 If-Modified-Since
浏览器和服务器协商，服务器每次返回文件的同时，告诉浏览器文件在服务器上**最近的修改时间**。

请求过程如下：
- 浏览器初次请求静态资源
- 服务器读取资源，返回给浏览器，同时在 **响应头** 带上文件上次修改时间 **Last-Modified**（GMT标准格式） 
- 当浏览器上缓存过期时，浏览器带上**请求头** **If-Modified-Since**（也就是上次请求响应头上的Last-Modified）请求服务器资源
- 服务器对比 **If-Modified-Since** 和文件的上次修改时间。如果时间相同则继续使用本地缓存响应**304**，如果比相同就响应**文件内容**和**Last-Modified**并且响应状态为**200**

这个方案通过服务器检查文件是否有修改（通过对比修改时间），如果没有修改过就不再发送文件。但还是存在以下几个缺点：
- 由于Last-Modified修改时间时GMT时间，只能精确到**秒**，如果文件在一秒内多次修改，服务器便不知道文件修改过，浏览器就有可能拿不到最新的文件
- 如果服务器上文件被多次修改了，但是内容却没有发生变化，服务器还是需要重新返回文件

### ETag 和 If-None-Match
为了解决文件修改时间不精准的问题，服务器和浏览器再次协商，这次不返回时间，返回文件的唯一标识ETag。只有当文件内容改变时，Etag才会改变。
 整个请求过程如下：
- 浏览器初次请求静态资源
- 服务器读取资源，返回给浏览器，同时带上文件的唯一标识 **ETag**
- 浏览器再次请求该资源，并且缓存文件过期时，浏览器带上请求头 **If-None-Match**（值为上次请求的ETag）请求服务器
- 服务器比较请求头里的**If-None-Match** 和 资源文件的ETag。如果一致就继续使用本地缓存（响应状态304），如果不一致就再次返回文件和ETag（响应状态200）
 
 ## 缓存优先级
 
 Cache-Control > Expires > ETag > Last-Modified