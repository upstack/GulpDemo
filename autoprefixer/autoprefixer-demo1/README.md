#
## 插件使用
gulp-postcss
autoprefixer

同样可以使用gulp-autoprefixer

CAN I USE:可查询各种被浏览器支持的属性


CSS 后处理器
仅支持现行的前缀，但是也可以设置不去除（默认过时的前缀将被移除）
也可以指定浏览器

还有支持老IE的POSTCSS插件

当仅使用了-webkit-这样的代码时，AP将不再添加其他前缀，所以在使用AP前要做一些处理：
postcss-unprefix|postcss-flexboxfixer|postcss-gradientfixer

可以联合使用POSTCSS的其他插件：
https://github.com/postcss/postcss/blob/master/docs/plugins.md

获得警告：result.warnings()

支持注解  /* autoprefixer: off */
