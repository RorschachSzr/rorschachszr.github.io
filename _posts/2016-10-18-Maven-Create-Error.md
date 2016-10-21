---
layout: post
title:  "Maven 项目创建错误"
categories: Maven 
tags:  Maven Java Create Error 
---

* content
{:toc}

解决常见的Maven 项目创建的错误






## 镜像地址修改
错误代码：

```
[ERROR] Failed to parse plugin descriptor for org.apache.maven.plugins:maven-re 
ources-plugin:2.5 (C:\Users\Administrator.DADI\.m2\repository\org\apache\maven\ 
lugins\maven-resources-plugin\2.5\maven-resources-plugin-2.5.jar): error in ope 
ing zip file -> [Help 1]
```

打开`Maven --> conf --> setting.xml` 修改`<mirror>...</mirror>`
为:

```
 <mirror>
      <id>mirrorId</id>
      <mirrorOf>repositoryId</mirrorOf>
      <name>SlaveName</name>
      <url>http://mvnrepository.com</url>
 </mirror>

```

**url是最重要的属性，必须是可用的镜像地址**，其他三个属性随意填写。

再打开 `C:\Users\%用户名%\.m2`中的setting.xml ,按照上面的方法修改镜像地址。

再使用**CMD**在项目根目录中 运行 `mvn install` 或者 再次用其他IDE工具创建`Maven`项目即可。



