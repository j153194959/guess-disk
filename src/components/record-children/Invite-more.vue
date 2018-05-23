<template>
  <div class="Invite-more">
    <Invite :invite="invite" :openCommonMask="openCommonMask"></Invite>
    <div v-if="invite.allMyGuest.length" class="choice">
      <p><span>邀请成功的好友</span></p>
      <ol>
        <li v-for="(value, index) in invite.allMyGuest" :key="index">
          <div>{{index + 1}}.</div>
          <div><img :src=value.img alt=""></div>
          <div class="one-txt-cut">{{value.nickname}}</div>
        </li>
        <!-- <li>
          <div>1.</div>
          <div></div>
          <div>好友昵称</div>
        </li>
        <li>
          <div>1.</div>
          <div></div>
          <div>好友昵称</div>
        </li> -->
      </ol>
    </div>
  </div>
</template>

<script>
import Invite from '../common/Invite'
export default {
  name: 'Invite-more',
  data () {
    return {
      msg: '',
      mask: { // 弹窗控制
        verification: true // 手机验证
      }
    }
  },
  props: ['invite', 'openCommonMask'], // 接收父组件的值
  components: {
    Invite
  },
  methods: {
    /**
     * 点击 我的战绩
     */
    toMyAchievement: function () {
      this.$router.push({ name: 'default_r' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Invite-more{
  height: 100%;
  width: 100%;
  .choice{
    > p{
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: .333333rem; /* 48 */
      color: #333;
      span{
        display: inline-block;
        position: relative;
        &::before{
          content: "";
          position: absolute;
          top: 50%;
          height: 1px;
          background-color: #19ccff;
          width: 1.076389rem; /* 155 */
          left: -1.111111rem; /* 160 */
        }
        &::after{
          content: "";
          position: absolute;
          top: 50%;
          height: 1px;
          background-color: #19ccff;
          width: 1.076389rem; /* 155 */
          right: -1.111111rem; /* 160 */
        }
      }
    }
    ol{
      margin: .194444rem 0 .527778rem; /* 28 76 */
      li{
        margin-top: .208333rem;
        /* text-align: center; */
        padding-left: 2.083333rem;
        div{
          display: inline-block;
          font-family: PingFangSC-Regular;
          font-size: .277778rem; /* 40 */
          color: #333;
          &:nth-child(2){
            height: .694444rem; /* 100 */
            width: .694444rem; /* 100 */
            background-color: #bfbfbf;
            border-radius: 50%;
            margin: 0 .208333rem; /* 30 */
            vertical-align: middle;
            overflow: hidden;
          }
          &:nth-child(3){
            /* max-width: .694444rem; */ /* 100 */
            max-width: 2.083333rem;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>
