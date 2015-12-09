---
layout: post
title:  "Android 应用开发笔记 (5)"
date:   2015-12-04 16:15:00
tags: android note
category: blog
---

# Android 应用开发笔记 (5)

### android 全屏

    requestWindowFeature(Window.FEATURE_NO_TITLE);
    getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                         WindowManager.LayoutParams.FLAG_FULLSCREEN);
    setContentView(R.layout.main);

### default activity not found

需要指定启动页面的 Activity  
在 AndroidManifest.xml 中气动页的 activity 中添加如下内容  

    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>

### View 的生命周期

喜欢[这篇文章](http://www.cnblogs.com/manbu/p/3583985.html)中的内容

    onFinishInflate()  // 当View中所有的子控件均被映射成xml后触发
    onMeasure(int, int)  // 确定所有子元素的大小
    onLayout(boolean, int, int, int, int)  // 当View分配所有的子元素的大小和位置时触发    
    onSizeChanged(int, int, int, int)  // 当view的大小发生变化时触发  
    onDraw(Canvas)  // view渲染内容的细节  
    onKeyDown(int, KeyEvent)  // 有按键按下后触发  
    onKeyUp(int, KeyEvent)  // 有按键按下后弹起时触发  
    onTrackballEvent(MotionEvent)  // 轨迹球事件  
    onTouchEvent(MotionEvent)  // 触屏事件  
    onFocusChanged(boolean, int, Rect)  // 当View获取或失去焦点时触发   
    onWindowFocusChanged(boolean)  // 当窗口包含的view获取或失去焦点时触发  
    onAttachedToWindow()  // 当view被附着到一个窗口时触发  
    onDetachedFromWindow()  // 当view离开附着的窗口时触发，Android123提示该方法和  onAttachedToWindow() 是相反的。  
    onWindowVisibilityChanged(int)  // 当窗口中包含的可见的view发生变化时触发

### 自定义 View NoSuchMethodException

看[文章](http://blog.csdn.net/lmj623565791/article/details/24252901)
和[文章](http://www.ithao123.cn/content-10239390.html)
可以知道是缺少一个双参数构造方法的原因

    public ChessBoard(Context context, AttributeSet attrs)
    {
        super(context, attrs);
        ...
    }

### 自定义 View 初始化数据

如果数据和 width、height 等元素尺寸相关，则不应该在构造函数中初始化  
应该在 onMeasure 中处理  

    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        // do what you want
    }

如果需要自己定义宽度、高度，可以这样处理

    int width = MeasureSpec.getSize(widthMeasureSpec);
    int height = MeasureSpec.getSize(heightMeasureSpec)
    setMeasuredDimension(width, height);

### 自定义 View 触发重绘

    view.invalidate();

### 播放声音

    win = MediaPlayer.create(context, R.raw.win);
    win.start();

### Dialog 风格 Activity

    android:theme="@android:style/Theme.Dialog"

### You need to use a Theme.AppCompat theme (or descendant) with this activity.

让那个 Activity 直接继承自 Activity 就行

### Activity 跳转

    startActivity(new Intent(this, SomeActivity.class))  // 跳转
    finish()  // 结束当前 Acitivity
    startActivityforResult  // 获取返回值并启动 Activity
    finishActivity  // 关闭 Intent 的 Acitivity
