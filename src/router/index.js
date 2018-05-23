import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import MyRecord from '@/components/My-record'
import Guess from '@/components/record-children/Guess'
import Invite from '@/components/record-children/Invite-more'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default', // 默认 主页
      component: Home
    },
    {
      path: '/record',
      name: 'MyRecord', // 我的战绩
      component: MyRecord,
      children: [
        {
          // 当 /record/ 匹配成功，
          // path: '', // 默认为 竞猜红包
          path: '/record', // 默认为 竞猜红包
          name: 'default_r',
          component: Guess
        },
        {
          // 当 /record/invite 匹配成功，
          path: 'invite', // 邀请红包
          name: 'Invite',
          component: Invite
        }
      ]
    }
  ]
})
