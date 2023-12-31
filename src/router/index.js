import { createRouter, createWebHashHistory } from 'vue-router'
import LayoutContainer from '@/views/layout/LayoutContainer.vue'
import HomeTab from '@/views/home/HomeTab.vue'
import VideoTab from '@/views/video/VideoTab.vue'
import MessageTab from '@/views/message/MessageTab.vue'
import UserTab from '@/views/user/UserTab.vue'
import SearchPage from '@/views/search/SearchPage.vue'
import ArticlePage from '@/views/article/ArticlePage.vue'
import VideoPage from '@/views/video/VideoPage.vue'
import MessagePage from '@/views/message/MessagePage.vue'
import UserLogin from '@/views/user/UserLogin.vue'
import UserSpace from '@/views/user/UserSpace.vue'
import UserProfile from '@/views/user/UserProfile.vue'
import UserList from '@/views/user/UserList.vue'
import UserFavorites from '@/views/user/UserFavorites.vue'
import UserBrowsingHistory from '@/views/user/UserBrowsingHistory.vue'
import AccountSecurity from '@/views/security/AccountSecurity.vue'
import ChangePassword from '@/views/security/ChangePassword.vue'
import { useUserStore } from '@/stores'
import { showToast } from 'vant'
import 'vant/es/toast/style'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LayoutContainer,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: HomeTab
        },
        {
          path: 'video',
          name: 'video',
          component: VideoTab
        },
        {
          path: 'message',
          name: 'message',
          component: MessageTab
        },
        {
          path: 'user',
          name: 'user',
          component: UserTab
        }
      ]
    },
    {
      path: '/home/search',
      name: 'search',
      component: SearchPage
    },
    {
      path: '/article/detail/:articleId',
      name: 'articledetail',
      component: ArticlePage,
      props: true
    },
    {
      path: '/video/detail/:videoId',
      name: 'videodetail',
      component: VideoPage,
      props: true
    },
    {
      path: '/message/detail/:authorId',
      name: 'messagedetail',
      component: MessagePage,
      props: true
    },
    {
      path: '/user/login',
      name: 'userlogin',
      component: UserLogin
    },
    {
      path: '/user/space',
      name: 'userspace',
      component: UserSpace
    },
    {
      path: '/user/profile',
      name: 'userprofile',
      component: UserProfile
    },
    {
      path: '/user/list/:type',
      name: 'userlist',
      component: UserList,
      props: true
    },
    {
      path: '/user/favorites',
      name: 'userfavorites',
      component: UserFavorites,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user/browsinghistory',
      name: 'userbrowsinghistory',
      component: UserBrowsingHistory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/security',
      name: 'security',
      component: AccountSecurity,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/security/password',
      name: 'password',
      component: ChangePassword
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/home'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 检查该路由是否需要登录
  if (to.meta.requiresAuth && !userStore.token) {
    // 如果用户未登录，显示提示并取消导航
    showToast('登录后查看更多')
    next(false)
  } else {
    // 如果用户已登录，或者该路由不需要登录，那么继续导航
    next()
  }
})

export default router
