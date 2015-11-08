---
layout: post
title:  "在 Windows 上安装 react-natvie 并运行 HelloWorld"
date:   2015-11-07 23:36:00
tags: react-native helloworld
category: blog
---


# 在 Windows 上安装 React-native 并运行 HelloWorld

[参考文章](http://my.oschina.net/jackzlz/blog/508210)


### git

安装 git


### nodejs

安装 nodejs  
（以下修改是因为后面 react-native init 时卡住了，不确定有没有用）  
修改 npm 为淘宝的源。可以在 npm 安装目录下的 npmrc 文件中添加 ```registry=https://registry.npm.taobao.org```  

升级 npm 到 3.x（不确定是否必要），具体的版本号见 npm github 上的 [release](https://github.com/npm/npm/releases) 版本号  
[升级方法](http://jingyan.baidu.com/article/ac6a9a5e60a44f2b653eac85.html)  


### 命令行

    # 命令尽量在 windows 的命令行下执行，否则可能会有路径问题  
    npm install -g react-native-cli  
    cd 你想要创建新项目的目录  
    react-native init 项目名称  # 这一步耗时很长，我用了2小时  

建议把第一个项目存起来，然后每次使用时直接复制，就不要再重新创建项目了  
因为重新创建的话，耗时也很长。


### Android 环境

安装 AndroidStudio，SDK也在这个包里  
安装好后，还需要安装几个包，建议找到 SDK.exe 文件，直接运行安装  
各种镜像也不靠谱，还是需要连接 VPN 来做  
用 AndroidStudio 打开刚才创建的项目中 android 文件夹  
运行搞定  

如果卡在 ```Gradle: Configure Project: ```，可以把源改为开源中国  
把文件 build.gradle 中的  

    allprojects {
      ...
    }

改为

    allprojects {
        repositories {
            mavenLocal()
            maven{ url 'http://maven.oschina.net/content/groups/public/'}
        }
    }


把

    repositories {
        jcenter()
    }

改为

    repositories {
        maven{ url 'http://maven.oschina.net/content/groups/public/'}
    }

这样就能成功构建了  

如果成功构建后运行按钮还是灰色，重启一下 Android Studio  
等再次构建成功后就可以运行了  

现在运行的 App 可能是一片红色  
在项目目录下运行 ```react-native start``` 等启动就绪后点击 App 中的 ReloadJS  
可以看到 App 中的 HelloWorld 了


### 总结

遇到的很多问题都是因为墙的原因  
VPN 并不能优雅的解决问题，它不能和镜像很好的协同工作  
踩坑爬坑的能力对程序员很重要，也很无趣
