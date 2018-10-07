<template>
	<ul>
		<slot></slot>
	</ul>
</template>

<script type="text/javascript">
	export default {

	}
</script>

<style scoped>
	ul{
		display: flex;			
		flex-direction: row;
		flex-wrap: wrap;
		/*flex-flow: row wrap;*/
		justify-content: space-between;
		align-items: center;
		text-align: center;
	}
	
</style>
