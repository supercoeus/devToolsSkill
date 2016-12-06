var fs=require("fs");

function getFiles(){
	fs.readdir("./buildWebpack/js/page/main.js",function(err,data){
		if(err){
			console.log(err);
		}
		else{
			console.log(data);
		}
	});
}

getFiles();
module.exports=getFiles;
