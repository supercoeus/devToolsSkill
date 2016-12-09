vue组件编译的注意事项
1.需要安装vue-loader vue-babel-preset-stage-0 
2. .babellrc的配置文件需要配置stage0 


如果想编译scss文件的话  需要在style加上属性lang:sass  而不是scss

scope代表当前样式只应用于当前组件  避免全局污染



问题？
1.为什么打包的文件很大  因为webpack设置的devtool了 所以很大，不要设置  http://www.jianshu.com/p/a64735eb0e2b
2.引用的vue无法使用
3.页面单独引用可以使用
4.组件内部如何引用外部scss样式 @import "name.scss"


路由不能写在组建内部，必须写在主文件main里面
而且需要这样用  Vue.use（vueRouter）


路由引用的组件，不能用

import Goods from ./asd/goods.vue
{path:"/goods",component:{template:Goods}}

而应该
import Goods from ./asd/goods.vue
{path:"/goods",component:Goods}



只要涉及到查找元素，都需要在mounted里面调用；如果涉及到数据读取，异步读取数据后需要调用this.$nextTick（callback）在callback里面写对应的逻辑

