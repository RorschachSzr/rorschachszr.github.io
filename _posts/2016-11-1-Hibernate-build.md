---
layout: post
title:  "Hibernate 5.x 版本入门配置实例"
categories: Hibernate 
tags:  Hibernate Java Build Example 
---

* content
{:toc}

解决hibernate版本更新，方法更改后的配置问题





## 入门实例：向数据库插入一个对象
  



1.**第一步需要引入我们的jar包，推荐使用maven管理项目，直接在pom.xml中添加**
  

  

```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <org.hibernate-version>5.1.0.Final</org.hibernate-version>
</properties>
<dependencies>
    <dependency>
        <groupId>junit</groupId><!-- 我们测试时使用junit-->
        <artifactId>junit</artifactId>
        <version>4.10</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId><!-- hibernate内置日志记录所需包-->
        <artifactId>slf4j-api</artifactId>
        <version>1.7.5</version>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-log4j12</artifactId>
        <version>1.7.5</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.17</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.21</version>
    </dependency>
    <dependency>
        <groupId>cglib</groupId>
        <artifactId>cglib</artifactId>
        <version>2.2.2</version>
    </dependency>
    <!-- hibernate -->
    <dependency>
        <groupId>org.hibernate</groupId>
        <artifactId>hibernate-core</artifactId>
        <version>${org.hibernate-version}</version>
    </dependency>
    <dependency>
        <groupId>org.hibernate</groupId>
        <artifactId>hibernate-validator</artifactId>
        <version>${org.hibernate-version}</version>
    </dependency>
<dependencies>

```

***
  











## 2. 配置hibernate.cfg.xml
  



在类**根路径**下创建`hibernate.cfg.xml`，在测试文件中，我们会**默认读取**此位置下此名字的hibernate配置文件。
  



```xml
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
        "http://hibernate.sourceforge.net/hibernate-configuration-3.0.dtd">

<hibernate-configuration>

    <session-factory>
        <!-- 数据库连接配置 -->
        <property name="connection.driver_class">com.mysql.jdbc.Driver</property>
        <property name="connection.url">jdbc:mysql://localhost:3307/hibernate5</property>
        <property name="connection.username">root</property>
        <property name="connection.password">3213318</property>
        <!-- 每次从数据库中取出并放到JDBC的Statement中的记录条数。Fetch Size设的越大，读数据库的次数越少，速度越快，Fetch Size越小，读数据库的次数越多，速度越慢-->
        <property name="jdbc.fetch_size">50 </property>
        <!--批量插入,删除和更新时每次操作的记录数。Batch Size越大，批量操作的向数据库发送Sql的次数越少，速度就越快，同样耗用内存就越大-->
        <property name="jdbc.batch_size">23 </property>
        <!-- SQL 方言 -->
        <property name="dialect">org.hibernate.dialect.MySQL5Dialect</property>
        <!-- Enable Hibernate's automatic session context management -->
        <property name="current_session_context_class">thread</property>
        <!-- 在控制台输出sql语句 -->
        <property name="show_sql">true</property>
        <!-- 在启动时根据配置更新数据库 -->
        <property name="hbm2ddl.auto">update</property>
        <mapping class="com.ls.szr.hibernate3.helloworld.News"/><!-- 注册我们的实体映射类-->
    </session-factory>
</hibernate-configuration>

```
  




***

## 3. 编写实体类对象
  



hibernate是一个ORM(Object-Relation-Mapping)`对象关系映射型框架`，我们通过创建实体类，一一对应到我们的数据库表。  

一旦配置好我们的实体类，hibernate能够自动帮我们完成数据库建表操作。  

本系列环境基于hibernate4，这里优先使用注解的形式来配置实体。  
  



```java

package com.ls.szr.hibernate3.helloworld;
import javax.persistence.*;
import java.util.Date;

/**
 * Created by Administrator on 2016/11/1 0001.
 */
@Entity//声明当前类为hibernate映射到数据库中的实体类
public class News {
    @Id//声明此列为主键
    @GeneratedValue(strategy = GenerationType.AUTO)//根据不同数据库自动选择合适的id生成方案，这里使用mysql,为递增型

    private Integer id;
    private String title;
    private  String author;
    private Date date;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "News{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", date=" + date +
                '}';
    }

    public News(String author, String title, Date date) {
        super();
        this.author = author;
        this.title = title;
        this.date = date;
    }
    public News() {
    }
}


```
  







***

## 4. 编写测试文件
  


在我们完成数据库操作前，需要先知道**hibernate的两个核心类**：
  

   
类名                                          |	说明
----------------------------------------------|----------
SessionFactory (org.hibernate.SessionFactory) |  针对单个数据库映射关系经过编译后的内存镜像,是线程安全的(不可变)。 它是生成Session的工厂。
Session (org.hibernate.Session)               |  表示应用程序与持久储存层之间交互操作的一个单线程对象,此对象生存期很短,隐藏了JDBC连接,也是Transaction的工厂。

  



  一般在使用hibernate中，我们往往初始话一个SessionFactory对象，因为它是重量级对象，创建需要耗费大量的资源。

   一旦我们需要进行数据库操作时，我们可以创建新的Session会话对象，来进行我们的数据库操作。

   明白这一点后，我们开始我们的测试文件编写:






```java

      @Test
    public void test(){
        //相对于3.x.x版本hibernate，我们在4.x.x采用如下方式获取我们的会话工厂：
        //1. 解析我们在hibernate.cfg.xml中的配置

//      Configuration configuration = new Configuration().configure();

        //2. 创建服务注册类,进一步注册初始化我们配置文件中的属性

//      ServiceRegistry serviceRegistry = new ServiceRegistryBuilder().applySettings(configuration.getProperties()).buildServiceRegistry();

        //3. 创建我们的数据库访问会话工厂

//      SessionFactory sessionFactory = configuration.buildSessionFactory(serviceRegistry);

        //但在5.1.0版本汇总，hibernate则采用如下新方式获取：
        //1. 配置类型安全的准服务注册类，这是当前应用的单例对象，不作修改，所以声明为final
        //在configure("cfg/hibernate.cfg.xml")方法中，如果不指定资源路径，默认在类路径下寻找名为hibernate.cfg.xml的文件
        final StandardServiceRegistry registry = new StandardServiceRegistryBuilder().configure().build();
        //2. 根据服务注册类创建一个元数据资源集，同时构建元数据并生成应用一般唯一的的session工厂

        SessionFactory sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();

        /****上面是配置准备，下面开始我们的数据库操作******/

        Session session = sessionFactory.openSession();//从会话工厂获取一个session

        Transaction transaction = session.beginTransaction();//开启一个新的事务

        News news = new News("Java","lol",new Date(new java.util.Date().getTime()));
        session.save(news);
        transaction.commit();//提交事务
    }

```
  




>运行测试文件。我们看到控制台输出： 

>Hibernate: create table hibernate_sequence (next_val bigint)

>Hibernate: insert into hibernate_sequence values ( 1 )

>Hibernate: create table News (id integer not null, author varchar(255), date datetime, title varchar(255), primary key (id))

>Hibernate: select next_val as id_val from hibernate_sequence for update

>Hibernate: update hibernate_sequence set next_val= ? where next_val=?

>Hibernate: insert into News (author, date, title, id) values (?, ?, ?, ?)

我们就成功了:)









