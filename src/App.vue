<template>
   <div>
     <mt-header title="myproject" ref="appHeader"></mt-header>
    <!-- 所有的进行填坑组件都会复用这个样式     -->
    <transition name="rv" mode="out-in" >
      <!-- 利用refs来让子组件使用父组件中的组件或者元素 -->
      <router-view class='tmpl' :apprefs="$refs" />
    </transition>
     <mt-tabbar v-model="selected" fixed ref="appTabber">
        <mt-tab-item id="home">
          <img @click="changeHash" slot="icon" src="./assets/img/home.png">
           首页
        </mt-tab-item>
        <mt-tab-item id="member">
          <img @click="changeHash" slot="icon" src="./assets/img/vip.png">
          会员
        </mt-tab-item>
        <mt-tab-item id="shopcar">
          <img @click="changeHash" slot="icon" src="./assets/img/shopcar.png">
          购物车
          <mt-badge size="small" type="error">{{ this.num }}</mt-badge>
        </mt-tab-item>
        <mt-tab-item id="search">
          <img @click="changeHash" slot="icon" src="./assets/img/search.png">
          查找
  </mt-tab-item>
</mt-tabbar>
   </div>
</template>
<script>
  import EventBus from '@/EventBus.js'
  import GoodsTool from './GoodsTool'
    export default {
      data(){
        return {
          selected: 'dsadsad',
          num: 0
        }
      },
      //例如，当点击首页时，进入到home页面，在点击相对应的九宫格，又进入到子页面下，这时候再点击首页时，此时selected的值仍然为主页的值，即没有触发watch这个监听器，进而无法跳转到home页面上
     /* watch:{
          selected(newV,oldV){
            this.$router.push({
              name: newV
            })
          }
      }*/
      // 如果下面的data参数的回调函数时function的话，里面的this就会指向eventbus这个对象，所以为了取得组件对象的this，要用箭头函数
      watch: {
        ['$route']() {
          console.log('here')
        }
      },
      created(){
        //绑定自定义的监听事件
        EventBus.$on('addNumber',(data)=>{
            this.num = data + GoodsTool.getTotalCount()
        })

        this.num = GoodsTool.getTotalCount()

        EventBus.$on('addOne',(data)=>{
          this.num++
        })
        EventBus.$on('subOne',data=>{

          this.num--
        })
      },
      methods:{
        changeHash(){
          //在VUE将数据渲染后进行编程导航，此时的selected的值就会取到相对应的值
            this.$nextTick(()=>{
              this.$router.push({
                name: this.selected
              })
            })
          }
        }
      }
    
</script>
<style type="text/css" scoped>
   .rv-enter-active,.rv-leave-active{
      transition: opacity 0.5s;
   }
   .rv-enter,.rv-leave-to{
     opacity: 0;
   }
</style>