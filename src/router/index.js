import Vue from 'vue'
import Router from 'vue-router'
// 路由懒加载，根据不同的路由对应的组件分割成不同的代码块,当路由被访问时才加载对应的组件
const HelloWorld = () => import('@/components/HelloWorld')
const Home = () => import('@/components/Home/Home')
const Member = () => import('@/components/Member/Member')
const Search = () => import('@/components/Search/Search')
const Shopcar = () => import('@/components/Shopcar/Shopcar')
const NewList = () => import('@/components/NewList/NewList')
const NewsDetail = () => import('@/components/NewsDetail/NewsDetail')
const PhotoList = () => import('@/components/PhotoList/PhotoList')
const PhotoDetail = () => import('@/components/PhotoList/PhotoDetail')
const GoodsList = () => import('@/components/GoodsList/GoodsList')
const GoodsDetail = () => import('@/components/GoodsDetail/GoodsDetail')
const GoodsComment = () => import('@/components/GoodsComment/GoodsComment')
Vue.use(Router)   //注册路由组件(router-link/router-view等)并挂载相应属性

export default new Router({
  routes: [
    {
      path: '/',
     redirect: {name: 'home'}  //进行重定向
    },
    {
    	path: '/home',
    	name: 'home',
    	component: Home
    },
    {
    	path: '/member',
    	name: 'member',
    	component: Member
    },
    {
    	path: '/shopcar',
    	name: 'shopcar',
    	component: Shopcar
    },
    {
    	path: '/search',
    	name: 'search',
    	component: Search
    },
    {
    	path: '/news/list',
    	name: 'news.list',
    	component: NewList
    }, 
    {
    	path: '/news/detail',
    	name: 'news.detail',
    	component: NewsDetail
    },
    {
    	path: 'photo/list/:categoryId',
    	name: 'photo.list',
    	component: PhotoList
    },
    {
    	path: 'photo/detail',
    	name: 'photo.detail',
    	component: PhotoDetail
    },
    {
    	path: 'good/list',
    	name: 'goods.list',
    	component: GoodsList
    },
    {
    	path: 'good/detail',
    	name: 'goods.detail',
    	component: GoodsDetail
    },
    {
        path: 'good/info',
        name: 'goods.info',
        component: NewsDetail
    },
    {
        path: 'good/comment',
        name: 'goods.comment',
        component: GoodsComment
    }
  ]
})
