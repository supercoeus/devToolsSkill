require.config({
	"baseUrl":"public",
	"paths":{
		"person":["persons"],
		"jquery":["jquery-1.11.3"],
		"student":["students"]
	}
});


require(["jquery"],function($){
	alert($("li").length);
});

require(["jquery","person"],function($,persons){
	alert(persons.name);
});

require(["student"],function(students){
	alert(students.students);
});