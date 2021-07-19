import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages//login'
import StuMain from '../pages/Student/StuMain'
import StuRight from "../components/StuRight";
import Stu_Myborrow from "../components/Stu_Myborrow";
import Stu_MyFavorite from "../components/Stu_MyFavorite";
import Stu_MyComment from "../components/Stu_MyComment";
import Stu_Own from "../components/Stu_Own";
import StuRightMain from "../components/StuRightMain";
import AdminMain from "../pages/Admin/AdminMain";
import AdminRightMain from "../components/AdminRightMain";
import Admin_SetBook from "../components/Admin_SetBook";
import Admin_SetUser from "../components/Admin_SetUser";
import Admin_UserBooks from "../components/Admin_UserBooks";
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      component: login,
    },
    {
      path:'/',
      redirect:"/login"
    },
    {
      path: '/AdminMain',
      component: AdminMain,
      children:[
        {
          path:'/AdminMain',
          component: AdminRightMain,
        },
        {
          path:'/AdminMain/Admin_SetBook',
          component: Admin_SetBook,
          name: 'Admin_SetBook',
        },
        {
          path:'/AdminMain/Admin_SetUser',
          component: Admin_SetUser,
          name:'Admin_SetUser'
        },
        {
          path:'/AdminMain/Admin_UserBooks',
          component: Admin_UserBooks,
          name:'Admin_UserBooks'
        },
      ]
    },
    {
      path: '/StuMain',
      component:StuMain,
        children:[
          {
            path:'/StuMain',
            component: StuRightMain,
          },
          {
            name:'StuRight',
            path:'/StuMain/StuRight',
            component: StuRight,
          },
          {
            path:'/StuMain/Stu_Myborrow',
            component: Stu_Myborrow,
          },
          {
            path:'/StuMain/Stu_MyFavorite',
            component: Stu_MyFavorite,
          },
          {
            path:'/StuMain/Stu_MyComment',
            component: Stu_MyComment,
          },
          {
            path:'/StuMain/Stu_Own',
            component: Stu_Own,
          },
        ]
    },
  ]
})
