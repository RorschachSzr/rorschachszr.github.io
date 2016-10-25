---
layout: post
title:  "java中的TreeMap类排序实例解析"
categories: TreeMap 
tags:  TreeMap Java Class sort Example 
---

* content
{:toc}

解决多个变量排序问题







## 当Key 不重复时排序



* `TreeMap 类`不仅实现了 **Map 接口**，还实现了 **Map 接口**的**子接口 java.util.SortedMap**。 
* `TreeMap 类`中不允许键对象为 **null** 或是 **基本数据类型**，这是因为 TreeMap 中的对象必须是**可排序的**（即含有 equals 或者 compareTo 方法） 

**TreeMap 类**通过实现 *SortedMap* 接口得到的方法如表1所示: 

方法名称         |	返回值类型             | 说明
-----------------|-------------------------|-------
comparator()	 |Comparator< ? super K>   |获取 TreeMap 实例使用的 Comparator。使用空的构造方法创建的 TreeMap 实例，则返回 null
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

```java
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


## 当Key 重复时排序

如果我们需要一个有序的Map，我们会使用TreeMap进行存储。TreeMap默认是按照key值升序进行排序的，如数字、ASCII。
如果我们需要对**TreeMap**按值进行排序的话，可以实例化`Comparator接口`，在**TreeMap**的构造方法中当作参数传入。
这里遇到了问题：当插入TreeMap的**两条数据value值一样的时候，后一条数据会覆盖前一条数据。**
通过查资料发现，原因是实例化`Comparator接口`的时候，相当于自己**实现了一个比较器**，而TreeMap的插入与取出都是会经过比较器的。
以下是我自己实现的比较器...
代码为：

```java
//重写comparator方法，避免key无法重复，
    static class ItemComparator implements Comparator {
        public int compare(Object element1, Object element2) {
            CharacterForm item1 = (CharacterForm) element1;
            CharacterForm item2 = (CharacterForm) element2;
        return item2.getNum().compareTo(item1.getNum());//降序
//      return item1.getNum().compareTo(item2.getNum()); //升序
        }
    }
```

以下是我自己项目实际操作的代码：

```java
    //比较最大的数
    public String SelectCharacter(int one, int two, int three, int four, int five, int six,
            int seven, int eight, int nine){
        CharacterForm characterForm1 = new CharacterForm("1",  Integer.toString(one));  
        CharacterForm characterForm2 = new CharacterForm("2",  Integer.toString(two));  
        CharacterForm characterForm3 = new CharacterForm("3",  Integer.toString(three));  
        CharacterForm characterForm4 = new CharacterForm("4",  Integer.toString(four));  
        CharacterForm characterForm5 = new CharacterForm("5",  Integer.toString(five));  
        CharacterForm characterForm6 = new CharacterForm("6",  Integer.toString(six));  
        CharacterForm characterForm7 = new CharacterForm("7",  Integer.toString(seven));  
        CharacterForm characterForm8 = new CharacterForm("8",  Integer.toString(eight));  
        CharacterForm characterForm9 = new CharacterForm("9",  Integer.toString(nine));
        
        List tm =new ArrayList();
        tm.add(characterForm1);
        tm.add(characterForm2);
        tm.add(characterForm3);
        tm.add(characterForm4);
        tm.add(characterForm5);
        tm.add(characterForm6);
        tm.add(characterForm7);
        tm.add(characterForm8);
        tm.add(characterForm9);
        
        Collections.sort(tm, new ItemComparator());
        Iterator it = tm.iterator();
        int i =0;
        int info_size=3;
        String Character_result = null;
        
        while (i<=3) {
            CharacterForm character_type = (CharacterForm)it.next();
            i+=1;
            if(i==1){
                Character_result=character_type.getType();
            }else if(i<=info_size){
                Character_result=Character_result+character_type.getType(); //get top three type
            }
        }
        
        return Character_result;
        
    }
```






