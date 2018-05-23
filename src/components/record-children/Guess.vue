<template>
  <div class="Guess">
    <p>每个交易日15:30公布竞猜结果</p>
    <div v-if="!myRecord.length" class="no">
      <div><img src="../../assets/pig.png" alt=""></div>
      <div>
        呀！~小主<br>
        您还没竞猜呐~
      </div>
      <a @click="goBack" href="javascript:void(0)">试试手气</a>
    </div>
    <ol v-if="myRecord.length" class="have">
      <li v-for="(value, index) in myRecord" :key="index">
        <h4><strong>{{changeTimeType1(value.targetTime)}}</strong>涨幅最高板块：{{getOutcome(value.outcome)}}</h4>
        <ul class="clearfix">
          <li>
            <div>竞猜时间</div>
            <p>{{changeTimeType2(value.createTime)}}</p>
          </li>
          <li>
            <div>竞猜板块</div>
            <p>{{getOutcome(value.type)}}</p>
          </li>
          <li>
            <div>竞猜结果</div>
            <!-- <p>{{getResult(value.result, changeTimeType1(value.targetTime))}}</p> -->
            <p>{{getResult(value.result)}}</p>
          </li>
        </ul>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'Guess',
  props: ['myRecord'], // 接收父组件的值
  methods: {
    /**
     * 获取涨幅结果
     */
    getOutcome: function (type) {
      const arr = ['待公布', '上证指数', '深证成指', '创业板指数', '中小板指数']
      if (type) return arr[type]
      return arr[0]
    },
    /**
     * 获取竞猜结果
     */
    getResult: function (type, time) {
      // const arr = ['待公布', '+1元', '未中奖', '+2元']
      // if (type === 1 && time === '03月14日') return arr[3]
      const arr = ['待公布', '+1元', '未中奖']
      return arr[type]
    },
    /**
     * 将时间戳改为时间格式
     * @param  {[type]} time [description]
     * @return {[type]}      [description]
     */
    changeTimeType1: function (time) {
      // 简单的一句代码
      var date = new Date(time) // 获取一个时间对象  注意：如果是uinx时间戳记得乘于1000。比如php函数time()获得的时间戳就要乘于1000
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日'
      return (M + D)
    },
    /**
     * 将时间戳改为时间格式
     * @param  {[type]} time [description]
     * @return {[type]}      [description]
     */
    changeTimeType2: function (time) {
      var date = new Date(time) // 获取一个时间对象  注意：如果是uinx时间戳记得乘于1000。比如php函数time()获得的时间戳就要乘于1000
      var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':'
      var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
      return (h + m + s)
    },
    /**
     * 点击 试试手气
     */
    goBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Guess{
  height: 100%;
  width: 100%;
  > p:first-of-type{
    font-family: PingFangSC-Regular;
    font-size: .277778rem; /* 40 */
    color: #9f9f9f;
    margin: .4375rem 0 .513889rem; /* 63 74 */
    text-align: center;
  }
  .no{
    div{
      &:first-of-type{
        width: 1.541667rem; /* 222 */
        height: 1.659722rem; /* 239 */
        margin: 0 auto;
      }
      &:last-of-type{
        text-align: center;
        font-family: PingFangSC-Medium;
        font-size: .347222rem; /* 50 */
        color: #333333;
        line-height: .416667rem; /* 60 */
      }
    }
    a{
      display: block;
      width: 5.243056rem; /* 755 */
      height: 1.048611rem; /* 151 */
      line-height: 1.048611rem; /* 151 */
      text-align: center;
      margin: .472222rem auto .9375rem; /* 68 135 */
      background-color: #ffe03b;
      border-radius: .520833rem; /* 75 */
      font-family: PingFangSC-Semibold;
      font-size: .416667rem; /* 60 */
      color: #fff8f4;
    }
  }
  .have{
    width: 6.076389rem; /* 875 */
    margin: 0 auto;
    padding-bottom: .416667rem; /* 60 */
    > li{
      border-radius: .347222rem;
      border-style: solid;
      border-width: .034722rem; /* 5 */
      /* border-image-source: -webkit-linear-gradient(125deg, #00c9fb 0%, #35dcfd 0%, #69efff 0%, #32c9fb 45%, #4ab8fc 81%, #62a7fd 100%);
      border-image-source: -o-linear-gradient(125deg, #00c9fb 0%, #35dcfd 0%, #69efff 0%, #32c9fb 45%, #4ab8fc 81%, #62a7fd 100%);
      border-image-source: -moz-linear-gradient(125deg, #00c9fb 0%, #35dcfd 0%, #69efff 0%, #32c9fb 45%, #4ab8fc 81%, #62a7fd 100%);
      border-image-source: linear-gradient(125deg, #00c9fb 0%, #35dcfd 0%, #69efff 0%, #32c9fb 45%, #4ab8fc 81%, #62a7fd 100%); */
      border-image-slice: 1;
      border-color: #55C5FE;
      overflow: hidden;
      margin-bottom: .215278rem; /* 31 */
      h4{
        height: .868056rem; /* 125 */
        border-bottom: .048611rem dashed #eee;
        line-height: 1.041667rem;
        padding-left: .305556rem; /* 44 */
        color: #00a0e5;
        font-family: PingFangSC-Regular;
        font-size: .277778rem; /* 40 */
        strong{
          font-family: PingFangSC-Medium;
          font-size: .333333rem; /* 48 */
        }
      }
      ul{
        > li{
          float: left;
          margin-left: .729167rem; /* 105 */
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: .3125rem; /* 45 */
          color: #bfbfbf;
          &:first-child{
            margin-left: .3125rem; /* 45 */
          }
          div{
            padding-top: .166667rem; /* 24 */
            line-height: .555556rem; /* 80 */
          }
          p{
            line-height: .555556rem; /* 80 */
            color: #333;
          }
          &:last-child p{
            color: #fa9b7a;
          }
        }
      }
    }
  }
}
</style>
