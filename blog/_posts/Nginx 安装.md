---
title: Nginx 安装
date: 2021-04-23 14:04:56
categories: 
  - 技术
tags: 
  - Nginx
  - 服务器 
sidebar: auto
---
# Nginx 安装

背景：使用Windows PowerShell连接服务器，安装Ngnix
### 一、安装编译工具及库文件
``` shell
yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel
```
### 二、安装 PCRE
PCRE作用是让nginx支持Rewrite功能
> 1、下载PCRE安装包

下载地址：[http://downloads.sourceforge.net/project/pcre/pcre/8.43/pcre-8.43.tar.gz](http://downloads.sourceforge.net/project/pcre/pcre/8.43/pcre-8.43.tar.gz)
``` shell
[root@cloud-service /]# cd /usr/local/src/
[root@cloud-service src]# wget http://downloads.sourceforge.net/project/pcre/pcre/8.43/pcre-8.43.tar.gz
```

> 2、解压安装包

``` shell
[root@cloud-service src]# tar zxvf pcre-8.43.tar.gz
```
> 3、进入安装目录

``` shell
[root@cloud-service src]# cd pcre-8.43
```
> 4、编译安装

``` shell
[root@cloud-service pcre-8.43]# ./configure
[root@cloud-service pcre-8.43]# make && make install
```
> 5、查看pcre版本

``` shell
[root@cloud-service pcre-8.43]# pcre-config --version
```
显示版本号，则说明安装成功！

### 三、安装 Nginx
> 1、下载Nginx

下载地址：[http://nginx.org/download/nginx-1.18.0.tar.gz](http://nginx.org/download/nginx-1.18.0.tar.gz)

``` shell
[root@cloud-service /]# cd /usr/local/src/
[root@cloud-service src]# wget http://nginx.org/download/nginx-1.18.0.tar.gz
```
> 2、解压安装包

``` shell
[root@cloud-service src]# tar zxvf nginx-1.18.0.tar.gz  
```
> 3、进入安装目录

``` shell
[root@cloud-service src]# cd nginx-1.18.0   
```

> 4、编译安装

``` shell
[root@cloud-service nginx-1.18.0]# ./configure --prefix=/usr/local/webserver/nginx --with-http_ssl_module --with-http_gzip_static_module --with-pcre=/usr/local/src/pcre-8.43
[root@cloud-service nginx-1.18.0]# make && make install
```
编译时几个配置项含义如下：

`--prefix=PATH`:设置安装目录路径

`--with-http_ssl_module`:启用HTTP_SSL模块，用于构建HTTPS服务。默认情况下不构建此模块.

`--with-http_gzip_static_module`:启用HTTP_Gzip_Static模块，用于将静态内容压缩成".gz"为文件扩展名的预压缩文件，并缓存在本地，在响应时会将此文件发送以替代普通文件，运用此模块的好处就是不需要（Gzip）每次传输时都需要对文件进行处理压缩。默认情况下不构建此模块

`--with-pcre=DIR`:若你是源码安装的PCRE库，则需要通过此项设置PCRE库的所在目录路径。

其他配置项及含义可通过`./configure --help`查看

> 5、查看Nginx版本

``` shell
[root@cloud-service nginx-1.18.0]# /usr/local/webserver/nginx/sbin/nginx -v
nginx version: nginx/1.18.0
```
显示版本号，则说明安装成功！

### 四、Nginx 常用命令

> 1、指定 Nginx 配置文件

``` shell
[root@cloud-service /]# /usr/local/webserver/nginx/sbin/nginx -c /usr/local/webserver/nginx/conf/nginx.conf
```
-c表示configuration，指定配置文件。
> 2、检测 Nginx 配置文件是否正确

``` shell
[root@cloud-service /]# /usr/local/webserver/nginx/sbin/nginx -t
```
> 3、启动 Nginx

``` shell
[root@cloud-service /]# /usr/local/webserver/nginx/sbin/nginx
```
> 4、停止 Nginx（通过向nginx发送请求）

``` shell
[root@cloud-service /]# /usr/local/webserver/nginx/sbin/nginx -s stop
[root@cloud-service /]# /usr/local/webserver/nginx/sbin/nginx -s quit
```
-s都是采用向 Nginx 发送信号的方式。
> 5、Nginx 重载配置

``` shell
[root@cloud-service /]# /usr/local/webserver/nginx/sbin/nginx -s reload
```
> 6、显示帮助信息

``` shell
[root@cloud-service /]# /usr/local/webserver/nginx/sbin/nginx -h
```
> 7、查看 Nginx 进程

``` shell
[root@cloud-service /]# ps -ef | grep nginx
root     25900     1  0 13:42 ?        00:00:00 nginx: master process /usr/local/nginx/sbin/nginx
root     25901 25900  0 13:42 ?        00:00:00 nginx: worker process
root     29166  4225  0 15:03 pts/0    00:00:00 grep --color=auto nginx
```
> 8、停止 Nginx 进程

先在进程列表中找到主进程号：25900

从容停止Nginx:
``` shell
[root@cloud-service /]# kill -QUIT 25900
```
快速停止Nginx:
``` shell
[root@cloud-service /]# kill -TERM 25900
```
强制停止Nginx:
``` shell
[root@cloud-service /]# pkill -9 nginx
```