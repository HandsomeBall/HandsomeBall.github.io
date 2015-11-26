---
layout: post
title:  "Android 应用的开发知识点笔记 (1)"
date:   2015-11-19 23:36:00
tags: android note
category: blog
---

#Android 应用的开发知识点笔记 (1)

还是不想上班，想自己捣鼓一点东西，再做一下努力吧！  

### 在 Android 中使用 Lambda

对 Java 开发一直不能忍的就是它冗长的语法，Java 8 缓解了这一现状，不过 Android 还未跟进  
国外大牛已经给出了[一个 Gradle 插件](https://github.com/evant/gradle-retrolambda)来解决问题  

对于 Android Studio，还需要消灭对 Java 8 的语法警告  

    android {
      compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
      }
    }


### 在 Android 中使用 Stream API

    dependencies {
      compile 'com.annimon:stream:1.0.4'
    }

使用例子：

    List<Integer> list = Stream.of(oldList)
                .distinct()  // 去重
                .filter((Integer x) -> (x >= 0 && x <= 9))
                .collect(Collectors.toList());

### 使用 ListView，并修改数据

添加适配器

    SimpleAdapter listAdapter = new SimpleAdapter(this, this.history, R.layout.resultline,
                    new String[]{"input", "same", "like", "wrong"},
                    new int[]{R.id.input, R.id.same, R.id.like, R.id.wrong});
    listView.setAdapter(listAdapter);

修改数据后使用

    listAdapter.notifyDataSetChanged();  // 适配器更新数据

### ScrollView 和 ListView 合用

参考[文章](http://bbs.anzhuo.cn/thread-982250-1-1.html)  
通过方法 4 创建一个自己的 ListView 子类即可  

### AlertView 的使用

最简单的 AlertView

    new AlertDialog.Builder(this).setTitle("输入错误").setMessage("请输入4个不同的数字").show();

### EditText 获取焦点

    editText.requestFocus();

### ScrollView 滚动到底部

找了很久，还是 Google 给力，StackOverflow 给力！

    scroll.post(new Runnable() {            
        public void run() {
            scroll.fullScroll(View.FOCUS_DOWN);              
        }
    });

支持 lambda 的话

    scrollView.post(() -> scrollView.fullScroll(View.FOCUS_DOWN));

### EditText 无法获取焦点

情况是直接使用 ```editText.requestFocus()``` 无法正确获取焦点  
使用  

    editText.post(new Runnable() {
        public void run() {
            editText.requestFocus();
        }
    });

支持 lambda 的话

     editText.post(() -> editText.requestFocus());

这个 post 是什么神奇的方法？后面得好好研究下。
