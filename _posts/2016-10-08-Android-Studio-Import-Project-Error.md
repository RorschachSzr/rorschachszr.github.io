---
layout: post
title:  "自己终是他人"
categories: 杂文
tags:  杂文 
---

* content
{:toc}

解决Android Studio项目导入错误


##  Gradle version 2.10 is required错误解决
因为项目要求的gradle版本是2.10，而目前项目的版本是2.2以上，
因此首先到网上把  gradle-XXX 那个版本下载下来，然后按照下面那个路径重新配置`gradle`路径

`Settings -->Build,Execution,Deployment -->Gradle` 

选择**Gradle home**里的路径配置

然后，修改`gradle-wrapper.properties`文件中的

```
distributionUrl=https\://services.gradle.org/distributions/gradle-**2.xxx**-all.zip
```

把`gradle`的版本号修改成**2.10**之后**rebuild**即可



>PS:如果是 **2.2~2.8 is required**错误
在AS下方 *Terminal* 终端输入命令: `gradlew`即可




## Failed to resolve: junit:junit:4.12


在`build.gradle`文件中通过添加url失踪库的构建解决
代码如下：

```
android {
    [...]
    repositories {
        maven { url 'http://repo1.maven.org/maven2' }
    }
    [...]
}
```


