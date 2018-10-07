<template>
	<div :style="{ height: boxHeight }">
		<nav-bar title="商品列表" />
		 <mt-loadmore  :auto-fill="false" :bottom-method="loadBottom"  ref="loadmore" :bottom-all-loaded="isAllLoaded">
			<ul>
				<li v-for="(good,index) in goodList" :key="index">
					<router-link :to="{name: 'goods.detail',query: {id: good.id}}">
						<img :src="good.img_url" alt="">
						<p>{{ good.title }}</p>
						<div class="fixclear">
							<div>	
								<span>￥{{ good.sell_price }}</span>
								<span>￥{{ good.market_price }}</span>
							</div>
							<span class='left'>热卖中</span>
							<span class='right'>剩余{{ good.stock_quantity }}</span>
						</div>
					</router-link>
				</li>
			</ul>
			
		</mt-loadmore>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				page: 1,
				goodList: [],
				firstLoad: true,   //标记是第一次还是下拉更新的
				isAllLoaded: false,	//标记是否加载完成下拉数据
				boxHeight: 0  //用作中间盒子的高度,完美实现下拉
			}
		},
		props:["apprefs"],
		// beforeRouteUpdate(){

		// },
		
		methods:{
			loadBottom(){		
			
				this.loadGoodList(this.page)
				this.$refs.loadmore.onBottomLoaded()
			},
			loadGoodList(page){
				console.log(1)
				this.$axios.get('getgoods?pageindex=' + page).then(res=>{
						if(res.data.message.length === 0){
							this.isAllLoaded = true
							this.$toast('没有数据了')
						}
						if(this.firstLoad){
							this.goodList = res.data.message
							this.firstLoad = !this.firstLoad
						
						}else{
							this.goodList = this.goodList.concat(res.data.message)
						}
						this.page++
				}).catch(err=>console.log('商品列表获取失败!',err))
			}
						
		},
		created(){
			this.page = this.$route.query.id  || '1'
			console.log(1)
			this.loadGoodList(this.page)

		},
		mounted(){
			console.log(this.apprefs.appHeader.$el)
			let headerHeight = this.apprefs.appHeader.$el.offsetHeight,
				tabberHeight = this.apprefs.appTabber.$el.offsetHeight
				this.boxHeight = document.body.clientHeight - headerHeight - tabberHeight
		},
		watch: {
        ['$route']() {
          console.log('there')
        }
      },
      beforeRouterEnter(to,come,next){
      	next(vm => {
      		vm.loadGoodList(this.page)
      	})
      }

	}
</script>

<style scoped>
	ul{
		overflow: hidden;
		font-size: 14px;
	}
	li{
		float: left;
		width: 47%;
		padding: 5px;
	}
	p{
		height: 60px;

	}
	a{
		display: block;
	}
	a > img{
		width: 110px;
		height: 210px;
		margin-left: 46.5px;
	}
	img ~ div{
		overflow: hidden;
		background-color: gray;
	}
	.fixclear::after{
		content: '';
		display: block;
		clear: both;
	}
	.fixclear > div > span:nth-child(2){
		text-decoration: line-through;
		color: red;
	}
</style>
