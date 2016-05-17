(function(){
	//元素操作  动画   移动端事件 怎么和react组合使用
	
	var names=["习大大","彭麻麻","王大师","哈哈哈"];
	React.render(
		React.createElement("div", null, 
		React.createElement("h3", null, "测试循环"), 
		
				names.map(function(item,index){
					return React.createElement("li", null, index+1, ":", item, " ");
				})
			
		)
		
	,document.getElementById("container"));


	var Lists=React.createClass({displayName: "Lists",
		getInitialState:function(){//如果是异步获取的初始状态呢  怎么搞？
			return {
				status:false,
				color:"#f33",
				wdW:window.innerWidth,
				now:new Date()
			}
		},
		handleResize:function(){//页面尺寸发生变化
			this.setState({
				wdW:window.innerWidth
			});
		},
		handleClick:function(){
			this.setState({
				status:!this.state.status
			});
			this.setProps({
				datavalue:Math.random()
			});

			// console.log(this.state);
			if(this.state.status){
				this.setState({
					color:"#f33"
				});
			}
			else{
				this.setState({
					color:"#39f"
				});
			}
		},
		handleClickSub:function(){
			console.log(21323);
		},
		handleInput:function(){
			this.setState({
				inputVal:document.getElementById("input").value
			});
		},
		componentDidMount:function(){//组件被加载到页面上后
			var _self=this;
			window.addEventListener("resize",this.handleResize);
			setInterval(function(){
				_self.setState({
					now:new Date()
				});
			},1000);

		},
		componentWillUnMount:function(){//
			window.removeEventListener("resize",this.handleResize);
			// alert("did");
		},
		set:function(val){
			return val<10?"0"+val:val;
		},
		render:function(){//render是所有方法里面最脏的一个部分  如果结构很复杂  岂不是很蛋疼
			//思想是把数据和展示完全分开  有特定的业务逻辑模块负责更新
			//this 多次嵌套后  this时终止向组件本身 this.set(this.state.now.getSeconds()) 
			// 这个不是真正意义上的多层嵌套 因为本质上是显式this
			var self=this;
			return (React.createElement("div", {style: {color:this.state.color}}, 
			React.createElement("p", {onClick: this.handleClick}, "点击我 "), 
			React.createElement("p", null, this.state.now.getHours()+":"+this.state.now.getMinutes()+":"+this.set(this.state.now.getSeconds())), 
			this.props.datavalue, 
			React.createElement("br", null), React.createElement("br", null), 
			React.createElement("p", null, "更改窗口大小动态显示宽度 :", this.state.wdW), 
			
				this.props.options.map(function(item,index){
					return (React.createElement("li", {onClick: this.handleClickSub}, 
							React.createElement("span", null, index, ": ", item)
						))
				}.bind(this)), //绑定this 不然里面的点击处理函数中的this会指向到window上
			
			React.createElement("input", {id: "input", onInput: this.handleInput}), 
			React.createElement("span", null, this.state.inputVal||"null")
			))
		}
	});

	
	//这种写法的优势在哪里呢   

	React.render(React.createElement(Lists, {datavalue: "123", options: ["apple","window","android"]}),document.getElementById("lists"));

	setTimeout(function(){
		// React.unmountComponentAtNode(document.getElementById("lists"));
		
	},5000);
})();