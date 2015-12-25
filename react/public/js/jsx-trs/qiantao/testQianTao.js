(function(){

	var ComponentList=React.createClass({displayName: "ComponentList",
		getInitialState:function(){
			return {
				options:[
					{name:"习大大1"},
					{name:"彭麻麻"}
				]
			}
		},
		render:function(){
			return (
				React.createElement("div", null, 
					this.state.options.map(function(item,index){

						return React.createElement("li", null, item.name) 
					}), 
					this.props.lists.map(function(item,index){

						return React.createElement("li", null, item) 
					})
				)
			);
		}
	});

	var ComponentFooter=React.createClass({displayName: "ComponentFooter",
		render:function(){
			return (
				React.createElement("div", null, 
					"footer"
				)
			);
		}
	});

	var ComponentBox=React.createClass({displayName: "ComponentBox",
		getInitialState:function(){
			return {
				status:true,
				color:"#f33"
			};
		},
		render:function(){

			return (
				React.createElement("div", null, 
					React.createElement("h3", null, "ComponentBox-header"), 
					React.createElement("p", null, "ComponentList-hender"), 
					React.createElement(ComponentList, {lists: ["props里面的数据1","b","c"]}), 
					React.createElement("p", null, "ComponentFooter-fooder"), 
					React.createElement(ComponentFooter, null)
				)
			);
		}
	});


	React.render(React.createElement(ComponentBox, null),document.getElementById("container"));
})();