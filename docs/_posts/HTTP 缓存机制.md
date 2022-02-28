---
title: HTTP 缓存机制
date: 2022-02-28 13:53:05
permalink: /pages/7f207d/
sidebar: auto
categories:
  - 随笔
tags:
  - 
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
- Last-Modified 和 If-Modified-Since
- ETag 和 If-None-Match

### Last-Modified

### ETag