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


<style scoped lang="sass">
	@import "../../../build/css/_ignore/mixin.scss";
	.bottom-nav-ul{
		$h:pxToRem(100);
		height: $h;
		position: fixed;
		bottom:0;
		left:0;
		width: 100%;
		display: flex;
		display: -webkit-flex;
		border-top:1px solid #e2e2e2;
		.nav-item{
			text-align: center;
			line-height: $h;
			flex:1;
			-webkit-flex:1;
		}
	}
</style>
