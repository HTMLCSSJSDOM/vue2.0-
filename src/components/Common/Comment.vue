<template>
	<div>
		<div class="photo-bottom">
			<ul>
				<li class="photo-comment">
					<div>
						<span>提交评论</span>
						<span><a>返回</a></span>
					</div>
				</li>
				<li class='text-comment'>
					<textarea v-model="comment"></textarea>
				</li>
				<li>
					<mt-button size="large" type="primary" @click="sendMsg">发表评论</mt-button>
				</li>
				<li class="photo-comment">
					<div>
						<span>评论列表</span>
						<span>44条列表</span>
					</div>
				</li>
			</ul>
			<ul class='comment-list'>
				<li v-for="(msg,index) in msgs"  :key="index">
					{{ msg.user_name }}: {{ msg.content }} {{ msg.add_time | relativeTime}}
				</li>
				
			</ul>
			<mt-button type="danger" size="large" plain @click="loadMore(page)" v-show="display">加载更多</mt-button>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'comment',
		props: ['cid'],
		
		data(){
			return {
				msgs: [],
				page: 1,
				display: true,
				comment: ''
			}
		},
		beforeRouteUpdate(to,from,next){
			this.loadMore()
			next()
		},
		created(){
				 this.page = this.$route.query.page || '1'
			
				this.loadMore()
		},
		methods:{
			loadMore(page){
				this.$axios.get(`getcomments/${this.cid}?pageindex=${this.page}`).then(res=>{
					if(res.data.message.length === 0){
						this.$toast('没有数据了!')
						this.display = false
					}
					if(page){
						//数据叠加
						this.msgs = this.msgs.concat(res.data.message)
					}else{
						this.msgs = res.data.message
					}
					this.page++
				}).catch(err=>console.log(err))
			},
			sendMsg(){
				if(this.comment.trim() === ""){
					return this.$toast('输入不能为空!')
				}
				this.$axios.post('postcomment/' + this.cid,`content=${this.comment}`).then(res=>{
					//发表成功时，将发表内容清空
					this.comment = ''
					this.page = 1
					//显示最新的消息
					this.loadMore()
				}).catch(err=>console.log('提交评论失败!'))
			}
		}
	}
</script>
<style scoped>
	.photo-comment > div span:nth-child(1){
		float: left;
		font-weight: bold;
		margin-left: 5px;
	}
	.photo-comment > div >span:nth-child(2){
		float: right;
	}
	.photo-comment{
		height: 30px;
		border-bottom: 1px solid rgba(0,0,0,.2);
		line-height: 30px;
		margin-bottom: 5px;
	}
	.text-comment{
		padding: 5px;
	}
	.text-comment textarea{
		width: 100%;
		height: 40px;
		margin-bottom: 5px;
		
	}
	.comment-list li{
		border-bottom: 1px solid rgba(0,0,0,.2);
		padding-bottom: 5px;
		margin-bottom: 5px;
		padding-left: 5px;
	}
</style>