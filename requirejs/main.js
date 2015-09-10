require.config({
	"baseUrl":"public",
	"paths":{
		"jquery":["jquery-1.11.3"],
		"persons":["persons"]
	}
});


require(["jquery"],function($){
	alert($("li").length);
});

require(["jquery","persons"],function($,persons){
	alert(persons.name);
});