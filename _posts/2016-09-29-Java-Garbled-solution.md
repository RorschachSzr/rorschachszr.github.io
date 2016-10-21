---
layout: post
title:  "Java 错误日记-1-乱码问题解决方法"
categories: Java
tags:  Java error mvc 乱码
---


* content
{:toc}

我们每次使用eclipse编写JavaWeb程序的时候，普遍会遇到乱码问题






## 乱码解决方法

* 1、查看Tomcat 的conf的serve.xml文件格式

* 2、查看项目的编码格式

* 3、将

```
req.setCharacterEncoding("utf-8");
resp.setCharacterEncoding("utf-8");
```

加入servlet中

* 4、eclipse导入jquery包后报错问题解决办法

（1）打开项目.project文件，去掉如下内容：
	代码如下:

```html
<buildCommand>
<name>org.eclipse.wst.jsdt.core.javascriptValidator</name>
<arguments>
</arguments>
</buildCommand>
```

（2）删除原来的js,重启重新复制一份，因为原来的文件已被eclipse项目标记为错误了。

















