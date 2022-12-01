# vue 尚品汇项目学习

### 快捷键

ctrl +shift +K 删除一整行

## 脚手架初始化项目：

创建脚手架 --vue create 项目名

### 1、项目文件认识：

node_modules 文件夹：项目依赖文件夹

public 文件夹：放置一些静态文件，webpack 打包会形成 dist 文件

src 文件夹（程序员源代码文件夹）：

​ assets 文件夹：也是放置静态资源，（一般放置多个组件公用的静态资源），webpack 打包到 js 文件里。

​ componenets 文件夹：非路由组件（全局组件）

​ app.vue:唯一的根组件

​ main,js：程序入口文件，程序最先执行的文件

babel.config.js:配置文件（babel 有关）

package.json 文件：项目的身份证，项目叫什么，由那些依赖，怎么运行

package-lock.json:缓存性文件

README.md：说明性文件

element ui 组件库
按需引入：先下载一个小插件，配置，引入，注册
