<template>
	<v-bottomNav><v-bottomNav>
</template>

<script>
	import bottomNav from "./components/bottomNav/bottomNav.vue";
	export default {
		data(){
			return {
				navs:[
					{text:"首页"},
					{text:"消息"},
					{text:"关于"},
				],
			}
		},
		components:{
			'v-bottomNav':bottomNav
		}
	}
</script>
<style type="text/css" src="../public/css/app.min.css"></style>
<style  lang="sass">
	html,body,#v-app{
		width: 100%;
		height: 100%;
		background-color: #f8f8f8;
		padding: 0;
		margin: 0;
	}
</style>

<style scoped lang="sass">
	
</style>
