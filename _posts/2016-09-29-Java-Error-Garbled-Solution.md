---
layout: post
title:  "Java 错误日记(1)乱码问题解决方法"
categories: Java
tags:  Java error mvc 乱码
---

* content
{:toc}

## 问题描述

我们每次使用eclipse编写JavaWeb程序的时候，常常会遇到各种难以除去的乱码问题

## 普通乱码解决方法

**1、查看Tomcat 的conf的serve.xml文件格式
2、查看项目的编码格式
3、将
```
req.setCharacterEncoding("utf-8");
resp.setCharacterEncoding("utf-8");
```
加入servlet中
4、eclipse导入jquery包后报错问题解决办法**
（1）打开项目.project文件，去掉如下内容：
	代码如下:
```
<buildCommand>
<name>org.eclipse.wst.jsdt.core.javascriptValidator</name>
<arguments>
</arguments>
</buildCommand>
```
（2）删除原来的js,重启重新复制一份，因为原来的文件已被eclipse项目标记为错误了。


## 彻底解决Spring MVC 中文乱码问题
**1：表单提交controller获得中文参数后乱码解决方案**
注意：  jsp页面编码设置为UTF-8
form表单提交方式为必须为post，get方式下面spring编码过滤器不起效果
```
	<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>  
	<form action="${ctx}/user/addUser" name="userForm" method="post"> 
   
```
修改web.xml，增加编码过滤器，如下（注意，需要设置forceEncoding参数值为true）
```
<filter>
		<filter-name>characterEncodingFilter</filter-name>
		<filter-class>
			org.springframework.web.filter.CharacterEncodingFilter
		</filter-class>
		<init-param>
			<param-name>encoding</param-name>
			<param-value>UTF-8</param-value>
		</init-param>
		<init-param>
			<param-name>forceEncoding</param-name>
			<param-value>true</param-value>
		</init-param>
</filter>
	<filter-mapping>
    	<filter-name>characterEncodingFilter</filter-name>
    	<url-pattern>/*</url-pattern>
  	</filter-mapping>
```
**注意： 
数据库编码是否支持中文
数据库表和表字段是否正确**

在配置连接数据库的参数设置修改：
```
	<property name="url" value="jdbc:mysql://localhost:3306/dbname?useUnicode=true&characterEncoding=UTF-8"></property>  
```
**第一种情况：jsp页面中文输入，到controller乱码，这时候需要设置的是在web.**xml文件中添加一个编码的过滤器（filter）将编码统一为UTF-8，代码如下:
Web.xml配置文件：
view sourceprint?
```
<filter>
<filter-name>CharacterEncodingFilter</filter-name>
<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
<init-param>
<param-name>encoding</param-name>
<param-value>utf-8</param-value>
</init-param>
</filter>
<filter-mapping>
<filter-name>CharacterEncodingFilter</filter-name>
<url-pattern>/*</url-pattern>
</filter-mapping>
```


这里需要注意的是，最好把这段代码放在web.xml中开头的位置，因为拦截有顺序，如果放在后面的话容易拦截不到。
**第二种情况：
数据库中文数据，jsp页面显示乱码（不是严格意义上的乱码，而是以问号的形式呈现）**
由于我们前后台的数据交互使用的是json数据，出现这种情况的原因我也不太清楚，之前也没遇到过，只能怪自己做过的项目太少，解决起来也不困难，只需要在转json的时候设置一下编码格式就可以了，代码如下：
```
response.setContentType("application/json;charset=UTF-8");//防止数据传递乱码
写上这句话就不会再出现乱码了。
```
**第三种情况：
页面中文，传递到controller也是正确的，但是保存到数据库之后就是乱码（也不是严格意义的乱码，跟上面一样全是问号）**
这个问题困扰了我一段时间，开始觉得数据库的编码格式不正确，重新创建了编码格式为utf-8的数据库也还是不可以，最后觉得是jboss的问题，我们的服务器用的是jboss，上网查了资料在连接数据源的时候加上编码格式就可以了，代码如下：
```
<datasource jta="true" jndi-name="java:jboss/datasources/JcMysqlDS" pool-name="JcMysqlDS" enabled="true" use-java-context="true">
<connection-url>jdbc:mysql://192.168.24.46/ITOO_BASIC_BASIC?useUnicode=true&characterEncoding=UTF-8</connection-url>
<driver>mysql</driver>
<pool>
<prefill>false</prefill>
<use-strict-min>false</use-strict-min>
<flush-strategy>FailingConnectionOnly</flush-strategy>
</pool>
<security>
<user-name>root</user-name>
<pass<a href="http://www.it165.net/edu/ebg/" target="_blank" class="keylink">word</a>>123456</pass<a href="http://www.it165.net/edu/ebg/" target="_blank" class="keylink">word</a>>
</security>
</datasource>
```





##页面乱码解决方法
页面相对是最为容易解决的，往往是在相应的jsp页面或者html页面设置相关的字符集即可。

如:
```
<%@page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
```







##传值乱码解决方法
在传值过程中，也是乱码出现的频繁地。先不说到底是什么场景了，通常常用的方案有如下几个配置指定的`filter`
 
 ```
	<!-- 配置请求过滤器，编码格式设为UTF-8，避免中文乱码-->
    <filter>
      <filter-name>springUtf8Encoding</filter-name>
      <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
       <init-param>
          <param-name>encoding</param-name>
          <param-value>UTF-8</param-value>
       </init-param>
       <init-param>
          <param-name>forceEncoding</param-name>
          <param-value>true</param-value>
       </init-param>
    </filter>

```

 
 
**设置request字符集**

往往从前台传入到对应的controller或者是action之后出现乱码，讲讲我一般的思路是先打印request本身默认的字符集
 
 
```
	System.out.println(request.getCharacterEncoding());

```
 
接着按照情况，如果打印的不是所需要的字符集则设置相应字符集即可
 
``` 
	 request.setCharacterEncoding("UTF-8");

```

 
当然某种情况可能还是无法解决这时候用以下这个即可
```
	String str=newString((request.getParameter("bigQuestionTypeName")).getBytes("iso-8859-1"),"utf-8")
```




#存入数据库乱码
这个相对就比较复杂，这里lz用的mysql，且以mysql来介绍如何来解决这个乱码问题
大家都知道，无论是底层使用的是纯粹的jdbc还是hibernate还是jpa都好，其实本质上都是jdbc，对应的框架只不过在相关的基础上进行特定的封装。所以无论是什么样的技术，都会用到连接到数据库的url。所以url首先是需要检查的
 
**1.url标准情况会在相应的后面加上相应的字符集设置**
如下:
 
```
	jdbcUrl=jdbc:mysql:///itcastoa?useUnicode=true&characterEncoding=UTF-8
```
如上，useUnicode就不用说了，连接数据库中设置的字符集，&amp这是什么的？这就有问题了，在xml中&amp是&的转义字符。如果你是用xml来配置对应的数据库连接配置的话就什么问题了。但是如果用的是**.properties就有问题了，则必须将amp除去即可。这个确实是lz经历了头破血流的经验啊。
 

**2.数据库**
 
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
 
 
**常用命令**
 
查看数据库编码格式
```
show variables like 'character_set_%';
```
查看数据库中的表的创建
```
show create table tablename;
```
设置数据库编码格式
```
setnames 'gbk';
```
