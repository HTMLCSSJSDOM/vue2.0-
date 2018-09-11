<template>
	<div>
		<nav-bar title="商品详情" />
		<div class="swipe">
			<my-swipe url="getthumimages/87" />
		</div>
		<div>
			<h2>{{ goodsInfo.title }}</h2>
			<hr/>
			<div class="product">
				<p class='price'>
					<span>市场价：￥<span class='down'>{{ goodsInfo.market_price}}</span></span>
					<span>销售价:￥<span class='big'>{{ goodsInfo.sell_price }}</span></span>
				</p>
				<p class='number'>
					购买数量
					<span @click="substract">-</span><span>{{ num }}</span><span @click="add">+</span>
				</p>
					<button class='sub middle'>立即购买</button>
					<button class='add middle' @click="insert">加入购物车</button>
					<transition name="ball" @after-enter="afterEnter">
						<div class='ball' v-if="isShow"></div>
					</transition>
			</div>
			<div class='pro-detail'>
				<p>商品参数</p>
				<p>商品货号:{{ goodsInfo.goods_no }}</p>
				<p>库存情况:{{ goodsInfo.stock_quantity }}</p>
				<p>上架时间 :{{ goodsInfo.add_time | convertTime('YYYY--MM--DD')}}</p>
			</div>
		</div>
		<div class="product-info">
			<ul>
				<li>
					<mt-button type="primary" size="large" plain @click="showInfo">图文介绍</mt-button>
				</li>
				<li>
					<mt-button type="danger" size="large" plain @click="showComment">商品评论</mt-button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	import EventBus from '@/EventBus.js'
	import GoodsTool from '@/GoodsTool'
	export default {
		data(){
			return {
				goodsInfo: {},
				isShow: false,
				num: 0
			}
		},
		methods:{
			insert(){
				this.isShow = true
			
			},
			// 在动画结束之后
			afterEnter(){
				this.isShow = false
				//在小球消失之后，购物车的数量增加
				EventBus.$emit('addNumber',this.num)
				//存进localStorage中
				GoodsTool.add({
					id: this.$route.params.id,
					num: this.num
				})
			},
			add(){
			
				if(this.goodsInfo.stock_quantity <= this.num) return
					this.num++
			},
			substract(){
			
				if(this.num <= 0) return
					this.num--
			},
			showInfo(){
				this.$router.push({
					name: 'goods.info',
					query: {
						id: this.$route.params.id
					}
				})
			},
			showComment(){
				this.$router.push({
					name: 'goods.comment',
					query: {
						id: this.$route.params.id
					}
				})
			}
		},
		created(){

			let id = this.$route.params.id
			this.$axios.get('goods/getinfo/' + id).then(res=>{ 
				this.goodsInfo = res.data.message[0]
			}).catch(err=>console.log('图片商品详情异常!',err))
		}
	}
</script>

<style scoped>
	.ball{
		position: absolute;
		z-index: 1;
		top: 45px;
		left: 75px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: red;
	}
	/*在删除之前(v-if="false")，将透明度设为零没那么突兀*/
	.ball-leave{
		opacity: 0;
	}
	.ball-enter-active{
		animation: fly 1s linear;
	}
	@keyframes fly{
		0%{
			transform: translate3D(50px,-50px,0);
		}
		25%{
			transform: translate3D(100px,0,0);
		}
		75%{
			transform: translate3D(150px,150px,0);
		}
		100%{
			transform: translate3D(200px,300px,0);
		}
	}
	.swipe{
		border: 1px solid rgba(0,0,0,.2);
		padding: 1px;
	}
	h2{
		color: blue;
	}
	.product{
		position: relative;
		border: 1px solid rgba(0,0,0,.2);
		padding: 1px;
	}
	.pruduct .price{

	}
	.down{
		text-decoration: line-through;
	}
	.big{
		font-size: 20px;
	}
	.number > span{
		display: inline-block;
		width: 25px;
		height: 25px;
		text-align: center;
		line-height: 25px;
		border: 1px solid rgba(0,0,0,.2);
		text-align:　center;
	}
	.middle{
		width:　80px;
		height: 40px;
		line-height:　40px;
		text-align: center;
	}
	.sub{
		
		background-color: blue;
	}
	.add{
		background-color: red;
	}
	.pro-detail{
		border: 1px solid rgba(0,0,0,.2);
		padding: 1px;
	}
	.product-info{
		margin-top: 25px;
	}
	button{
		margin-left: 10px;
	}
</style>
