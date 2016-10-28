# across.js 
### css3动画库和js控制器

#### 1. 创建动画

您可以在引入across.js后，简单初始化其配置，即可控制动画的开始和结束。使用： loading.startAnimation() 和 loading.stopAnimation()；可以用于开启和关闭动画
```javascript
<script src="across.js"</script>
<script>
	var animations =new NewAcross({
		target:’id’,//id of div or others
		type:’type1’,//animation type code
		gap:200,// single animation time interval
		num:6// amount of animation tags
	});
</script>
```
动画开始：

```javascript
loading.startAnimation() ；
```

动画结束：

```javascript
loading.stopAnimation()；
```


2. 动画库（更新中），详见[：预览网址](https://sdli.github.io/across/)

```javascript
//加载动画库：
loading.startAnimation();
loadingBall.startAnimation();
nineBall.startAnimation();
ballScales.startAnimation();
spinFades.startAnimation();
semiCircle.startAnimation();
singleRipple.startAnimation();
```

```javascript
弹窗动画库：
waiting...
```
