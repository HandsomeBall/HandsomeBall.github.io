var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
/**
 * base64编码
 * @param {Object} str
 */
function base64encode(str){
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
/**
 * base64解码
 * @param {Object} str
 */
function base64decode(str){
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        }
        while (i < len && c1 == -1);
        if (c1 == -1)
            break;
        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        }
        while (i < len && c2 == -1);
        if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        }
        while (i < len && c3 == -1);
        if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        }
        while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}
/**
 * utf16转utf8
 * @param {Object} str
 */
function utf16to8(str){
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        }
        else
            if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
            else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
    }
    return out;
}
/**
 * utf8转utf16
 * @param {Object} str
 */
function utf8to16(str){
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += str.charAt(i - 1);
                break;
            case 12:
            case 13:
                // 110x xxxx 10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx10xx xxxx10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}
//demo
//function doit(){
//    var f = document.f;
//    f.output.value = base64encode(utf16to8(f.source.value));
//    f.decode.value = utf8to16(base64decode(f.output.value));
//}

var game;  // phaser 游戏实例
var marginLeft = 80;
var marginTop = 80;
var flagWidth = 100;
var flagHeight = 50;
var flagMargin = 10;

var selected;
var timer;

var borderWidth = 5;
var borderGraphics;   // selected 图形设备

var prefix = "\x51\x51\x47\x61\x6d\x65\x20\x4a\x51\x4c\x20\x46\x69\x6c\x65\x00\x57\x04\x00\x00";
var datauriPrefix = "data:text/plain;base64,";
var coredata = [7,11,10,9,12,4,0,13,0,5,6,4,0,13,9,8,0,10,0,11,12,7,8,13,3,3,2,3,12,11].map(function(v){
  return String.fromCharCode(v);
}).join("");  // 默认布局
var coredataChanged = false;

var flagElements = [];  // 保存军棋元素
var flag2hex = {
    "司令": "\x05",
    "军长": "\x06",
    "师长": "\x07",
    "旅长": "\x08",
    "团长": "\x09",
    "营长": "\x0A",
    "连长": "\x0B",
    "排长": "\x0C",
    "工兵": "\x0D",
    "炸弹": "\x04",
    "地雷": "\x03",
    "军棋": "\x02",
    "": "\x00"
};
var hex2flag = {
  "\x05": "司令",
  "\x06": "军长",
  "\x07": "师长",
  "\x08": "旅长",
  "\x09": "团长",
  "\x0A": "营长",
  "\x0B": "连长",
  "\x0C": "排长",
  "\x0D": "工兵",
  "\x04": "炸弹",
  "\x03": "地雷",
  "\x02": "军棋",
  "\x00": ""
};

function makeFlag(text, pos) {
  if (text) {
    // [i, j] = pos;
    var i = pos[0];
    var j = pos[1];
    var bmd = game.add.bitmapData(flagWidth, flagHeight);
    bmd.rect(0, 0, flagWidth, flagHeight, '#55ff55');
    bmd.text(text, 15, 25, '20px 宋体', 'black', false);
    var x = marginLeft + (flagWidth + 2 * flagMargin) * j;
    var y = marginTop + (flagHeight + 2 * flagMargin) * i;
    var drawnObject = game.add.sprite(x, y, bmd);
    drawnObject.i = i;
    drawnObject.j = j;
    drawnObject.inputEnabled = true;
    // 鼠标悬停时有白色边框
    drawnObject.events.onInputOver.add(function(){
      // console.log("当前位置 (" + i + ", " + j + ")");
      borderGraphics.lineStyle(borderWidth, 0xffffff, 1);
      borderGraphics.moveTo(drawnObject.x + 2 - borderWidth, drawnObject.y + 2 - borderWidth);
      borderGraphics.lineTo(drawnObject.x + 2 + flagWidth, drawnObject.y + 2 - borderWidth);
      borderGraphics.lineTo(drawnObject.x + 2 + flagWidth, drawnObject.y + 2 + flagHeight);
      borderGraphics.lineTo(drawnObject.x + 2 - borderWidth, drawnObject.y + 2 + flagHeight);
      borderGraphics.lineTo(drawnObject.x + 2 - borderWidth, drawnObject.y + 2 - borderWidth);
    }, this);
    // 鼠标出边界时清除白色边框
    drawnObject.events.onInputOut.add(function(){
      // console.log("out (" + i + ", " + j + ")")
      borderGraphics.clear();
    }, this);
    drawnObject.events.onInputUp.add(function(){
      if (selected) {
        // 更换下载数据
        var tmp = coredata[selected.i * 5 + selected.j];
        coredata[selected.i * 5 + selected.j] = coredata[drawnObject.i * 5 + drawnObject.j];
        coredata[drawnObject.i * 5 + drawnObject.j] = tmp;
        $("#savejql").prop("href", datauriPrefix + base64encode(prefix + coredata));

        // 停止闪烁，交换位置，选中者清空
        timer.stop();
        timer.destroy();
        selected.visible = true;

        var tmpx, tmpy;
        tmpx = selected.x;
        tmpy = selected.y;
        selected.x = drawnObject.x;
        selected.y = drawnObject.y;
        drawnObject.x = tmpx;
        drawnObject.y = tmpy;

        selected = null;
      } else {
        // 当前按钮被选中，且闪烁
        selected = drawnObject;
        timer = game.time.create(false);
        timer.loop(500, function(){
          selected.visible = !selected.visible;
        }, this);
        timer.start();
      }
    }, this);
    return drawnObject;
  }
}

function preload() {
}

function create() {
  for(var i in coredata) {
    flagElements.push(makeFlag(hex2flag[coredata[i]], [Math.floor(i/5), Math.floor(i%5)]));
  }
  // 初始化下载内容
  $("#savejql").prop("href", datauriPrefix + base64encode(prefix + coredata));
  borderGraphics = game.add.graphics(0, 0);
}

function update() {
  if(coredataChanged) {
    // 销毁之前的元素
    for(var k in flagElements) {
      var f = flagElements[k]
      if (f) {
        f.destroy();
      }
    }
    // 根据数据 coredata 创建新元素
    flagElements = [];
    for(var i in coredata) {
      flagElements.push(makeFlag(hex2flag[coredata[i]], [Math.floor(i/5), Math.floor(i%5)]));
    }
    // 更改下载内容
    $("#savejql").prop("href", datauriPrefix + base64encode(prefix + coredata));
    coredataChanged = false;
  }
}

$(function() {
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: preload, create: create, update: update });
});

// React.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('content')
// );

var reader;
var filedata;

$("#loadjql").on("change", function() {
  var fs = document.getElementById("loadjql");
  if (fs && fs.files && fs.files[0]) {
    reader.readAsBinaryString(fs.files[0]);
  }
  return false;
})

$(function() {
  reader = new FileReader();
  reader.onload = function() {
    filedata = this.result;
    if(this.result.length != 50 || !this.result.startsWith(prefix)) {
      alert("这不是一个军棋布局文件");
      return false;
    }
    for(var i in this.result) {
      console.log(this.result.charCodeAt(i).toString(16));
      coredata = this.result.substr(prefix.length);
      coredataChanged = true;
    }
  }
});
