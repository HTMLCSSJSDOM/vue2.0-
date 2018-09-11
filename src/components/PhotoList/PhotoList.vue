<template>
	<div>
		<nav-bar title="图文列表" />
		<div class='photo-header'>
			<ul>
				<li v-for="(category,index) in categorys" :key="category.id">
					<!-- 这里的点击事件有个括号不代表函数执行，而是携带参数的意思 -->
					<a @click="loadURL(category.id)" href="javascript:void(0);">{{ category.title }}</a>
				</li>
				
			</ul>
		</div>
		<div class='photo-list'>
			<ul>
				<li v-for="(img,index) in imgs" :key="img.id">
					<router-link :to="{name: 'photo.detail',query:{id: img.id}}">
						<img v-lazy="img.img_url" alt="">
						<p>
							<span>{{ img.title }}</span>
							<br>
							<span>{{ img.zhaiyao }}</span>
						</p>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				imgs: [],
				categorys: []
			}
		},
		//路由参数改变，组件复用
		//1不触发？2重新渲染？
		beforeRouteUpdate(to,from,next){
			console.log(to)
			
			this.loadImgsByCategoryId(to.params.categoryId)  
			next()
		},
		methods:{
			//改变路由
			loadURL(categoryId){
				this.$router.push({
					name: 'photo.list',
					params: {
						categoryId
					}
				})
			},
			loadImgsByCategoryId(categoryId){
			
				this.$axios.get('/getimages/' +　categoryId).then(res=>{
					this.imgs = res.data.message
					if(this.imgs.length === 0){
						this.$toast({
							message: '没有图片!',
							iconClass: 'iconfont icon-jiachong'
						})
					}
				}).catch(err=>console.log('获取图片资源失败!'))
			}
		},
		//to是变化后的路由信息,from是变化前的路由信息
		/*beforRouteUpdate(to,from,next){
			loadImgsByCategoryId(to.params.categoryId)
			next()
		}*/
		//创建组件时进行请求数据
		created(){
			let categoryId = this.$route.params.categoryId			
				this.loadImgsByCategoryId(categoryId)      //函数、属性记得加上this啊 卧槽 垃圾记好了啊 ！！
				this.$axios.get('/getimgcategory').then(res=>{
					this.categorys = res.data.message
					this.categorys.unshift({title: '全部',id: 0})
				}).catch(err=>console.log(err))
		}
		
	}
</script>

<style scoped>
	.photo-header li{
		display: inline-block;
		margin-left: 10px;
		height: 30px;
	}
	.photo-header ul{
		white-space: nowrap;
		overflow-x: auto;
		margin: 5px;
	}
	.photo-header{
		overflow: hidden;
	}
	.photo-list li{
		position: relative;
	}
	.photo-list li img{
		width: 100%;
		height:　100%;
		vertical-align:　top;
	}
	.photo-list p{
		position: absolute;
		bottom: 0;
		color:　white;
		background-color: rgba(0,0,0,0);

	}
	.photo-list p span:nth-child(1){
		font-weight: bold;
		font-size: 16px;
	}
</style>
