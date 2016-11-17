
/*
ES5的对象属性名都是字符串，这容易造成属性名的冲突
Symbol会生成一个独一无二的属性名  注意这个属性名不是字符串


*/

/*
 1.用法
*/

let s = Symbol();
typeof s;//symbol



/*
里面传递的参数只是为了描述，和Symbol本身没有任何关系  ，就算传递了参数，每一个symbol都是不一样的
*/
var s1=Symbol("foo");
var s2=Symbol("foo");
var s3=Symbol("bar");

s1===s2;//false


console.log(s1);//Symbol(foo)
console.log(s1.toString());//"Symbol(foo)"



/*
	Symbol值不能与其他类型的值进行运算
	Symbol可以转为字符串和布尔值  但是不能转为数字
*/

var s1=Symbol("foo");

console.log(s1+"ade",s1.toString(),String(s1),!s1);//报错  "Symbol(foo)" "Symbol(foo)" false



/*
	Symbol值作为对象属性名时，不能用点运算符。
	
*/

var mySymbol=Symbol("a");

var o={};
o[mySymbol]="hello";


var o={
	[mySymbol]:"hello"
};


o[mySymbol];//hello



/*
	对象上会部署这个方法 进行for...of循环的时候 ，会调用此方法，如果一个对象上没有这个方法，可以进行部署（一般情况下用于自定义的对象）
	Symbol.iterator 

*/




