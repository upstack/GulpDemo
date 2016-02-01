# postcss-easysprites
combine images to sprites, based on their image.png#hash and aspect ratio (@2x).

# 基于postcss-sprites
在图片路径后加入了#hash，需要在每个css文件加上不同的hash，是一个不错的想法，但是一个css文件中多次引用了一个图片的时候，会在雪碧图中累加多次原始图片，十分不好

//TODO 处理后的雪碧图路径还不知道怎么处理 
