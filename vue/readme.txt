vue组件编译的注意事项
1.需要安装vue-loader vue-babel-preset-stage-0 
2. .babellrc的配置文件需要配置stage0 


如果想编译scss文件的话  需要在style加上属性lang:sass  而不是scss

scope代表当前样式只应用于当前组件  避免全局污染



问题？

关于打包

1.为什么打包的文件很大  因为webpack设置的devtool了 所以很大，不要设置  http://www.jianshu.com/p/a64735eb0e2b
2.引用的vue无法使用 页面单独引用可以使用
3.组件内部如何引用外部scss样式 @import "name.scss"
4.css引用的图片路径问题 output中的publicPath的配置，如果是cdn静态资源库怎么办？如何解决本地地址  测试地址 线上地址  cdn地址不同的问题



path.resolve需要注意第二个路径为相对路径


关于vue

1.路由不能写在组建内部，必须写在主文件main里面  而且需要这样用  Vue.use（vueRouter）
2.路由引用的组件，不能用

import Goods from ./asd/goods.vue
{path:"/goods",component:{template:Goods}}

而应该
import Goods from ./asd/goods.vue
{path:"/goods",component:Goods}


3.元素查找

只要涉及到查找元素，都需要在mounted里面调用；
如果涉及到数据读取，异步读取数据后需要调用this.$nextTick（callback）在callback里面写对应的逻辑
不然找不到元素


4.循环
v－for＝“（item,index）in lists”


5.动画的关键在于
元素的初始化状态就要设置成动画完成时候的状态

6.如何解决组件之间的通信？

父组件与子组件之间的传递和接收参数
：propName
props:{
	propName:{
		type:....
	}
}

7.子组件接收参数如果为对象或者数组，default需要用函数return  不能直接写为default：｛｝或者 default：［］
所有子组件的data值也需要返回，而不是直接定义为｛｝；


8.如果计算属性和和层次很深的数据关联，如果深层次中的数组中的一条发生改变，计算属性也会改变么？
如果是在传递到子组件中的数据，在子组件中修改，父组件的计算属性会改变么？
怎么实现的？


4.如何解决热加载的问题？


5.如何解决前后端完全分离的问题？


6。如何解决项目过大导致的入口文件过大问题？因为随着项目的逻辑越来越复杂，组件会越来越多，打包文件会越来越大


7.如何实现完全自适应布局？
