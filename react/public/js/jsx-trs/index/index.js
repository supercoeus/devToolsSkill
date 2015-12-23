(function(){

	var names=["习大大","彭麻麻","王大师","哈哈哈"];

	var Lists=React.createClass({displayName: "Lists",
		getInitialState:function(){
			return {
				status:false,
				color:"#f33",
				wdW:window.innerWidth,
				now:new Date()
			}
		},
		handleResize:function(){
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
		render:function(){
			var self=this;
			return (React.createElement("div", {style: {color:this.state.color}, onClick: this.handleClick}, 
			React.createElement("p", null, "点击我 "), 
			React.createElement("p", null, this.state.now.getHours()+":"+this.state.now.getMinutes()+":"+this.state.now.getSeconds()), 
			this.props.datavalue, 
			React.createElement("br", null), React.createElement("br", null), 
			React.createElement("p", null, "更改窗口大小动态显示宽度 :", this.state.wdW), 
			
				this.props.options.map(function(item,index){

					return (React.createElement("li", {onClick: this.handleClickSub}, 
							React.createElement("span", null, index, ": ", item)
						))
				}.bind(this))
			
			))
		}
	});

	React.render(
		React.createElement("div", null, 
		React.createElement("h3", null, "测试循环"), 
		
				names.map(function(item,index){
					return React.createElement("li", null, index+1, ":", item, " ");
				})
			
		)
		
	,document.getElementById("container"));


	React.render(React.createElement(Lists, {datavalue: "123", options: ["apple","window","android"]}),document.getElementById("lists"));

	setTimeout(function(){
		// React.unmountComponentAtNode(document.getElementById("lists"));
		
	},5000);
})();