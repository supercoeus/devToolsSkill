<template>
	<div class="wraper">
		<div class="menu-wraper" ref="menuWraper">
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
		mounted(){
			console.log("mounted");
			this.menuScroll=new Bscroll(this.$refs.menuWraper,{
          probeType: 3,
          click: true
        	});

			this.menuScroll.on("scroll",(prop)=>{
				console.log(prop);
			});

		}
	}
</script>


<style scoped lang="sass">
	@import "../../../build/css/_ignore/mixin.scss";

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
			font-size: 14px;
			.menu-list{
				.menu-item{
					line-height: 40px;
					text-align: center;
					border-bottom: 1px solid #e8e8e8;

				}
			}
		}
	}
	
</style>
