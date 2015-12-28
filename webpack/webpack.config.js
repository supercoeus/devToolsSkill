var path=require("path");

var config={
	entry:path.resolve(__dirname,"src/testjs/a.js"),
	output:{
		filename:path.resolve(__dirname,"public/js/testJS/test.js")
	}
};


module.exports=config;