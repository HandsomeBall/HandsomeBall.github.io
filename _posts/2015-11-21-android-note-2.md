---
layout: post
title:  "Android 应用开发笔记 (2)"
date:   2015-11-21 00:37:00
tags: android note
category: blog
---

#Android 应用开发笔记 (2)

继续做我的小应用

### 应用数据库工具 SharedPreferences

参考[文章](http://www.cnblogs.com/devinzhang/archive/2012/01/12/2320868.html)  

    //获得SharedPreferences对象
    SharedPreferences settings = this.getSharedPreferences("shared_file", 0);

    int age = settings.getInt("age", 0);

    //获得可编辑对象
    SharedPreferences.Editor editor = settings.edit();

    editor.putString("name", "Kael Chen");
    editor.putInt("age", 22);
    editor.commit();

    editor.remove("name");  
    editor.commit();  

### TextView 居中

    android:gravity = "center"

### TextView 字体大小

    android:textSize="32sp"

### 标题栏(ActionBar)

Android 中对应 iOS 中 Navigation 概念的是 标题栏  
而 Android 中的 NavigationBar 指的是返回键、主页键等  

Android 的标题栏是由 theme 定义的  
所以修改标题栏的行为需要修改 theme  

### 隐藏标题栏

见[解答](http://stackoverflow.com/questions/2591036/how-to-hide-the-title-bar-for-an-activity-in-xml-with-existing-custom-theme)
和[解答](http://stackoverflow.com/questions/30746109/how-to-remove-title-bar-from-activity-extending-actionbaractivity-or-appcompatac)

    //Remove title bar
    this.requestWindowFeature(Window.FEATURE_NO_TITLE);
    getSupportActionBar().hide();

    //Remove notification bar
    this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

    //set content view AFTER ABOVE sequence (to avoid crash)
    this.setContentView(R.layout.your_layout_name_here);

### ActionBar 返回

见[解答](http://stackoverflow.com/questions/15686555/display-back-button-on-action-bar)

    actionBar.setDisplayHomeAsUpEnabled(true);  // 显示返回键

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                // app icon in action bar clicked; go home
                Intent intent = new Intent(this, HomeActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                startActivity(intent);
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

### ActionBar 改变背景颜色

见[解答](http://stackoverflow.com/questions/8024706/how-do-i-change-the-background-color-of-the-actionbar-of-an-actionbaractivity-us)

    bar.setBackgroundDrawable(new ColorDrawable(Color.parseColor("#F0AD4E")));

### 更漂亮的 Button

使用这个[Button 样式](https://github.com/hoang8f/android-flat-button)  

在 build.gradle 中添加

    dependencies {
      compile 'info.hoang8f:fbutton:1.0.5'
    }

添加 xml 命名空间

    xmlns:fbutton="http://schemas.android.com/apk/res-auto"

使用 Button

    <info.hoang8f.widget.FButton
        ...
       fbutton:buttonColor="@color/color_concrete"
       fbutton:shadowColor="@color/color_asbestos"
       fbutton:shadowEnabled="true"
       fbutton:shadowHeight="5dp"
       fbutton:cornerRadius="5dp"
       ...
       />

如果把这个按钮和别的组件放在同一行，点击按钮时可能会发生抖动  
这是因为这个按钮有 5dp 的 shadow 高度  
解决方法是设置按钮高度为固定数值，且比别的组件大 5dp。

### 重复背景图片

直接看[文章](http://www.oschina.net/question/54100_34027)就行，注意其中没有 repeat-x 和 repeat-y

### .9.png

制作 .9.png 图片只需要找到 draw9patch.bat 运行即可  
黑色线条表示可拉伸区域  

### 导入 jar 包

把 jar 包复制到 项目文件夹/app/libs 即可  
build.gradle 中有相应的编译语句  

### View 隐藏且不占位

用 gone 表示隐藏且不占位  
用 invisible 表示隐藏但占位

    android:visibility="gone"
    view.setVisibility(View.GONE);

### 自定义 ActionBar

X  参考[文章](http://blog.csdn.net/xy_nyle/article/details/18970211)  
X  [ActionBar 生成网站](http://jgilfelt.github.io/android-actionbarstylegenerator/)  
参考[文章](http://blog.csdn.net/dreamintheworld/article/details/39314121)  
参考[解答](http://stackoverflow.com/questions/27354812/android-remove-left-margin-from-actionbars-custom-layout)  

应该添加如下代码

    actionBar = getSupportActionBar();
    actionBar.setDisplayShowHomeEnabled(false);
    actionBar.setDisplayShowCustomEnabled(true);
    actionBar.setDisplayShowTitleEnabled(false);
    actionBar.setCustomView(R.layout.custom_action_bar);
    Toolbar parent =(Toolbar) actionBar.getCustomView().getParent();
    arent.setContentInsetsAbsolute(0,0);

然后添加相应的布局文件即可
