<template>
  <div class="Invite">
    <ul class="clearfix">
      <li :class="[isAchieve(invite.allMyGuest.length, 1) ? 'achieve' : '']">
        <div>1元话费</div>
        <div>1个好友</div>
      </li>
      <li :class="[isAchieve(invite.allMyGuest.length, 8) ? 'achieve' : '']">
        <div>5元话费</div>
        <div>8个好友</div>
      </li>
      <li :class="[isAchieve(invite.allMyGuest.length, 18) ? 'achieve' : '']">
        <div>10元话费</div>
        <div>18个好友</div>
      </li>
      <div><i v-bind:style="{width: getWidth(invite.allMyGuest.length)}"></i></div>
    </ul>
    <div @click="openMask(0)" class="detailed">详细邀请规则</div>
    <!-- <a @click="clickInvite" href="javascript:void(0)">立即邀请</a> -->
    <a class="disabled" href="javascript:void(0)">立即邀请</a>
    <div class="pop-ups">
      <!-- 活动规则 -->
      <transition name="fade">
        <div v-if="mask.rule" class="supernatant rule">
          <div>
            <h3>邀请规则</h3>
            <div @click="closeMask(0)" class="close"><img src="../../assets/close.png" alt=""></div>
            <div class="txt">
              <p><span>1.</span>	邀请新用户关注兴业证券官微，成功邀请且新用户至少参与1次猜盘指活动即可获得对应阶梯式奖励；</p>
              <p><span>2.</span>	新用户在活动期间仅能接受首位老用户邀请，且新用户必须是首次关注，重复关注无效；</p>
              <p><span>3.</span>	若活动期间新用户取消关注则老用户邀请奖励无效；</p>
              <p><span>4.</span>	最终邀请结果以3月30日17点为准；</p>
              <p>提别提示：邀请来的好友至少参加一次游戏才能拿到奖励哦！~</p>
            </div>
          </div>
        </div>
      </transition>
      <!-- 分享提示 -->
      <transition name="fade">
        <div v-if="mask.prompt" @click="closeMask(1)" class="supernatant prompt">
          <a href="javascript:void(0)"><img src="../../assets/point-share.png" alt=""></a>
        </div>
      </transition>
    </div>
    <!-- 加载 -->
    <Loading v-if="mask.isLoading"></Loading>
  </div>
</template>

<script>
import Loading from './Loading'

export default {
  name: 'Invite',
  data () {
    return {
      mask: { // 弹窗控制
        rule: false, // 邀请规则
        prompt: false, // 分享提示
        isLoading: false // 加载
      }
    }
  },
  props: ['invite', 'openCommonMask', 'isHome'], // 接收父组件的值
  components: { // 公共组件
    Loading
  },
  methods: {
    /**
     * 打开弹窗
     */
    openMask: function (index) {
      var arr = ['rule', 'prompt']
      this.mask[arr[index]] = true
    },
    /**
     * 关闭弹窗
     */
    closeMask: function (index) {
      var arr = ['rule', 'prompt']
      this.mask[arr[index]] = false
    },
    /**
     * 点击 立即邀请
     */
    clickInvite: function () {
      // return
      if (this.isHome) {
        // 官微_猜盘指_立即邀请按钮 埋点
        window.TDAPP.onEvent('Wechat_GCI_Invite_now', '', {openId: this.invite.openId})
      } else {
        // 官微_猜盘指_立即邀请按钮2 埋点
        window.TDAPP.onEvent('Wechat_GCI_Invite2_now', '', {openId: this.invite.openId})
      }
      // console.log(this.invite.isSubscribe)
      if (!this.invite.isSubscribe) {
        this.openCommonMask(0)
      } else {
        this.openMask(1)
      }
    },
    /**
     * 判断 话费是否达标
     */
    isAchieve: function (len, target) {
      if (len >= target) return true
      return false
    },
    /**
     * 获取进度条宽度
     */
    getWidth: function (len, max) {
      var result = ''
      // if (len < max) {
      //   // return (len / max * 100).toFixed(2) + '%'
      // } else {
      //   result = '100%'
      // }
      if (len <= 0) {
        result = '0'
      } else if (len === 1) {
        result = '.951389rem'
      } else if (len > 1 && len < 8) {
        result = '1.875rem'
      } else if (len === 8) {
        result = '2.902778rem' /* 418 */
      } else if (len > 8 && len < 18) {
        result = '3.819444rem' /* 550 */
      } else if (len === 18) {
        result = '4.854167rem' /* 699 */
      } else if (len > 18 && len < 20) {
        result = '5.298611rem' /* 763 */
      } else {
        result = '100%'
      }
      return result
    },
    /**
     * 获取主页数据
     */
    getData: function () {
      // console.log('1')
      this.mask.isLoading = true
      this.$ajax({
        url: '/index',
        params: {
          openid: this.invite.openId
        }
      }).then((res) => {
        const data = res.data.respbody
        console.log(data)
        this.invite.isSubscribe = data.isSubscribe
        for (let i = 0; i < data.myGuest.length; i++) {
          const el = data.myGuest[i]
          var myGuest = {}
          myGuest.img = el.img
          myGuest.nickname = el.nickname
          this.invite.allMyGuest.push(myGuest)
        }
        this.$parent.invite.isTo = 1
        this.mask.isLoading = false
      }).catch((err) => {
        console.log(err)
        this.mask.isLoading = false
      })
    }
  },
  mounted: function () {
    // 如果再我的战绩页面刷新
    if (!this.invite.isTo) this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Invite{
  height: 100%;
  width: 100%;
  ul{
    padding: .743056rem 0 0 .215278rem; /* 107 31 */
    position: relative;
    li{
      float: left;
      width: 1.590278rem; /* 229 */
      margin-left: .395833rem; /* 57 */
      div{
        text-align: center;
        font-family: PingFangSC-Regular;
        &:first-child{
          height: .993056rem; /* 143 */
          line-height: .840278rem; /* 121 */
          font-family: PingFangSC-Regular;
          font-size: .3125rem; /* 45 */
          color: #535353;
          background-image: url("../../assets/Sharp-rectangle1.png");
          background-repeat: no-repeat;
          background-size: contain;
          position: relative;
          &::before{
            content: '';
            position: absolute;
            bottom: -.423611rem; /* 30 */
            left: 50%;
            width: .215278rem; /* 31 */
            height: .215278rem; /* 31 */
            /* transform: translateX(-50%); */
            margin-left: -.145833rem; /* 21 */
            background-color: #55bced;
            border-radius: 50%;
          }
        }
        &:last-child{
          margin-top: .534722rem; /* 77 */
          font-size: .277778rem; /* 40 */
          color: #9f9f9f;
        }
      }
    }
    li.achieve div{
      &:first-child{
        color: #fff;
        background-image: url("../../assets/Sharp-rectangle2.png");
        &::before{
          background-color: #ffe03b;
        }
      }
    }
    > div{
      width: 5.784722rem; /* 883 */
      height: .055556rem; /* 8 */
      background-color: #55bced;
      position: absolute;
      top: 2.020833rem; /* 184 + 107 */
      left: .5625rem; /* 81 */
      i{
        display: block;
        width: 30%;
        height: 100%;
        background-color: #ffe03b;
      }
    }
  }
  > .detailed{
    font-family: PingFangSC-Regular;
    font-size: .277778rem; /* 40 */
    color: #fa9b7a;
    text-align: center;
    padding-top: .736111rem; /* 106 */
    padding-bottom: .298611rem; /* 43 */
  }
  > a{
    display: block;
    text-align: center;
    width: 5.243056rem; /* 775 */
    height: 1.048611rem; /* 151 */
    line-height: 1.048611rem; /* 151 */
    background-image: -webkit-linear-gradient(#ffe03b, #ffe03b), -webkit-linear-gradient(#ffe03b, #ffe03b);
    background-image: -o-linear-gradient(#ffe03b, #ffe03b), -o-linear-gradient(#ffe03b, #ffe03b);
    background-image: -moz-linear-gradient(#ffe03b, #ffe03b), -moz-linear-gradient(#ffe03b, #ffe03b);
    background-image: linear-gradient(#ffe03b, #ffe03b), linear-gradient(#ffe03b, #ffe03b);
    border-radius: .520833rem; /* 75 */
    font-family: PingFangSC-Semibold;
    font-size: .416667rem; /* 60 */
    color: #fff8f4;
    margin: 0 auto .430556rem; /* 62 */
    &.disabled{
      background: #BEBEBE;
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
    .rule{
      > div{
        background-color: #fff;
        .txt{
          margin: .180556rem .611111rem .569444rem .395833rem; /* 26 88 82 57 */
          max-height: 6.006944rem; /* 865 */
          overflow-y: scroll;
          line-height: .4375rem; /* 63 */
          font-family: PingFangSC-Regular;
          font-size: .25rem; /* 36 */
          color: #333;
          span{
            color: #fa9b7a;
          }
          p:last-of-type{
            margin-top: .430556rem; /* 62 */
            text-align: center;
            color: #fa9b7a;
          }
        }
      }
    }
    .prompt{
      a{
        position: absolute;
        top: 0;
        right: .347222rem; /* 50 */
        width: 3.222222rem; /* 464 */
        height: 3.368056rem; /* 485 */
      }
    }
  }
}
</style>
