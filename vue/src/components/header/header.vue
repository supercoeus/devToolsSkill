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
		min-height: 40px;
		@include boxSizing(border-box); 
	}
</style>
