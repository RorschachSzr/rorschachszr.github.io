---
layout: post
title:  "Java错误日记-2-MVC乱码解决方法"
categories: Java
tags:  Java 乱码 mvc
---

* content
{:toc}


彻底解决Spring MVC 中文乱码问题









## 表单提交controller获得中文参数后乱码解决方案
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

* 第一种情况：jsp页面中文输入，到controller乱码，这时候需要设置的是在web.xml文件中添加一个编码的过滤器（filter）将编码统一为UTF-8，代码如下:
Web.xml配置文件：

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
* 第二种情况：
数据库中文数据，jsp页面显示乱码（不是严格意义上的乱码，而是以问号的形式呈现）
由于我们前后台的数据交互使用的是json数据，出现这种情况的原因我也不太清楚，之前也没遇到过，只能怪自己做过的项目太少，解决起来也不困难，只需要在转json的时候设置一下编码格式就可以了，代码如下：
```
response.setContentType("application/json;charset=UTF-8");//防止数据传递乱码
写上这句话就不会再出现乱码了。
```

* 第三种情况：页面中文，传递到controller也是正确的，但是保存到数据库之后就是乱码（也不是严格意义的乱码，跟上面一样全是问号）

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






## 页面乱码解决方法
页面相对是最为容易解决的，往往是在相应的jsp页面或者html页面设置相关的字符集即可。

如:
```
<%@page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
```







## 传值乱码解决方法
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


