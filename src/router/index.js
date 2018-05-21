import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Admin from '@/components/Admin'
import Home from '@/components/admin/Home'
import UserManager from '@/components/admin/UserManager/User.vue'
import RoleManager from '@/components/admin/RoleManager/Role.vue'
import YZK from '@/components/admin/JXC/YZK/Yzk.vue'
import ColorNoList from '@/components/admin/JXC/ColorNO/ColorList.vue'
import Gylc from '@/components/admin/JXC/GYLC/List.vue'
import Gylog from '@/components/admin/Jxc/GYLC/GYLCLog.vue'
import TestData from '@/components/admin/Jxc/TestData/TestData_List.vue'
<<<<<<< HEAD
import PrintDetail from '@/components/admin/JXC/YZK/YzkPrintDetail.vue'
=======
import System from '@/components/admin/System/System.vue'
>>>>>>> 2a792e32b55da5adbd485dc4e138a578d4d5f974

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    // {
    //   path:'/PrintDetail',
    //   name: 'PrintDetail',
    //   component:PrintDetail
    // },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: '/',
          component: Home
        },
        {
          path: 'User',
          component: UserManager
        },
        {
          path: 'Role',
          component: RoleManager
        },
        {
          path: 'Yzk',
          component: YZK
        },
        {
          path: 'ColorNo',
          component: ColorNoList
        },
        {
          path:'Gylc',
          component:Gylc
        },{
          path:'Gylog',
          component:Gylog
        },{
          path:'TestData',
          component:TestData
        },{
          path:'System',
          component:System
        }
      ]
    }
  ]
})
