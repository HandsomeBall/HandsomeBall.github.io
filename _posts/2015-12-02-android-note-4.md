---
layout: post
title:  "Android 应用开发笔记 (4)"
date:   2015-11-27 09:49:00
tags: android note
category: blog
---

# Android 应用开发笔记 (4)

### 如何导入 eclipse 工程

在 Android Studio 的 Quick Start 中点击 Import Project （Eclipse ADT ...） 即可  
如果找不到 Quick Start 可以点击 File -> Close Project  

在 build.gradle 中把 android -> compileSdkVersion 设置为当前版本  


### 错误：ADB not responding. If you'd like to retry, then please manually kill "adb.exe" and click 'Restart'

检查任务管理器后发现没有 adb.exe 运行  
不知道又是哪个流氓程序把 adb 改了个名字运行  
运行命令（Windows）

    netstat -aon|findstr "5037"

可以看到占用端口的是哪个进程  
到任务管理器中杀掉就可以了  
进程名字是 kadb.exe  
