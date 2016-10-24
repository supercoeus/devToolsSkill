var koa=require("koa");

var app=koa();

app.use(function *(next){
	this.body=this;
});

app.listen(3000);
