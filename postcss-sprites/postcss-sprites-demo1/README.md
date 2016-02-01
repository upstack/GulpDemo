# postcss-sprites

## 两个css文件的引用的icon不能合并在一张图上
且每个css文件中需要处理的icon都要做标记，比如：a.css文件中icon1.png => a_icon1.png
通过groupBy函数做出处理

## 两个文件不能同时引用一个标志,如果引用，后面的文件则会把前面合并的图替换掉（太坑）
所以它是单文件进行的
