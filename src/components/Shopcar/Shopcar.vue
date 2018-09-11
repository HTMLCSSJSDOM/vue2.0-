<template>
	<div>
		<nav-bar title="购物车" />
		<div class="pay-detail">
			<ul>
				<li v-for="(goods,index) in shopcart" :key="goods.id">
					<mt-switch v-model="goods.isSelected"></mt-switch>
					<img :src="goods.thumb_path" alt="">
					<div class="pay-calc">
						<p>{{ goods.title }}</p>
						<div class="calc">
							<span>￥{{ goods.sell_price}}</span>
							<span class='cal substract' @click="substract(goods)">-</span>
							<span class='cal'>{{ goods.num }}</span>
							<span class='cal add' @click="add(goods)">+</span>
							<a href="javascript:;" @click="del(index)">删除</a>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="show-price">
			<div class="show">
				<p>总计(不含运费)</p>
				<p>已经选择商品<span>{{ payment.quality }}</span>件,总价<span>{{ payment.price }}</span>元</p>
				<button>去结算</button>
			</div>
		</div>
	</div>
</template>

<script>
	import GoodsTools from '@/GoodsTool'
	import EventBus from '@/EventBus'
export default {
	data(){
		return {
			shopcart: [] //购物车数据
		}
	},
	//路由跳转后
	beforeRouteLeave(to,from,next){
		//可以访问组件实例
		if(confirm('亲，真的忍心离开吗')){
			let obj = {}
			this.shopcart.forEach(goods =>{
				obj[goods.id] = goods.num
			})
			GoodsTools.saveGoods(obj)
			
			next()
		}else{
			next(false)
		}
	},
	
	computed:{
		payment(){
			let price = 0,quality = 0
			this.shopcart.forEach(goods =>{
				if(goods.isSelected){
					price += goods.sell_price * goods.num
					quality += goods.num
				}
				
			})
			return {price,quality}
		}
	},
	methods:{
		add(goods){
			goods.num++
			//自定义事件
			EventBus.$emit('addOne',1)

			GoodsTools.add({
				 id: goods.id,
				 num: 1
			})
		},
		substract(goods){
			if(goods.num <= 0)return
				goods.num--

			EventBus.$emit('subOne',-1)
			//修改localStorage的值
			GoodsTools.add({
				id: goods.id,
				num: -1
			})

		},
		//通过索引来删除数据数组中的元素，渲染的时候是根据最终的数据来渲染的，数据驱动(响应式)
		del(index){
			GoodsTools.del(this.shopcart[index])
			
			this.shopcart.splice(index,1)

		}
	},
	created(){
		let goodsList = GoodsTools.getGoods()
		let ids = Object.keys(goodsList).join(',')
		//临时构建的数据
		/*this.$axios.get("http://localhost:3000/getshopcarlist?id_like=8").then(res=>{
			this.shopcart = res.data
			//如果先给data里的shopcart属性进项赋值的话，再给this.shopcart添加属性,之后的属性会失效，即无法进行双向的数据绑定 
			this.shopcart.forEach(goods=>{
				if(goodsList[goods.id]){
					goods.num = goodsList[goods.id]
				}
				//不管有没有，都需要选中，即打钩
				goods.isSelected = true
			} )
		}).catch(err=>console.log('购物车数据异常',err))*/

		// 解决方案如下两个
		
		this.$axios.get("http://localhost:3000/getshopcarlist?id_like=8").then(res=>{
				
			//现在接受的数据进行处理之后,再给data里的属性赋值,之后的shopcart里的属性都是响应式的
					res.data.forEach(goods =>{
						if(goodsList[goods.id]){
							goods.num = goodsList[goods.id]
						}
						goods.isSelected = true
					})
					this.shopcart = res.data
		}).catch(err=>console.log('购物车数据异常',err))
		
		//如果先给shopcart进行了赋值，之后又对shopcart追加了属性，要使属性变了响应式的数据的话，要手动
		//通知Vue
		//this.$set(obj,key,value)
		/*this.$axios.get("http://localhost:3000/getshopcarlist?id_like=8").then(res=>{
				this.shopcart = res.data
				
				this.shopcart.forEach(goods=>{
					if(goodsList[goods.id]){
						this.$set(goods,'num',goodsList[goods.id])
					}
					//不管有没有，都需要选中，即打钩
						this.$set(goods,'isSelect',true)
				} )
			}).catch(err=>console.log('购物车数据异常',err))*/
	}
		
}
</script>
<style scoped>
	.pay-detail{
		margin-top: 15px;
	}
	.pay-calc{
		margin-top: 10px;
	}
	.pay-calc > p{
		margin-bottom: 10px;
	}
	.calc > span{
		display: inline-block;
		padding: 5px 10px;
		border: 1px solid gray;
	}
	.calc > span:nth-child(1){
		border: none;
	}
	.calc > a{
		display: inline-block;
		margin-left: 30px;
	}
	.show-price{
		position: relative;
		margin-top: 10px;
		padding: 10px;
		background-color: rgb(205,205,205);
	}
	.show > p{
		margin-top: 10px;
		margin-left: 20px;
	}
	.show > button{
		position: absolute;
		bottom: 0;
		right: 33px;
		font-size: 16px;
		padding: 15px 10px;
		background-color: red;
	}
</style>
