<template>
	<div>
		<ul class="bottom-nav-ul">
			<li class="nav-item" v-for="item in navs" v-text="item.text"></li>
		</ul>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				navs:[
					{text:"首页"},
					{text:"消息"},
					{text:"关于"},
				],
			}
		}
	}
</script>

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
	ul{
		list-style:none;
	}
	.bottom-nav-ul{
		$h:40px;
		height: $h;
		position: fixed;
		bottom:0;
		left:0;
		width: 100%;
		display: flex;
		display: -webkit-flex;
		.nav-item{
			line-height: $h;
			flex:1;
			-webkit-flex:1;
		}
	}
</style>
