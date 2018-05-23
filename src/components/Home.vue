<template>
  <div class="Home">
    <header>
      <a @click="openMask(0)" href="javascript:void(0)">活动规则</a>
    </header>
    <main>
      <div class="box guess">
        <h3><i></i>猜猜{{mainData.date}}哪个指数涨幅最大<i></i></h3>
        <p>每个交易日15:30公布竞猜结果</p>
        <ul class="clearfix">
          <!-- class="current"为选中状态 -->
          <li @click="select(index)" :class="{current: choose.isCurrent[index]}" v-for="(value, index) in mainData.list" :key="index">
            <div>{{value.name}}</div>
            <div :class="[value.rise > 0 ? 'up' : 'down']"><i></i> {{(Math.floor(value.index) / 100).toFixed(2)}}</div>
            <div> {{value.rise}}%</div>
          </li>
        </ul>
        <a :class="{disabled: !choose.selectIndex || mainData.status !== 1 || mainData.isSubmit}" @click="quizNow" href="javascript:void(0)">四选一 立即竞猜</a>
        <p>今日竞猜奖励金额<span>1元</span></p>
      </div>
      <div class="box invite">
        <h3><i></i>邀请好友助力收更多红包<i></i></h3>
        <Invite :invite="invite" :isHome=1 :openCommonMask="openCommonMask"></Invite>
        <div v-if="mainData.myGuest.length > 0" class="choice">
          <p><span>邀请成功的好友</span></p>
          <ol>
            <li v-for="(value, index) in mainData.myGuest" :key="index"><img :src=value.img alt=""></li>
          </ol>
          <strong @click="clickMore">更多</strong>
        </div>
      </div>
      <div class="box leaderboards">
        <h3>
          <i></i><i></i>
          <div>邀请好友TOP3排行榜</div>
          <div>可获得iPhoneX</div>
          <em></em>
        </h3>
        <ul>
          <li v-for="(value, index) in mainData.topThree" :key="index" class="clearfix">
            <div>{{index + 1}}.</div>
            <div><img :src=value.img alt=""></div>
            <div class="one-txt-cut">{{value.nickname}}</div>
            <div>{{value.amount}}位好友</div>
          </li>
        </ul>
        <div>榜单按邀请好友达成数量的时间先后排序</div>
      </div>
    </main>
    <footer>
      <!-- <a class="tree" v-show="parseInt(mainData.date.substr(3, 2)) <= 14" @click="openMask(1)" href="javascript:void(0)">植树节</a> -->
      <a class="guess" @click="toMyAchievement" href="javascript:void(0)">我的战绩</a>
    </footer>
    <div class="pop-ups">
      <!-- 活动规则 -->
      <transition name="fade">
        <div v-if="mask.rule" class="supernatant rule">
          <div>
            <h3>活动规则</h3>
            <div @click="closeMask(0)" class="close"><img src="../assets/close.png" alt=""></div>
            <div class="txt">
              <p><span>a.</span> 活动对象：面向所有兴业证券官微的关注用户</p>
              <p><span>b.</span> 竞猜时间：T-1交易日15:00-T交易日13:00（节假日不参与竞猜），竞猜T日的上证指数、深证成指、创业板指和中小板指中涨幅最大的盘指，举例：11月28日15:00-11月29日13:00期间竞猜11月29日盘指；</p>
              <p><span>c.</span> 用户每个交易日只可在4个大盘指数中竞猜1个认为涨幅最大的盘指，如当日所有盘指均下跌，则竞猜跌幅最小的盘指即绝对值最小的盘指为赢家。竞猜成功可获得1元话费奖励；</p>
              <p><span>d.</span> 老用户可邀请新用户关注兴业证券官微，成功邀请且新用户至少参与1次猜盘指活动即可获得对应阶梯式奖励。新用户在活动期间仅能接受首位老用户邀请，且新用户必须是首次关注，重复关注无效。若活动期间取消关注，老用户邀请奖励无效；</p>
              <p><span>e.</span> 成功邀请用户数最多的3名用户可分别获得iPhone X(64G)一部；如果最终出现邀请用户数相同，以达成时间先后顺序排名；</p>
              <p><span>f.</span> 奖励发放：猜盘指奖励与成功邀请的奖励可累计可叠加，用户需主动点击“兑奖”按钮。所有奖励于活动结束后的14个工作日之内，通过第三方供应商充值到中奖用户预留的手机号，iPhone X获奖者将由工作人员电话联络派奖；</p>
              <p><span>g.</span> 用户若存在任何作弊行为,兴业证券将取消其参与资格,已经发放奖品的有权收回奖品；</p>
              <p><span>h.</span> 请确保网络和系统通畅,若因网络原因或系统原因,造成游戏中断、奖励未到账的情况，兴业证券将不再补发奖励；</p>
              <p><span>i.</span> 用户参与活动，即视为同意以上活动规则和免责声明；</p>
              <p><span>j.</span> 本次活动最终解释权归兴业证券股份有限公司所有，如有任何疑问，请致电兴业证券官方热线95562；</p>
              <p><span>k.</span> 本次活动与Apple Inc无关。</p>
            </div>
          </div>
        </div>
      </transition>
      <!-- 植树节 -->
      <transition name="fade">
        <div v-if="mask.plantingTrees" class="supernatant plantingTrees">
          <div>
            <h3>植树节</h3>
            <div @click="closeMask(1)" class="close"><img src="../assets/close.png" alt=""></div>
            <div class="container">
              <h4>
                3月14日国际植树节<br>
                当日竞猜成功的小主奖励翻倍<br>
                <span>红包+2元</span>
                <i></i><i></i>
              </h4>
              <div>
                <span>另</span>外，按照今天深圳收盘指数，乘以涨跌幅绝对值最大数，捐献给兴证慈善基金总会，用于环保植树事业。
              </div>
              <p>
                举例：深圳收盘指数10564.3点，上证涨幅绝对值最大1.00%，即10564.3*1.00=10564.3元
              </p>
              <a @click="closeMask(1)" href="javascript:void(0)">马上参加</a>
            </div>
          </div>
        </div>
      </transition>
      <!-- 提示语 -->
      <transition name="fade">
        <div v-if="mask.prompt.isShow" class="supernatant prompt">
          <div>
            <div>{{mask.prompt.msg}}<br>{{mask.prompt.msg2}}</div>
            <a @click="mask.prompt.isShow = false" href="javascript:void(0);">好的</a>
          </div>
        </div>
      </transition>
    </div>
    <!-- 加载 -->
    <Loading v-if="mask.isLoading"></Loading>
  </div>
</template>

<script>
import Invite from './common/Invite'
import Loading from './common/Loading'

export default {
  name: 'Home',
  data () {
    return {
      mask: { // 弹窗控制
        rule: false, // 活动规则
        plantingTrees: false, // 植树节
        prompt: { // 提示
          msg: '', // 提示语
          msg2: '',
          isShow: false
        },
        isLoading: false // 加载
      },
      invite: { // 邀请组件值
        allMyGuest: [ // 我邀请的用户列表（所有）
          // {
          //   nickname: '张顺', // 用户昵称
          //   img: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ6PN2VeESKF8wT50tcje1PQn6kVYGvzvohA4k7rsmsiaNxDyOib6vJcD0jeHicyAFMp9Kn8yvw9cwDA/132' // 用户头像地址
          // }
        ],
        isSubscribe: 0, // 是否关注
        openId: '',
        isTo: 1
      },
      mainData: { // 主页数据
        date: '03/06', // 当前日期
        list: [ // 板块列表数据 0--上证 1--深证 2--创业 3--中小版
          {
            name: '上证指数',
            index: '327375', // 指数
            rise: '0.38' // 涨幅
          },
          {
            name: '深证成指',
            index: '327375', // 指数
            rise: '0.38' // 涨幅
          },
          {
            name: '创业板指数',
            index: '327375', // 指数
            rise: '0.38' // 涨幅
          },
          {
            name: '中小板指数',
            index: '327375', // 指数
            rise: '0.38' // 涨幅
          }
        ],
        myGuestCount: 1, // 我邀请的用户数量
        status: 1, // 0-不能猜;1-可以猜;2-活动已经结束
        isSubmit: 0, // 是否竞猜过 0-未猜；1-已猜
        myGuest: [ // 我邀请的用户列表（最多6条）
          // {
          //   img: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ6PN2VeESKF8wT50tcje1PQn6kVYGvzvohA4k7rsmsiaNxDyOib6vJcD0jeHicyAFMp9Kn8yvw9cwDA/132' // 用户头像地址
          // }
        ],
        topThree: [ // 邀请最多的三个人
          /* {
            amount: 1, // 邀请人数
            nickname: 'Gaara', // 用户昵称
            img: 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqiaqf5FicX13m1m0AzFFRe06KT7ZBScicbfMZic9XsotCFP0BF0sxiaZ2ODMAibiccOzGN2e6K0HavC9UbQ/132' // 用户头像地址
          } */
        ]
      },
      choose: { // 选择模块
        selectIndex: 0, // 选中的板块 0--没选  1--上证  2--深圳  3--创业版  4--中小版
        isCurrent: [0, 0, 0, 0] // 是否选中 对应4个板块
      }
    }
  },
  props: ['openCommonMask', 'userInfo'], // 接收父组件的值
  components: { // 公共组件
    Invite,
    Loading
  },
  methods: {
    /**
     * 打开弹窗
     */
    openMask: function (index) {
      var arr = ['rule', 'plantingTrees']
      this.mask[arr[index]] = true
    },
    /**
     * 关闭弹窗
     */
    closeMask: function (index) {
      var arr = ['rule', 'plantingTrees']
      this.mask[arr[index]] = false
    },
    /**
     * 打开提示窗
     */
    openPrompt: function (msg, msg2) {
      this.mask.prompt.msg = msg
      this.mask.prompt.msg2 = msg2 || ''
      this.mask.prompt.isShow = true
    },
    /**
     * 点击 我的战绩
     */
    toMyAchievement: function () {
      // 官微_猜盘指_我的竞猜 埋点
      window.TDAPP.onEvent('Wechat_GCI_Quiz_now', '', {openId: this.userInfo.openId})
      if (!this.userInfo.openId) {
        this.openCommonMask(0)
        return
      }
      this.$router.push({ name: 'default_r' })
    },
    /**
     * 点击更多
     */
    clickMore: function () {
      this.$router.push({ name: 'Invite' })
    },
    /**
     * 获取主页数据
     */
    getData: function () {
      this.mask.isLoading = true
      this.$ajax({
        url: '/index',
        params: {
          openid: this.userInfo.openId
        }
      }).then((res) => {
        const data = res.data.respbody
        console.log(data)
        this.mainData.date = data.date
        this.mainData.list[0].index = data.sh
        this.mainData.list[1].index = data.sz
        this.mainData.list[2].index = data.cyb
        this.mainData.list[3].index = data.zxb
        this.mainData.list[0].rise = data.increSh
        this.mainData.list[1].rise = data.increSz
        this.mainData.list[2].rise = data.increCyb
        this.mainData.list[3].rise = data.increZxb
        this.invite.isSubscribe = data.isSubscribe
        this.mainData.myGuestCount = data.myGuestCount
        this.mainData.isSubmit = data.isSubmit
        this.mainData.status = data.status
        for (let i = 0; i < data.topThree.length; i++) {
          const el = data.topThree[i]
          var obj = {}
          obj.amount = el.amount
          obj.nickname = el.nickname || '--'
          obj.img = el.img
          this.mainData.topThree.push(obj)
        }
        for (let i = 0; i < data.myGuest.length; i++) {
          const el = data.myGuest[i]
          var myGuest = {}
          myGuest.img = el.img
          myGuest.nickname = el.nickname
          if (i <= 5) {
            this.mainData.myGuest.push(myGuest)
          }
          this.invite.allMyGuest.push(myGuest)
        }
        this.invite.openId = this.userInfo.openId
        this.$emit('transferUser', this.invite)
        // if (parseInt(this.mainData.date.substr(3, 2)) <= 14) {
        //   this.openMask(1)
        // }
        this.mask.isLoading = false
      }).catch((err) => {
        console.log(err)
        this.openPrompt('服务器繁忙，请稍后重试')
        this.mask.isLoading = false
      })
    },
    /**
     * 选择板块
     */
    select: function (index) {
      this.choose.isCurrent.splice(0, 4, 0, 0, 0, 0)
      this.choose.isCurrent.splice(index, 1, 1)
      this.choose.selectIndex = index + 1
    },
    /**
     * 点击 立即竞猜
     */
    quizNow: function () {
      // 官微_猜盘指_立即竞猜按钮 埋点
      window.TDAPP.onEvent('Wechat_GCI_Myscore', '', {openId: this.userInfo.openId})
      if (!this.choose.selectIndex || this.mainData.status !== 1) return
      // console.log('竞猜')
      if (this.userInfo.ownerU) {
        this.openCommonMask(0)
        return
      }
      // if (!this.invite.isSubscribe) {
      //   this.openCommonMask(0)
      //   return
      // }
      this.mask.isLoading = true
      this.$ajax({
        url: '/submit',
        params: {
          openid: this.userInfo.openId,
          type: this.choose.selectIndex,
          owner: this.userInfo.ownerL
        }
      }).then((res) => {
        const data = res.data.resphead.respcode
        // console.log(data)
        if (data === '0000') {
          this.openPrompt('竞猜成功')
          this.mainData.isSubmit = 1
        } else if (data === '1002') {
          this.openPrompt('今日已经竞猜过')
        } else if (data === '1003') {
          this.openPrompt('参数错误')
        } else if (data === '1004') {
          this.openCommonMask(0)
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
  mounted: function () {
    this.getData()
    this.openPrompt('活动结束咯！', '请在4月1日23：59分前提现，红包将以话费形式在14个工作日内充值完毕')
    // alert(29)
    // this.$emit('transferUser', this.invite)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Home{
  overflow-y: scroll;
  header{
    height: 4.479167rem; /* 645 */
    background: url("../assets/banner.png") no-repeat;
    background-size: contain;
    margin-bottom: -.451389rem; /* 65 */
    a{
      display: inline-block;
      color: #fff;
      font-family: PingFangSC-Regular;
      font-size: .277778rem; /* 40 */
      padding: .222222rem .472222rem; /* 32 68 */
    }
  }
  main{
    width: 6.916667rem; /* 995 */
    margin: 0 auto;
    .box{
      background-color: #fff;
      border-radius: .347222rem; /* 50 */
      overflow: hidden;
      h3{
        text-align: center;
        color: #fff;
        font-size: .333333rem; /* 48 */
        font-family: PingFangSC-Medium;
        height: 1.006944rem; /* 145 */
        line-height: 1.006944rem; /* 145 */
        position: relative;
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
      > a{
        display: block;
        margin: 0 auto;
        text-align: center;
        width: 5.243056rem; /* 775 */
        height: 1.048611rem; /* 151 */
        line-height: 1.048611rem; /* 151 */
        background: -webkit-linear-gradient(#ffe03b, #ffe03b), -webkit-linear-gradient(#ffe03b, #ffe03b);
        background: -o-linear-gradient(#ffe03b, #ffe03b), -o-linear-gradient(#ffe03b, #ffe03b);
        background: -moz-linear-gradient(#ffe03b, #ffe03b), -moz-linear-gradient(#ffe03b, #ffe03b);
        background: linear-gradient(#ffe03b, #ffe03b), linear-gradient(#ffe03b, #ffe03b);
        border-radius: .520833rem; /* 75 */
        font-family: PingFangSC-Semibold;
        font-size: .416667rem; /* 60 */
        color: #fff8f4;
      }
      > a.disabled{
        background: #BEBEBE;
      }
    }
    .guess{
      p{
        font-size: .277778rem; /* 40 */
        font-family: PingFangSC-Regular;
        color: #9f9f9f;
        text-align: center;
        &:first-of-type{
          margin-top: .173611rem; /* 25 */
          line-height: .430556rem; /* 62 */
        }
        &:last-of-type{
          margin: .333333rem 0 .527778rem 0; /* 48 76 */
          span{
            color: #ff0000;
          }
        }
      }
      ul{
        padding-left: .069444rem; /* 10 */
        li{
          float: left;
          margin: .333333rem 0 0 .340278rem; /* 48 49 */
          width: 2.854167rem; /* 411 */
          height: 1.680556rem; /* 242 */
          background-image: url("../assets/rectangle1.png");
          background-repeat: no-repeat;
          background-size: contain;
          padding-top: .277778rem; /* 40 */
          box-sizing: border-box;
          div{
            text-align: center;
            font-family: PingFangSC-Regular;
            font-size: .3125rem; /* 45 */
            line-height: .416667rem; /* 60 */
            &:nth-child(1){
	            color: #535353;
            }
            &:nth-child(2) i{
              display: inline-block;
              width: .125rem; /* 18 */
              height: .097222rem; /* 14 */
              vertical-align: middle;
              background-size: contain;
            }
            &:nth-child(3){
              color: #333;
              font-size: .25rem; /* 36 */
            }
          }
          .up{
            color: #ff0000;
            i{
              background: url("../assets/up.png") no-repeat;
            }
          }
          .down{
            color: #00ab42;
            i{
              background: url("../assets/down.png") no-repeat;
            }
          }
        }
        li.current{
          background-image: url("../assets/current.png");
        }
      }
      a{
        margin-top: .402778rem; /* 58 */
      }
    }
    .invite{
      margin-top: .152778rem; /* 22 */
      > .choice{
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
        > ol{
          text-align: center;
          margin-top: .381944rem; /* 55 */
          li{
            display: inline-block;
            width: .888889rem; /* 128 */
            height: .888889rem; /* 128 */
            background-color: #333;
            border-radius: 50%;
            margin: 0 .034722rem; /* 5 */
            overflow: hidden;
          }
        }
        > strong{
          display: block;
          padding: .4375rem 0 .548611rem; /* 63 79 */
          font-family: PingFangSC-Regular;
          font-size: .277778rem; /* 40 */
          color: #fa9b7a;
          text-align: center;
        }
      }
    }
    .leaderboards{
      margin: .173611rem 0 .444444rem; /* 25 64 */
      h3{
        position: relative;
        div{
          &:first-of-type{
            font-size: .333333rem; /* 48 */
            line-height: .75rem; /* 108 */
          }
          &:last-of-type{
            font-size: .25rem; /* 36 */
            line-height: 0;
          }
        }
        em{
          position: absolute;
          width: .736111rem; /* 106 */
          height: .465278rem; /* 67 */
          background-image: url("../assets/phone.png");
          background-repeat: no-repeat;
          background-size: contain;
          bottom: 0;
          right: 1.638889rem; /* 236 */
        }
      }
      ul{
        padding-left: .430556rem; /* 62 */
        font-family: PingFangSC-Regular;
        font-size: .277778rem; /* 40 */
        color: #333;
        li{
          margin: .138889rem 0; /* 20 */
          line-height: .694444rem; /* 100 */
          div{
            float: left;
            &:nth-child(1){
              width: .347222rem; /* 50 */
            }
            &:nth-child(2){
              width: .694444rem; /* 100 */
              height: .694444rem; /* 100 */
              background-color: #bfbfbf;
              overflow: hidden;
              border-radius: 50%;
            }
            &:nth-child(3){
              width: 3.472222rem; /* 500 */
              margin-left: .208333rem; /* 30 */
            }
          }
        }
      }
      > div{
        text-align: center;
        margin: .319444rem 0 .340278rem; /* 46 49 */
        font-family: PingFangSC-Regular;
        font-size: .277778rem; /* 40 */
        color: #fa9b7a;
      }
    }
  }
  footer{
    a{
      width: 1.534722rem; /* 221 */
      height: 1.534722rem; /* 221 */
      line-height: 1.534722rem; /* 221 */
      text-align: center;
      border-radius: 50%;
      font-family: PingFangSC-Regular;
      font-size: .347222rem; /* 50 */
      color: #fff;
      position: fixed;
      right: 0;
    }
    .guess{
      background-image: -webkit-linear-gradient(-28deg, #ee335b 0%, #fff08a 100%);
      background-image: -o-linear-gradient(-28deg, #ee335b 0%, #fff08a 100%);
      background-image: -moz-linear-gradient(-28deg, #ee335b 0%, #fff08a 100%);
      background-image: linear-gradient(-28deg, #ee335b 0%, #fff08a 100%);
      /* top: 11.354167rem; */ /* 1635 */
      bottom: .694444rem;
    }
    .tree{
      background-image: -webkit-linear-gradient(-28deg, #2857d0 0%, #65f6d6 100%);
      background-image: -o-linear-gradient(-28deg, #2857d0 0%, #65f6d6 100%);
      background-image: -moz-linear-gradient(-28deg, #2857d0 0%, #65f6d6 100%);
      background-image: linear-gradient(-28deg, #2857d0 0%, #65f6d6 100%);
      top: 9.625rem; /* 1386 */
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
        }
      }
    }
    .plantingTrees{
      > div{
        background-color: #fff;
        .container{
          width: 5.277778rem; /* 760 */
          margin: 0 auto;
          h4{
            margin-top: .298611rem; /* 43 */
            line-height: .569444rem; /* 82 */
            color: #434343;
            text-align: center;
            position: relative;
            font-size: .3125rem; /* 45 */
            font-weight: bold;
            span{
              color: #F39B76;
            }
            i{
              position: absolute;
              width: .868056rem; /* 125 */
              height: 1.402778rem; /* 202 */
              background-image: url("../assets/tree.png");
              background-repeat: no-repeat;
              background-size: contain;
              bottom: -.277778rem; /* 40 */
              &:first-of-type{
                left: -.277778rem; /* 40 */
              }
              &:last-child{
                right: -.277778rem; /* 40 */
              }
            }
          }
          div{
            margin-top: .409722rem; /* 59 */
            line-height: .513889rem; /* 74 */
            font-size: .236111rem; /* 34 */
            color: #333;
            span{
              font-size: .298611rem; /* 43 */
            }
          }
          p{
            margin-top: .104167rem; /* 15 */
            line-height: .298611rem; /* 43 */
            color: #BFBFBF;
            font-size: .236111rem; /* 34 */
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
          padding: 0.451389rem; /* 65px */
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
