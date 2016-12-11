
<template>
	<div>
		<v-header></v-header>
		<ul class="tab-ul">
			<li>
				<router-link to="/goods">商品</router-link>
			</li>
			<li>
				<router-link to="/ratings">评论</router-link>
			</li>
			<li>
				<router-link to="/seller">商家</router-link>
			</li>
		</ul>
		<router-view ></router-view>
		
	</div>
</template>

<script >
	
	import Header from "components/header/header.vue";
	import BottomNav from "components/bottomNav/bottomNav.vue";
	

	export default {
		data(){
			return {
				
			}
		},
		components:{
			"v-header":Header,
			'v-bottomNav':BottomNav,
			
		}
	}
</script>

<style  lang="sass">
	@import "../build/css/_ignore/mixin.scss";
	
	html,body,#v-app{
		width: 100%;
		height: 100%;
		background-color: #f8f8f8;
		padding: 0;
		margin: 0;
	}
</style>

<style scoped lang="sass">
	@import "../build/css/_ignore/mixin.scss";
	.tab-ul{
		$h:pxToRem(80);
		display: flex;
		display: -webkit-flex;
		background-color:#fff;
		border-bottom: 1px solid #d9d9d9;
		li{
			flex:1;
			-webkit-flex:1;
			a{
				line-height: $h;
				display: block;
				text-align: center;
			}
		}
	}
</style>
