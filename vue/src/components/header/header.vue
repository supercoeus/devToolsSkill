<template>
	<div class="header text-center">
		i am header
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		}
	}
</script>



<style scoped lang="sass">
	@import "../../../build/css/_ignore/mixin.scss";

	.header{
		$h:pxToRem(360);
		background-image:url(header.jpg);
		background-color: #f94;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		min-height: $h;
		@include boxSizing(border-box); 
		
	}
</style>
