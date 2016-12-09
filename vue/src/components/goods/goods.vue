<template>
	<div class="wraper">
		<div class="menu-wraper" ref="menuWraper" >
			<ul class="menu-list">
				<li v-for="group in foodsGroupList" v-text="group.label" class="menu-item"></li>
			</ul>
		</div>
		<div class="goods-wraper">
			
		</div>
	</div>
</template>

<script>
	import Bscroll from "better-scroll";

	export default {
		data(){
			return {
				foodsGroupList:[
					{
						label:"粥",
						foodList:[
							{name:"小米粥"},
							{name:"红豆粥"},
							{name:"黑米粥"}
						]
					},
					{
						label:"面食",
						foodList:[
							{name:"炸酱面"},
							{name:"焖面"},
							{name:"雪菜肉丝面"}
						]
					},
					{
						label:"面食",
						foodList:[
							{name:"炸酱面"},
							{name:"焖面"},
							{name:"雪菜肉丝面"}
						]
					},
					{
						label:"面食",
						foodList:[
							{name:"炸酱面"},
							{name:"焖面"},
							{name:"雪菜肉丝面"}
						]
					},
					{
						label:"面食",
						foodList:[
							{name:"炸酱面"},
							{name:"焖面"},
							{name:"雪菜肉丝面"}
						]
					},
					{
						label:"面食",
						foodList:[
							{name:"炸酱面"},
							{name:"焖面"},
							{name:"雪菜肉丝面"}
						]
					},
					{
						label:"面食",
						foodList:[
							{name:"炸酱面"},
							{name:"焖面"},
							{name:"雪菜肉丝面"}
						]
					},
					{
						label:"面食",
						foodList:[
							{name:"炸酱面"},
							{name:"焖面"},
							{name:"雪菜肉丝面"}
						]
					},
					{
						label:"面食",
						foodList:[
							{name:"炸酱面"},
							{name:"焖面"},
							{name:"雪菜肉丝面"}
						]
					},
					{
						label:"面食",
						foodList:[
							{name:"炸酱面"},
							{name:"焖面"},
							{name:"雪菜肉丝面"}
						]
					},
					{
						label:"面食",
						foodList:[
							{name:"炸酱面"},
							{name:"焖面"},
							{name:"雪菜肉丝面"}
						]
					},
				]
			}
		},
		method:{

		},
		created(){
			var self=this;
			this.$nextTick(function(){
				self.menuScroll=new Bscroll(this.$refs.menuWraper,{
	          probeType: 3,
	          click: true
	        	});

				self.menuScroll.on("scroll",(prop)=>{
					console.log(prop);
				});
			});
			

		}
	}
</script>


<style scoped lang="sass">
	.wraper{
		position: absolute;
		top:220px;
		left:0;
		right:0;
		bottom:40px;
		width: 100%;
		display: flex;
		overflow: hidden;
		.menu-wraper{
			flex:0 0 80px;
			background-color: #f3f3f3;
			.menu-list{
				.menu-item{
					line-height: 40px;
				}
			}
		}
	}
	
</style>
