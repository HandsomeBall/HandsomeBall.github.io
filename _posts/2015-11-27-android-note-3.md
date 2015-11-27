---
layout: post
title:  "Android 应用开发笔记 (3)"
date:   2015-11-27 09:49:00
tags: android note
category: blog
---

#Android 应用开发笔记 (3)

### 延迟加载

比如广告等东西是需要延迟加载的，不然卡顿太严重

    // 延迟 500ms 加载 Admob 广告
    new Handler().postDelayed(() -> {
        AdView mAdView = (AdView) findViewById(R.id.adView);
        AdRequest adRequest = new AdRequest.Builder().build();
        mAdView.loadAd(adRequest);
    }, 500);


### Android 版本号

Android 版本号应该在 AndroidManifest.xml 文件的根节点中声明，见[文章](http://android.blog.51cto.com/268543/633571)  
使用 Gradle 的话，应该在 build.gradle 中修改

    android {
        defaultConfig {
            versionCode 2
            versionName "1.1"
    }

### Google Play 发布应用后搜索不到

见[在Google Play发布应用后，为什么搜索不到？](http://www.baijingapp.com/question/3729)  
应该搜索包名  
