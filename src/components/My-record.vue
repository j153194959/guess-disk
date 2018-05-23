<template>
  <div class="My-record">
    <div class="page-container">
      <h1><i></i>我的战绩<i></i></h1>
      <div class="parcel clearfix">
        <div><img :src=myRecord.user.img onerror="onerror=null;src='../../static/images/wechat.png'" alt=""></div>
        <div>红包金额:{{myRecord.user.amount + myRecord.user.packets}}元</div>
        <div :class="{disabled: myRecord.user.amount + myRecord.user.packets <= 0}" @click="withdraw">{{myRecord.user.phone ? myRecord.user.phone : '我要提现'}}</div>
      </div>
      <nav class="clearfix">
        <div @click="clickNav(0)" v-bind:class="[current ? '' : 'current']">竞猜红包<span>+{{myRecord.user.amount}}元</span></div>
        <div @click="clickNav(1)" v-bind:class="[!current ? '' : 'current']">邀请红包<span>+{{myRecord.user.packets}}元</span></div>
      </nav>
      <router-view :myRecord="myRecord.myRecord" :invite="invite" :openCommonMask="openCommonMask"></router-view>
    </div>
    <div class="pop-ups">
      <!-- 手机验证 -->
      <transition name="fade">
        <div v-if="mask.verification" class="supernatant verification">
          <div>
            <h3>验证手机号并提现</h3>
            <div @click="closeMask(0)" class="close"><img src="../assets/close.png" alt=""></div>
            <div class="phone input">
              <div>手机号码：</div>
              <!-- <input v-focus placeholder="请输入手机号码" v-model="input.tel" type="tel"> -->
              <input placeholder="请输入手机号码" v-model="input.tel" type="tel">
            </div>
            <div class="code input">
              <div>验证码：</div>
              <input v-model="input.code" type="number">
            </div>
            <a @click="getCode" :class="['getCode', {'isGet': input.isGet}]" href="javascript:void(0)">{{input.isGet ? input.Countdown + 's后重新发送' : '获取验证码'}}</a>
            <div class="des">
              点击“提交”,即表示您已经同意<br>
              <a href="https://estock.xyzq.com.cn/views/hallwap/platform/app/serviceterm.html">《兴证通用户服务条款》</a>
            </div>
            <a @click="submit" :class="['submit', {'gray': !input.tel || !input.code}]" href="javascript:void(0)">提交</a>
          </div>
        </div>
      </transition>
      <!-- 提现成功 -->
      <transition name="fade">
        <div v-if="mask.success" class="supernatant success">
          <div>
            <h3></h3>
            <div @click="closeMask(1)" class="close"><img src="../assets/close.png" alt=""></div>
            <p>
              小主，我们已经记录您的手机号，<br>
              累计话费奖励将在活动结束后统一发放，<br>
              不要着急哦！
            </p>
            <a @click="closeMask(1)" href="javascript:void(0)">好的吧</a>
          </div>
        </div>
      </transition>
      <!-- 提示语 -->
      <transition name="fade">
        <div v-if="mask.prompt.isShow" class="supernatant prompt">
          <div>
            <div>{{mask.prompt.msg}}</div>
            <a @click="mask.prompt.isShow = false" href="javascript:void(0);">好的</a>
          </div>
        </div>
      </transition>
      <!-- 加载 -->
      <Loading v-if="mask.isLoading"></Loading>
    </div>
  </div>
</template>

<script>
import Loading from './common/Loading'

export default {
  name: 'My-record',
  data () {
    return {
      current: 0, // 导航栏 0-左边 1-右边
      mask: { // 弹窗控制
        verification: false, // 手机验证
        success: false, // 提现成功
        prompt: { // 提示
          msg: '', // 提示语
          isShow: false
        },
        isLoading: false // 加载
      },
      myRecord: {
        user: {
          amount: 0, // 竞猜红包
          packets: 0, // 邀请红包
          img: '', // 用户头像地址
          phone: null // 绑定手机号
        },
        myRecord: [ // 我的竞猜记录
          // {
          //   type: 1, // 我的竞猜类型(1-上证;2-深圳;3-创业版;4-中小版)
          //   result: 0, // 竞猜结果(0-待公布;1-中奖;2-未中奖)
          //   targetTime: 1520328319000, // 日期
          //   createTime: 1520241919000, // 竞猜时间
          //   outcome: null // 结果(1-上证;2-深圳;3-创业版;4-中小版)
          // }
        ]
      },
      input: { // 输入框
        tel: '', // 手机号码
        code: '', // 验证码
        Countdown: 60, // 倒计时
        isGet: false // 是否获取到验证码
      }
    }
  },
  props: ['invite', 'openCommonMask', 'userInfo'], // 接收父组件的值
  components: {
    Loading
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    /**
     * 打开弹窗
     */
    openMask: function (index) {
      var arr = ['verification', 'success']
      this.mask[arr[index]] = true
      // if (index === 0) {
      //   setTimeout(() => {
      //     console.log(this.$refs.phone)
      //     this.$refs.phone.focus()
      //   }, 300)
      // }
    },
    /**
     * 关闭弹窗
     */
    closeMask: function (index) {
      var arr = ['verification', 'success']
      this.mask[arr[index]] = false
    },
    /**
     * 打开提示窗
     */
    openPrompt: function (msg) {
      this.mask.prompt.msg = msg
      this.mask.prompt.isShow = true
    },
    /**
     * 点击 导航栏
     */
    clickNav: function (type) {
      if (type) {
        this.current = 1
        this.$router.replace({name: 'Invite'})
      } else {
        this.current = 0
        this.$router.replace({name: 'default_r'})
      }
    },
    /**
     * 点击 我要提现
     */
    withdraw: function () {
      // 官微_猜盘指_我要提现 埋点
      window.TDAPP.onEvent('Wechat_GCI_Withdraw', '', {openId: this.userInfo.openId})
      if (this.myRecord.user.amount + this.myRecord.user.packets <= 0) return
      if (this.myRecord.user.phone) {
        this.openMask(1)
        return
      }
      this.openMask(0)
    },
    /**
     * 获取 我的竞猜数据
     */
    getMyRecord: function () {
      if (!this.userInfo.openId) return
      this.mask.isLoading = true
      this.$ajax({
        url: '/myRecord',
        params: {
          openid: this.userInfo.openId
        }
      }).then((res) => {
        const data = res.data.respbody
        console.log(data)
        this.myRecord.user.amount = data.user.amount
        this.myRecord.user.img = data.user.img
        this.myRecord.user.packets = data.user.packets
        this.myRecord.user.phone = data.user.phone
        // this.myRecord.myRecord.phone = data.myRecord.phone
        for (let i = 0; i < data.myRecord.length; i++) {
          const el = data.myRecord[i]
          var o = {}
          o.createTime = el.createTime
          o.outcome = el.outcome
          o.result = el.result
          o.targetTime = el.targetTime
          o.type = el.type
          this.myRecord.myRecord.push(o)
        }
        this.mask.isLoading = false
      }).catch((err) => {
        console.log(err)
        this.openPrompt('服务器繁忙，请稍后重试')
        this.mask.isLoading = false
      })
    },
    /**
     * 点击 获取验证码
     */
    getCode: function () {
      if (this.input.isGet) return
      if (!this.input.tel) {
        this.openPrompt('请输入手机号')
      } else if (!this.GLOBAL.pattern(this.input.tel)) {
        this.openPrompt('手机号输入有误，请重新输入！')
        this.input.tel = ''
      } else {
        this.mask.isLoading = true
        this.$ajax({
          url: '/sendSms',
          params: {
            openid: this.userInfo.openId,
            phone: this.input.tel
          }
        }).then((res) => {
          // console.log(res)
          // var resp = {
          //   respbody: 'success',
          //   resphead: {
          //     respcode: '0000',
          //     respdetails: '成功'
          //   }
          // }
          // const data = resp.resphead.respcode
          const data = res.data.resphead.respcode
          if (data === '0000') {
            this.input.isGet = true
            this.input.Countdown = 60
            var timer = setInterval(() => {
              this.input.Countdown--
              if (this.input.Countdown <= 0) {
                clearInterval(timer)
                this.input.isGet = false
              }
            }, 1000)
          } else if (data === '1007') {
            this.openPrompt('对不起,您已经绑定过了')
          } else if (data === '1005') {
            this.openPrompt('短信发送失败')
          } else {
            this.openPrompt('服务器繁忙，请稍后重试')
          }
          this.mask.isLoading = false
        }).catch((err) => {
          console.log(err)
          this.openPrompt('服务器繁忙，请稍后重试')
          this.mask.isLoading = false
        })
      }
    },
    /**
     * 点击 提交
     */
    submit: function () {
      if (!this.input.tel || !this.input.code) {

      } else if (!this.GLOBAL.pattern(this.input.tel)) {
        this.openPrompt('手机号输入有误，请重新输入！')
        this.input.tel = ''
      } else {
        this.mask.isLoading = true
        this.$ajax({
          url: '/checkSms',
          params: {
            openid: this.userInfo.openId,
            phone: this.input.tel,
            code: this.input.code
          }
        }).then((res) => {
          // console.log(res)
          // var resp = {
          //   respbody: 'success',
          //   resphead: {
          //     respcode: '0000',
          //     respdetails: '成功'
          //   }
          // }
          // const data = resp.resphead.respcode
          const data = res.data.resphead.respcode
          if (data === '0000') {
            this.openMask(1)
            this.closeMask(0)
            this.myRecord.user.phone = this.input.tel
          } else if (data === '1006') {
            this.openPrompt('验证码校验错误')
            this.input.code = ''
          } else if (data === '1007') {
            this.openPrompt('对不起,您已经绑定过了')
          } else {
            this.openPrompt('服务器繁忙，请稍后重试')
          }
          this.mask.isLoading = false
        }).catch((err) => {
          console.log(err)
          this.openPrompt('服务器繁忙，请稍后重试')
          this.mask.isLoading = false
        })
      }
    }
  },
  beforeMount: function () {
    if (this.$route.name === 'Invite') {
      this.current = 1
    }
  },
  mounted: function () {
    this.getMyRecord()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.My-record{
  height: 100%;
  width: 100%;
  overflow: scroll;
  .page-container{
    width: 6.909722rem; /* 995 */
    margin: .229167rem auto; /* 33 */
    border-radius: .347222rem; /* 50 */
    overflow: hidden;
    background-color: #fff;
    h1{
      text-align: center;
      color: #fff;
      font-size: .333333rem; /* 48 */
      font-family: PingFangSC-Medium;
      height: 1.006944rem; /* 145 */
      line-height: 1.006944rem; /* 145 */
      position: relative;
      font-weight: normal;
      /* background-image: linear-gradient(-90deg,#4ac9ff 0%, #a5b1ec 50%, #fe98d9 100%), linear-gradient(#fcf302, #fcf302); */
      background: -webkit-linear-gradient(-90deg, #4ac9ff 0%, #a5b1ec 50%, #fe98d9 100%), -webkit-linear-gradient(#fcf302, #fcf302); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(-90deg, #4ac9ff 0%, #a5b1ec 50%, #fe98d9 100%), -o-linear-gradient(#fcf302, #fcf302); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(-90deg, #4ac9ff 0%, #a5b1ec 50%, #fe98d9 100%), -moz-linear-gradient(#fcf302, #fcf302); /* Firefox 3.6 - 15 */
      background: linear-gradient(-90deg, #4ac9ff 0%, #a5b1ec 50%, #fe98d9 100%), linear-gradient(#fcf302, #fcf302); /* 标准的语法 */
      i{
        position: absolute;
        top: .347222rem; /* 50 */
        width: .388889rem; /* 56 */
        height: .388889rem; /* 56 */
        background: url("../assets/small-point.png") no-repeat;
        background-size: contain;
        &:first-of-type{
          left: .861111rem; /* 124 */
        }
        &:last-of-type{
          right: .861111rem; /* 124 */
        }
      }
    }
    .parcel{
      height: 1.958333rem; /* 282 */
      border-bottom: 1px dashed #eee;
      div{
        float: left;
        &:nth-child(1){
          width: .972222rem; /* 140 */
          height: .972222rem; /* 140 */
          margin: .416667rem 0 0 .402778rem; /* 60 58 */
          background-image: url("../assets/wechat.png");
          background-repeat: no-repeat;
          background-size: contain;
        }
        &:nth-child(2){
          height: .319444rem; /* 46 */
          font-family: PingFangSC-Medium;
          font-size: .333333rem; /* 48 */
          color: #333;
          margin: .854167rem 0 0 .25rem; /* 123 36 */
        }
        &:nth-child(3){
          width: 2.465278rem; /* 355 */
          height: .6875rem; /* 99 */
          line-height: .6875rem; /* 99 */
          background-color: #ffe03b;
          border-radius: .340278rem; /* 49 */
	        color: #fff8f4;
          font-family: PingFangSC-Semibold;
          font-size: .333333rem; /* 48 */
          margin: .673611rem 0 0 .569444rem; /* 97 82 */
          text-align: center;
        }
      }
      .disabled{
        background-color: #BEBEBE !important;
      }
    }
    nav{
      width: 5.1875rem; /* 747 */
      height: .833333rem; /* 120 */
      line-height: .833333rem; /* 120 */
      border-radius: .347222rem; /* 50 */
      border: solid .020833rem #19ccff; /* 30 */
      margin: .409722rem auto 0; /* 59 */
      overflow: hidden;
      div{
        float: left;
        width: 50%;
        font-family: PingFangSC-Regular;
        font-size: .3125rem; /* 45 */
        color: #bfbfbf;
        height: 100%;
        text-align: center;
        span{
          color: #ffb1b1;
        }
      }
      div.current{
        color: #fff;
        background-color: #19B1FF;
        span{
	        color: #f00;
        }
      }
    }
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
    .verification{
      > div{
        background-color: #fff;
        .input{
          border-radius: 50px;
          border: solid 1px #19ccff;
          font-family: PingFangSC-Regular;
          font-size: .3125rem; /* 45 */
          color: #bfbfbf;
          overflow: hidden;
          position: relative;
          height: .694444rem; /* 100 */
          line-height: .694444rem; /* 100 */
          div{
            position: absolute;
            top: 0;
            left: 0;
            padding: 0 .479167rem; /* 69 */
            height: 100%;
          }
          input{
            display: block;
            height: 100%;
            box-sizing: border-box;
            color: #bfbfbf;
            font-size: .3125rem; /* 45 */
            line-height: .694444rem; /* 100 */
          }
        }
        .phone{
          margin: .513889rem auto 0; /* 74 */
          width: 5.708333rem; /* 822 */
          input{
            width: 100%;
            padding-left: 2.173611rem; /* 313 */
          }
        }
        .code{
          margin: .291667rem 0 0 .333333rem; /* 42 48 */
          width: 3.361111rem; /* 484 */
          input{
            padding-left: 1.847222rem; /* 266 */
          }
        }
        .getCode{
          width: 2.180556rem; /* 314 */
          height: .722222rem; /* 104 */
          line-height: .722222rem; /* 104 */
          text-align: center;
          border-radius: .347222rem; /* 50 */
          font-family: PingFangSC-Regular;
          background-color: #ffe03b;
          font-size: .3125rem; /* 45 */
          color: #fff;
          position: absolute;
          top: 2.375rem; /* 342 */
          right: .277778rem; /* 40 */
        }
        .isGet{
          background-color: #c9c9c9;
          font-size: .277778rem; /* 40 */
        }
        .des{
          text-align: center;
          font-family: PingFangSC-Regular;
          margin-top: .381944rem; /* 55 */
          font-size: .277778rem; /* 40 */
	        line-height: .486111rem; /* 70 */
          color: #333;
          a{
            color: #fa9b7a;
          }
        }
        .submit{
          display: block;
          margin: .263889rem auto .493056rem; /* 38 71 */
          background: #ffe03b;
          text-align: center;
          width: 4.625rem; /* 666 */
          height: .784722rem; /* 113 */
          border-radius: .347222rem; /* 50 */
          font-family: PingFangSC-Semibold;
          font-size: .416667rem; /* 60 */
          color: #fff;
        }
        .gray{
          background-color: #c9c9c9;
        }
      }
    }
    .success{
      > div{
        background-color: #fff;
        p{
          line-height: .520833rem; /* 75 */
          margin-top: .486111rem; /* 70 */
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: .3125rem; /* 45 */
          color: #333;
        }
        a{
          display: block;
          margin: .555556rem auto .625rem; /* 80 90 */
          background-color: #ffe03b;
          text-align: center;
          width: 4.625rem; /* 666 */
          height: .784722rem; /* 113 */
          line-height: .784722rem; /* 113 */
          border-radius: .347222rem; /* 50 */
          font-family: PingFangSC-Semibold;
          font-size: .416667rem; /* 60 */
          color: #fff;
        }
      }
    }
    .prompt{
      > div{
        width: 5.513889rem; /* 794 */
        border-radius: .347222rem; /* 50 */
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        background-color: #fff;
        div{
          padding: 0.451389rem 0; /* 65px */
          line-height: 0.395833rem; /* 57px */
          color: #666;
          font-size: 0.319444rem; /* 46px */
          text-align: center;
          border-bottom: 1px solid #efefef;
        }
        a{
          display: block;
          text-align: center;
          font-size: 0.319444rem; /* 46px */
          height: 0.902778rem; /* 130px */
          line-height: 0.902778rem; /* 130px */
          color: #666;
        }
      }
    }
  }
}
</style>
