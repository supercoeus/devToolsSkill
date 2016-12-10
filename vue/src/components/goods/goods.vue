<template>
	<div class="wraper">
		<div class="menu-wraper" ref="menuWraper">
			<ul class="menu-list">
				<li v-for="(group,index) in foodsGroupList" 
					v-text="group.label + index" 
					class="menu-item" 
					:class="{'active':index == currentIndex}"
					v-on:click="goodsGoIndex(index)">
				</li>
			</ul>
		</div>
		<div class="goods-wraper" ref="goodsWraper">
			<div>
				<ul v-for="(group,index) in foodsGroupList" class="food-group">
					<label v-text="group.label + index" class="food-label"></label>
					<li v-for="(list,index) in group.foodList"  class="food-item pos-rel">
						<div class="food-img">
							<img :src="list.imgSrc">
						</div>
						<div class="food-msg">
							<p v-text="list.name" class="name-line"></p>
							<p class="price-line">
								<span class="fc-red">¥</span>
								<span v-text="list.price" class="fc-red"></span>
							</p>
							<p class="operate-line">
								<transition name="slide-decrease">
									<span v-show="list.needShow" class="decrease iconfont icon-tubiao fn-fl"></span>
								</transition>
								<transition name="slide-text">
									<span v-show="list.needShow" class="count fn-fl" v-text="list.selectedNum"></span>
								</transition>
								<span class="add iconfont icon-icontianjia01 fn-fl" v-on:click="addFoods(group,list)"></span>
							</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Bscroll from "better-scroll";
	import goodsData from "./goodsData.js";
	export default {
		data(){
			return {
				currentIndex:0,
				scrollY:0,
				foodsGroupHeight:[],
				foodsGroupList:goodsData.foodsGroupList
			}
		},
		computed:{
			
		},
		methods:{
			_caculateIndex(){
				var self=this;
				var scrollY=this.scrollY;
				var length=this.foodsGroupHeight.length;
				for(var i=0;i<length;i++){
					var item=this.foodsGroupHeight[i];
					var itemNext=this.foodsGroupHeight[i+1];
					
					if(scrollY>=item && scrollY<=itemNext) {
						this.currentIndex=i;
						if((scrollY+this.$refs.goodsWraper.clientHeight>=this.foodsGroupHeight[length-1])){
							this.currentIndex=length-2;
						}
					}

				}
			},
			goodsGoIndex(index){
				var to= - this.foodsGroupHeight[index];
				this.goodsScroll.scrollTo(0, to,500 );
			},
			addFoods:function(group,list){
				var index1=this.foodsGroupList.indexOf(group);
				var index2=group.foodList.indexOf(list);
				var foodItem=this.foodsGroupList[index1].foodList[index2];
				foodItem.needShow=true;
				console.log(foodItem);
			}
		},
		mounted(){
			var self=this;
			console.log("mounted");
			this.menuScroll=new Bscroll(this.$refs.menuWraper,{
	          probeType: 3,
	          click: true
        	});

			this.goodsScroll=new Bscroll(this.$refs.goodsWraper,{
	          probeType: 3,
	          click: true
        	});

			this.goodsScroll.on("scroll",(prop)=>{
				this.scrollY=Math.abs( Math.round(prop.y) );
				this._caculateIndex();
			});

			var startH=0;
			self.foodsGroupHeight.push(startH);
			var groups=this.$refs.goodsWraper.getElementsByClassName("food-group");
			for(var i=0;i<groups.length;i++){
				var group=groups[i];
				var height=group.clientHeight;
				startH+=height;
				self.foodsGroupHeight.push(startH);
			}
		},
		
	}
</script>


<style scoped lang="sass">
	@import "../../../build/css/_ignore/mixin.scss";
	@import "../../../build/css/_ignore/theme.scss";
	
	@include DPR(".wraper .menu-wraper",12px);
	@include DPR(".wraper .operate-line span",20px);
	@include DPR(".wraper .operate-line .count",16px);


	.wraper{
		position: absolute;
		top:pxToRem(440);
		left:0;
		right:0;
		bottom:pxToRem(100);
		width: 100%;
		display: flex;
		overflow: hidden;
		.menu-wraper{
			flex:0 0 pxToRem(160);
			background-color: #f3f3f3;
			.menu-list{
				.menu-item{
					line-height: pxToRem(80);
					text-align: center;
					border-bottom: 1px solid #e8e8e8;
					&.active{
						background-color: #fff;
					}

				}
			}
		}
		.goods-wraper{
			flex:1;
			-webkit-flex:1;
			height: 100%;
			@include boxSizing(border-box);
			.food-group{
				.food-label{
					display: block;
					line-height: pxToRem(50);
					text-indent: pxToRem(10);
					background-color: #e8e8e8;

				}
				.food-item{
					display: flex;
					padding: pxToRem(10);
					@include boxSizing(border-box);
					border-bottom:pxToRem(1) solid #e8e8e8;
					.food-img{
						flex:0 0 pxToRem(100);
						-webkit-flex:0 0 pxToRem(100);
						margin-right: pxToRem(15);
						width: pxToRem(100);
						height:pxToRem(100);
						img{
							width: 100%;
							height: 100%;
						}
					}
					.food-msg{
						display: table;
						flex:1;
						.price-line{
							line-height: pxToRem(90);
						}
						.operate-line{
							position: absolute;
							right: pxToRem(10);
							bottom:pxToRem(10);
							text-align: right;
							$size:pxToRem(60);
							height: $size;
							font-size: 0;
							span{
								
								bottom:0;
								$size:pxToRem(40);
								display: inline-block;
								margin:0 pxToRem(10);
								line-height: $size;
								text-align: center;
								&.decrease{
									color:$theme-blue;
									z-index: 1;
									opacity:1;
								}
								&.count{
									opacity: 1;
									z-index: 2;
								}
								&.add{
									color: $theme-blue;
									z-index: 3;
								}
							}
						}
					}
				}
			}

		}
	}

	.slide-decrease-enter-active,.slide-decrease-leave-active{
		transition:all ease 400ms;
	}
	.slide-decrease-enter-active{
		opacity:1;
		transform:translate3d(- pxToRem(0),0,0) rotate(-360deg);
	}
	.slide-decrease-leave-active{
		opacity:1;
		transform:translate3d(0,0,0)  rotate(0deg);
	}
	
	.slide-decrease-enter{
		opacity:0;
		transform:translate3d(pxToRem(100),0,0)  rotate(0deg);
	}
	


	.slide-text-enter-active,.slide-text-leave-active{
		transition:all ease 400ms;
	}

	.slide-text-leave-active{
		opacity:0;
		transform:translate3d(0,0,0);
	}
	.slide-text-enter-active{
		opacity:1;
		transform:translate3d(0,0,0);
	}
	.slide-text-enter{
		opacity:0;
		transform:translate3d(pxToRem(50),0,0);
	}


</style>
