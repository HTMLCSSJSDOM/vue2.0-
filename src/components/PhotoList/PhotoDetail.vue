<template>
	<div>
		<nav-bar title="图文详情"/>
		<div class='photo-title'>
			<p>{{ info.title }}</p>
		
			<span>{{ info.add_time | convertTime('YYYY-MM-DD')}}</span>
			<span>{{ info.click }}次浏览</span>
			<span>分类： 图片</span>
		</div>
		<ul>
			<vue-preview  :slides="imgs"></vue-preview>
			<!-- <li v-for="(img,index) in imgs" :key="index">
				<img :src="img.src" alt="">
			</li> -->
		</ul>
		<div class='photo-desc'>
			<p v-html="info.content">sdsad</p>
		</div>

		<comment :cid="id"/>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				info: {},
				imgs: [],
				id: 0
			}
		},
		mounted(){
			console.log(document.querySelectorAll('.my-gallery figure')[0]) //装载进去了子组件
		},
		beforeMount(){
			console.log(document.querySelectorAll('.my-gallery figure')[0])
		},
		created(){
			let  id = this.$route.query.id
				this.id = id
			//获取详情
			this.$axios.get('getimageinfo/' + id).then(res=>{
				this.info = res.data.message[0]

			}).catch(err=>console.log('图文详情获取失败',err))
			//
			this.$axios.get('getthumimages/' + id).then(res=>{
				this.imgs = res.data.message
				this.imgs.forEach(img=>{
					img.msrc = img.src
					img.w = 600
					img.h = 300
				})
			}).catch(err=>console.log('获取图片缩略图失败',err))
		},
		beforeRouterEnter(to,from,next){
			console.log(to)
			console.log(from)
		}
	}
</script>

<style scoped>
	.photo-title{
		overflow: hidden;
	}
	.photo-title,.photo-desc{
		border-bottom: 1px solid rgba(0,0,0,.2);
		padding: 5px;
		margin-bottom: 5px;
		padding-left: 5px;
	}
	.photo-title p{
		font-size: 20px;
		font-weight: bold;
		color: #13c2f7;
	}
	.photo-title span{
		margin-right: 20px;
	}
	.photo-desc p{
		font-size: 18px;
	}

</style>