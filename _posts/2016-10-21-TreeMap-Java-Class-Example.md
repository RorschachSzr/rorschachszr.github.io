---
layout: post
title:  "java中的TreeMap类排序实例解析"
categories: TreeMap 
tags:  TreeMap Java Class sort Example 
---

* content
{:toc}

解决多个变量排序问题







## 使用 java.util.TreeMap 类 



* `TreeMap 类`不仅实现了 **Map 接口**，还实现了 **Map 接口**的**子接口 java.util.SortedMap**。 
* `TreeMap 类`中不允许键对象为 **null** 或是 **基本数据类型**，这是因为 TreeMap 中的对象必须是**可排序的**（即含有 equals 或者 compareTo 方法） 

**TreeMap 类**通过实现 *SortedMap* 接口得到的方法如表1所示: 

方法名称         |	返回值类型             | 说明
-----------------|-------------------------|-------
comparator()	 |Comparator<? super K>    |获取 TreeMap 实例使用的 Comparator。使用空的构造方法创建的 TreeMap 实例，则返回 null
fisrtKey()       |	K 	                   |获取第一个（排在最低的）对象的 Key
lastKey()	     |  K	                   |获取最后个（排在最高的）对象的 Key
headMap(K toKey) |	SortedMap<K,V>         |	获取一个子集。其所有对象的 key 的值小于 toKey
subMap(K fromKey, K toKey)|	SortedMap<K,V> |	获取一个子集。其所有对象的 key 的值小于 toKey ，大于等于 fromKey
tailMap(K fromKey)|	SortedMap<K,V>	       |获取一个子集。其所有对象的 key 的值大于等于 fromKey

*表1 TreeMap类通过实现java.util.SortedMap接口得到的方法* 

在创建 TreeMap 对象时，如果使用参数为空的构造方法，则根据 Map 对象的 key 进行排序；如果使用参数为 Comparator 的构造方法，则根据 Comparator 进行排序。 


## HashMap VS. TreeMap 

在添加、删除和定位映射关系上，TreeMap类要比HashMap类的性能差一些，但是其中的映射关系具有一定的顺序。 
如果不需要一个有序的集合，则建议使用HashMap类；如果需要进行有序的遍历输出，则建议使用TreeMap类。  在这种情况下，可以先使用 HashMap。在需要排序时，利用现有的 HashMap，创建一个 TreeMap 类型的实例（例如下面的例子）。 

```Java
import java.util.Collections;  
import java.util.HashMap;  
import java.util.Iterator;  
import java.util.Map;  
import java.util.TreeMap;  
  
public class TestCollection {  
  
    public static void main(String[] args) {  
        System.out.println("开始：");    
                
        Person person1 = new Person("马先生", 220181);  
        Person person2 = new Person("李先生", 220193);  
        Person person3 = new Person("王小姐", 220186);  
          
        Map<Number, Person> map = new HashMap<Number, Person>();  
        map.put(person1.getId_card(), person1);  
        map.put(person2.getId_card(), person2);  
        map.put(person3.getId_card(), person3);  
          
        // HashMap  
        System.out.println("HashMap，无序：");  
        for (Iterator<Number> it = map.keySet().iterator(); it.hasNext();) {  
            Person person = map.get(it.next());  
            System.out.println(person.getId_card() + " " + person.getName());  
        }  
          
        // TreeMap  
        System.out.println("TreeMap，升序：");  
        TreeMap<Number, Person> treeMap = new TreeMap<Number, Person>();  
        treeMap.putAll(map);  
        for (Iterator<Number> it = treeMap.keySet().iterator(); it.hasNext();) {  
            Person person = treeMap.get(it.next());  
            System.out.println(person.getId_card() + " " + person.getName());  
        }  
          
        System.out.println("TreeMap，降序：");  
        TreeMap<Number, Person> treeMap2 =   
            new TreeMap<Number, Person>(Collections.reverseOrder());  
        treeMap2.putAll(map);  
        for (Iterator it = treeMap2.keySet().iterator(); it.hasNext();) {  
            Person person = (Person) treeMap2.get(it.next());  
            System.out.println(person.getId_card() + " " + person.getName());  
        }  
          
        System.out.println("结束！");  
    }  
}  
```


