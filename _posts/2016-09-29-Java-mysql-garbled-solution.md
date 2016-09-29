---
layout: post
title:  "Java 错误日记-3-存入数据库乱码解决方法"
categories: Java
tags:  Java error 数据库 乱码 mysql
---

* content
{:toc}


当数据存入数据库时发生乱码



#  存入数据库乱码

这个相对就比较复杂，这里lz用的mysql，且以mysql来介绍如何来解决这个乱码问题
大家都知道，无论是底层使用的是纯粹的jdbc还是hibernate还是jpa都好，其实本质上都是jdbc，对应的框架只不过在相关的基础上进行特定的封装。所以无论是什么样的技术，都会用到连接到数据库的url。所以url首先是需要检查的
 
#  1.url标准情况

会在相应的后面加上相应的字符集设置
如下:
 
```
	jdbcUrl=jdbc:mysql:///itcastoa?useUnicode=true&characterEncoding=UTF-8
```
如上，useUnicode就不用说了，连接数据库中设置的字符集，&amp这是什么的？这就有问题了，在xml中&amp是&的转义字符。如果你是用xml来配置对应的数据库连接配置的话就什么问题了。但是如果用的是**.properties就有问题了，则必须将amp除去即可。这个确实是lz经历了头破血流的经验啊。
 

#  2.数据库
 
这里的问题也是相对比较难处理的，登录数据库
 
查看数据库编码格式
可以看到server的字符集还是latin1，这里就需要讲一下常用的字符集了。

为了世界的和平和繁荣昌盛，ISO组织指定了一套unicode字符集方案，Unicode编码是不同编码之间相互交流转换的桥梁，包含了32位二进制，所以能容纳2的31次方的字符，有生之年是够用了。而根据不同的需要Unicode又分为三种方案。

`Utf8`：用以解决国际上不同语言而出现的编码。对英文是使用8位，中文则为3位。可以在任何支持utf9字符集的浏览器上显示，无需另行处理。
另外两种为`utf16`和`32`，这里不再编著。大家自行查阅即可，总的还是因为存储和使用的方便来决定使用哪种。
好了，另外相对熟悉的就是gbk，俗称国标码，中国国家标准来制定，仅仅包含中文字符。所以相对两讲，utf8的兼容更好，但是存储量更大。
 
马上回来，大致对字符集充了电还是回来先解决问题。这里所以用gbk或者utf8都是可以的。但是latin1肯定是不可以的，这里主要通过这样一个命令来设置
 
分别设置设置了服务器、数据库和数据表部分的编码，必须设置连接编码。连接编码设置如下：
```
mysql> SET character_set_client='gbk';
mysql> SET character_set_connection='gbk'
mysql> SET character_set_results='gbk'
```
设置好编码，下面便可以成功插入中文了，其实用一句话即可解决
 
 
* 常用命令

 
* 查看数据库编码格式

```
show variables like 'character_set_%';
```

* 查看数据库中的表的创建

```
show create table tablename;
```

* 设置数据库编码格式

```
setnames 'gbk';
```
