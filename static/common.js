// 设置rem
function resRem () {
  var deviceWidth = document.documentElement.clientWidth
  document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'
}
resRem()
window.onresize = resRem

/* 判断手机是安卓还是ios */
function isAndroid () {
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
  // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isAndroid) {
    return true
  }
  return false
}

// 判断微信环境
function isWeixin () {
  var ua = navigator.userAgent.toLowerCase()
  if ((ua.match(/MicroMessenger/i) + '') === 'micromessenger') {
    return true
  } else {
    return false
  }
}

// 判断环境
var browser = {
  versions: (function () {
    var u = navigator.userAgent
    // VAR app = navigator.appVersion
    return { // 移动终端浏览器版本信息

      trident: u.indexOf('Trident') > -1, // IE内核

      presto: u.indexOf('Presto') > -1, // opera内核

      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核

      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核

      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端

      ios: !!u.match(/\(i[^]+;( U;)? CPU.+Mac OS X/), // ios终端

      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器

      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器

      iPad: u.indexOf('iPad') > -1, // 是否iPad

      webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部

    }
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

/* 引入微信分享文件 */
function addWechatShare () {
  var head, script1, scriptSrc1
  head = document.getElementsByTagName('head')[0]
  script1 = document.createElement('script')
  scriptSrc1 = './static/lib/jweixin/jweixin-1.2.0.js'
  script1.src = scriptSrc1
  head.appendChild(script1)
}

/* 引入cordova */
function addCordova () {
  var head, script1, scriptSrc1
  if (isAndroid()) {
    scriptSrc1 = './static/lib/cordova1.0.3/android/cordova.js'
  } else {
    scriptSrc1 = './static/lib/cordova1.0.3/ios/cordova.js'
  }
  head = document.getElementsByTagName('head')[0]
  script1 = document.createElement('script')
  script1.src = scriptSrc1
  head.appendChild(script1)
}

/**
 * 获取url地址参数
 * @param  {[type]} name [地址参数名]
 * @return {[type]}      [description]
 */
function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

/**
 * 判断优理宝环境
 */
function isUlb () {
  var params = getQueryString('inUlb')
  if (params) {
    return true
  } else {
    return false
  }
}

function loadFile () {
  if (isWeixin()) {
    addWechatShare()
    return
  }
  if (browser.versions.mobile) { // 判断是否是移动设备打开。browser代码在下面
    var ua = navigator.userAgent.toLowerCase() // 获取判断用的对象
    if ((ua.match(/MicroMessenger/i) + '') === '' || (ua.match(/WeiBo/i) + '') === 'weibo') {
      return
    }
  }
  if (isUlb()) {
    addCordova()
  }
}
loadFile()
