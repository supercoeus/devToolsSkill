(function(){

	

	var TestClass=React.createClass({displayName: "TestClass",
		getInitialState:function(){
			return {
				status:"hide",
				color:"#f33"
			}
		},
		render:function(){
			return (
				React.createElement("div", {className: this.state.status, style: {color:this.state.color}}, 
					this.state.color
				)
			)
		}
	});

	React.render(React.createElement(TestClass, null),document.getElementById("testClass"))



})();