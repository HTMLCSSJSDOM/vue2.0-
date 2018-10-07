// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/assets/css/global.css'
import MyUl from '@/components/Common/MyUl'
import MyLi from '@/components/Common/MyLi'
import Moment from 'moment'  //时间处理的库
import NavBar from '@/components/Common/NavBar'
import '@/assets/tff/iconfont.css'
import VuePreview from 'vue-preview'  
import Comment from '@/components/Common/Comment'    //评论组件
import MySwipe from '@/components/Common/MySwipe'	//轮播组件
Vue.component(Comment.name,Comment)
Vue.component(MySwipe.name,MySwipe)
//引入缩略图
Vue.use(VuePreview)  //注册全局组件，挂载相对应的属性
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = 'https://www.sinya.online/api'

//配置请求拦截器，显示loading图标
Axios.interceptors.request.use(function(config){
	//config 
	Mint.Indicator.open({
		text: '主人，请稍等...'
	})
	return config
})
//配置响应拦截器，关闭loading图标
Axios.interceptors.response.use(function(response){
	//rresponse.config  类似于上面的config
	Mint.Indicator.close()
	return response
})
Vue.use(Mint)  //建立全局组件、挂载相应的属性

Vue.config.productionTip = false

//设置时间中文显示
Moment.locale('zh-cn')
//定义moment全局日期过滤器

Vue.filter('convertTime',function(data,formatStr){
	return Moment(data).format(formatStr)
})

Vue.filter('relativeTime',function(previousTime){
	return Moment(previousTime).fromNow()
})

Vue.component('my-li',MyLi)
Vue.component('my-ul',MyUl)
Vue.component(NavBar.name,NavBar)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
