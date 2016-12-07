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


<!--
 require("!style!css!sass!../build/css/_ignore/base.scss");
 -->


<style scoped lang="sass">
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
