<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view" :openCommonMask="openMask" :userInfo="userInfo" :invite="invite" @transferUser="getChild"></router-view>
    </transition>
    <div class="pop-ups">
      <!-- 关注公众号 -->
      <transition name="fade">
        <div v-if="mask.attention" class="supernatant attention">
          <div>
            <h3></h3>
            <div @click="closeMask(0)" class="close"><img src="./assets/close.png" alt=""></div>
            <p>
              小主<br>
              关注兴业证券微信公众号<br>
              然后参与竞猜哦
            </p>
            <div class="img"><img src="./assets/QR_code.png" alt=""></div>
            <p>长按识别关注</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-left',
      mask: { // 弹窗控制
        attention: false // 关注公众号
      },
      invite: { // 邀请组件值
        allMyGuest: [ // 我邀请的用户列表（所有）
          // {
          //   nickname: '张顺', // 用户昵称
          //   img: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ6PN2VeESKF8wT50tcje1PQn6kVYGvzvohA4k7rsmsiaNxDyOib6vJcD0jeHicyAFMp9Kn8yvw9cwDA/132' // 用户头像地址
          // }
        ],
        isSubscribe: 1, // 是否关注
        openId: '',
        isTo: 0
      },
      userInfo: {
        openId: '', // openId
        ownerL: '', // 被邀请人的openId (从本地存储中获取的owner)
        ownerU: '' // 是否是被邀请进页面的 （从url中获取的owner）
      },
      shareData: { // 分享
        title: '猜盘指赢红包', // 标题
        desc: '四大指数谁最强劲？邀你助力红包多多！', // 描述
        intoUrl: 'https://static.xyzq.cn/activity/guess-disk/index.html#/', // 地址 (入) 必须是对的地址
        outUrl: 'https://static.xyzq.cn/activity/guess-disk/index.html#/', // 地址（出）
        imgUrl: 'https://static.xyzq.cn/activity/guess-disk/static/images/share_icon.png' // 图标地址
      }
    }
  },
  watch: {
    '$route' (to, from) { // 切换路由时，前进后退使用不同动画
      // const toDepth = to.path.split('/').length
      // const fromDepth = from.path.split('/').length
      const toDepth = this.getLength(to.path)
      const fromDepth = this.getLength(from.path)
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  methods: {
    /**
     * 打开弹窗
     */
    openMask: function (index) {
      var arr = ['attention']
      this.mask[arr[index]] = true
    },
    /**
     * 关闭弹窗
     */
    closeMask: function (index) {
      var arr = ['attention']
      this.mask[arr[index]] = false
    },
    /**
     * 设置微信分享
     */
    setWeixinShare: function () {
      // alert(29)
      var that = this
      // console.log(that)
      var appid = ''
      var timestamp = ''
      var noncestr = ''
      var signature = ''
      var currentDomain = window.location.href.split(/\?|#/)
      var result = ''
      if (currentDomain[2]) {
        result = currentDomain[0] + '?openId=' + this.userInfo.openId + '#' + currentDomain[2]
        // result = currentDomain[0] + '#' + currentDomain[2]
      } else {
        result = currentDomain[0] + '?openId=' + this.userInfo.openId + '#' + currentDomain[1]
        // result = currentDomain[0] + '#' + currentDomain[1]
      }
      // alert(window.location.href)
      // alert(this.userInfo.openId)
      history.replaceState('', document.title, result)

      this.$ajax({
        url: 'https://wechat.xyzq.cn/wechatbiz/accountApi?act=getJsapiInfo',
        params: {'url': this.shareData.intoUrl}, // 微信直接分享地址会变
        responseType: 'json'
      }).then((res) => {
        var data = res.data
        // alert(JSON.stringify(data))
        if (data.code === 0) {
          appid = 'wx513461a9e5de5010'
          timestamp = data.timestamp
          noncestr = data.noncestr
          signature = data.signature
          console.log('appid: %s', appid)
          console.log('timestamp: %s', timestamp)
          console.log('noncestr: %s', noncestr)
          console.log('signature: %s', signature)

          window.wx.config({
            debug: false,
            appId: appid,
            timestamp: timestamp,
            nonceStr: noncestr,
            signature: signature,
            jsApiList: [
              // 所有要调用的 API 都要加到这个列表中
              'onMenuShareTimeline',
              'onMenuShareAppMessage'/* ,
              'hideMenuItems' */
            ]
          })
        }
      })

      window.wx.ready(function () {
        // 发送给朋友
        window.wx.onMenuShareAppMessage({
          title: that.shareData.title, // 分享标题
          desc: that.shareData.desc, // 分享描述
          link: that.shareData.outUrl, // 分享链接
          imgUrl: that.shareData.imgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })
        // 分享到朋友圈
        window.wx.onMenuShareTimeline({
          title: that.shareData.title,
          desc: that.shareData.desc, // 分享描述
          link: that.shareData.outUrl,
          imgUrl: that.shareData.imgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function (res) {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })
        // 批量隐藏功能按钮接口
        // window.wx.hideMenuItems({
        //   menuList: ['menuItem:copyUrl'], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        //   success: function () {
        //     // 用户确认分享后执行的回调函数
        //     alert('成功')
        //   },
        //   fail: function (err) {
        //     // 用户取消分享后执行的回调函数
        //     alert(JSON.stringify(err))
        //   }
        // })

        window.wx.error(function (res) {
          // alert('wx.error'+res.errMsg)
        })
      })
    },
    /**
     * 获取子组件传的值
     */
    getChild: function (msg) {
      // console.log(msg)
      if (msg.allMyGuest) this.invite.allMyGuest = msg.allMyGuest
      if (msg.isSubscribe || msg.isSubscribe === 0) this.invite.isSubscribe = msg.isSubscribe
      if (msg.isTo || msg.isTo === 0) this.invite.isTo = msg.isTo
    },
    /**
     * 剔除空项获取路由长度
     */
    getLength: function (str) {
      var arr = str.split('/')
      for (let i = 0; i < arr.length; i++) {
        const el = arr[i]
        if (el === '') {
          arr.splice(i, 1)
          i--
        }
      }
      return arr.length
    }
  },
  beforeMount: function () {
    this.userInfo.openId = this.GLOBAL.getQueryString('openId') || ''
    this.invite.openId = this.userInfo.openId
    this.userInfo.ownerL = window.localStorage.getItem('guess-disk-owner') || ''
    this.userInfo.ownerU = this.GLOBAL.getQueryString('owner') || ''
    if (this.userInfo.ownerU) {
      window.localStorage.setItem('guess-disk-owner', this.userInfo.ownerU)
    }
    // alert(this.userInfo.openId)
    if (!this.userInfo.openId) {
      // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?scope=snsapi_userinfo&appid=wx513461a9e5de5010&redirect_uri=http%3A%2F%2Fwechat.xyzq.cn%2Fwechatbiz%2Fauth&state=mp-home.linkGuessDisk&response_type=code#wechat_redirec'
    }
    this.shareData.outUrl = 'https://static.xyzq.cn/activity/guess-disk/index.html?owner=' + this.userInfo.openId + '#/'
    this.shareData.intoUrl = 'https://static.xyzq.cn/activity/guess-disk/index.html?openId=' + this.userInfo.openId + '#/'
    if (this.GLOBAL.isWeixin()) {
      window.onload = this.setWeixinShare
    }
  }
}
</script>

<style lang="less">
html, body{
  height: 100%;
  ::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
  }
  #app {
    width: 100%;
    height: 100%;
    background-image: url("./assets/bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* 过渡动画 */
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
      opacity: 0
    }
    .child-view {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transition: all .5s cubic-bezier(.55,0,.1,1);
    }
    .slide-left-enter, .slide-right-leave-active {
      opacity: 0;
      -webkit-transform: translate(30px, 0);
      transform: translate(30px, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
      opacity: 0;
      -webkit-transform: translate(-30px, 0);
      transform: translate(-30px, 0);
    }
    > .pop-ups{
      .supernatant{
        position: fixed;
        z-index: 10;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.7);
        top: 0;
        left: 0;
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        > div{
          width: 6.381944rem; /* 919 */
          border-radius: .347222rem; /* 50 */
          overflow: hidden;
          position: relative;
          box-sizing: border-box;
          h3{
            height: .840278rem; /* 121 */
            line-height: .840278rem; /* 121 */
            background-image: -webkit-linear-gradient(-90deg, #4ac9ff 0%, #a5b1ec 50%, #fe98d9 100%), -webkit-linear-gradient(#ffffff, #ffffff);
            background-image: -o-linear-gradient(-90deg, #4ac9ff 0%, #a5b1ec 50%, #fe98d9 100%), -o-linear-gradient(#ffffff, #ffffff);
            background-image: -moz-linear-gradient(-90deg, #4ac9ff 0%, #a5b1ec 50%, #fe98d9 100%), -moz-linear-gradient(#ffffff, #ffffff);
            background-image: linear-gradient(-90deg, #4ac9ff 0%, #a5b1ec 50%, #fe98d9 100%), linear-gradient(#ffffff, #ffffff);
            text-align: center;
            font-family: PingFangSC-Medium;
            font-size: .333333rem; /* 48 */
            color: #fff;
          }
          .close{
            width: .5625rem; /* 81 */
            height: .5625rem; /* 81 */
            padding: .138889rem;
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }
      .attention{
        > div{
          background-color: #fff;
          p{
            line-height: .520833rem; /* 75 */
            margin: .486111rem 0; /* 70 */
            text-align: center;
            font-family: PingFangSC-Regular;
            font-size: .3125rem; /* 45 */
            color: #333;
          }
          .img{
            margin: 0 auto;
            /* margin-top: -64px; */
            width: 2.777778rem; /* 400 */
            height: 2.777778rem; /* 400 */
            /* height: 2.1875rem; */ /* 315 */
            overflow:hidden;
            img{
              padding:1000px;
              margin:-1000px;
            }
          }
        }
      }
    }
  }
}
</style>
