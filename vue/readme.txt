vue组件编译的注意事项
1.需要安装vue-loader vue-babel-preset-stage-0 
2. .babellrc的配置文件需要配置stage0 


如果想编译scss文件的话  需要在style加上属性lang:sass  而不是scss

scope代表当前样式只应用于当前组件  避免全局污染



问题？
1.为什么打包的文件很大
2.引用的vue无法使用
3.页面单独引用可以使用
4.组件内部如何引用外部样式


