(function(){
	/**
	 * { construct function }
	 * @param 
	 */
	function targetInfo(){
		this.id = arguments[0].id;
		this.color = arguments[0].color?arguments[0].color:'#ccc';
		this.gap = arguments[0].gap?arguments[0].gap:0;
		this.num = arguments[0].num?arguments[0].num:1;
		this.file = arguments[0].type;
		this.tag = arguments[0].tag?arguments[0].tag:'i';
		this.createITags();
	}

	/**
	 * Creates i tags.
	 *
	 * @return     {boolean}  { createResult }
	 */

	targetInfo.prototype.createITags= function(){
		if(acrossAnimationLibrary[this.file]){
			var tags=[],
				cssRules = acrossAnimationLibrary[this.file].keyframes,
				node = document.getElementById(this.id),
				styles = acrossAnimationLibrary[this.file].style, 
				tar = document.createElement('style');

			try{
				tar.appendChild(document.createTextNode(styles));
			  }catch(ex){
				tar.styleSheet.cssText = styles;
			}
			document.getElementsByTagName('head')[0].appendChild(tar);
			targetSheet = document.styleSheets[document.styleSheets.length-1];
			targetSheet.insertRule(cssRules,targetSheet.rules.length);

			for(var j =0;j<this.num;j++){
				var tempTag = document.createElement(this.tag);
				tempTag.className = acrossAnimationLibrary[this.file].classname;
				tempTag.style.backgroundColor = this.color;
				tags.push(tempTag);
			}
			for(var i=0;i<tags.length;i++){
				node.appendChild(tags[i]);
			}
			tempTag = null;
			tags = null;
			return true;
		}else{
			return false;
		}
	};

	/**
	 * Starts an animation.
	 */
	targetInfo.prototype.startAnimation = function(){
		var thisDom = document.getElementById(this.id),
			childNodes = thisDom.childNodes,
			gapTime = this.gap?this.gap:0,
			animation = acrossAnimationLibrary[this.file].animation;
		if(!gapTime){
			for(var i=0;i<this.num;i++){
				var animationWithGap = animation.replace('{!gap}','0s');
				childNodes[i].style.animation = animationWithGap;
				childNodes[i].style.display = 'inline-block';
				gapTime += this.gap;
			}
		}else{
			for(var i=0;i<this.num;i++){
				var animationWithGap = animation.replace('{!gap}',gapTime/1000 +'s');
				childNodes[i].style.animation = animationWithGap;
				childNodes[i].style.display = 'inline-block';
				gapTime += this.gap;
			}
		}
		thisDom = null;
		childNodes = null;
	};

	targetInfo.prototype.stopAnimation = function(){
		var thisDom = document.getElementById(this.id),
			childNodes = thisDom.childNodes;
		for(var i=0;i<childNodes.length;i++){
				childNodes[i].style.display = 'none';
		}
	};

	window.acrossAnimation = targetInfo;
	window.acrossAnimationLibrary ={
		loadingLines:{
			style:".loadingLines{display:none;width:2px;height:26px;border-radius:2px;margin:0 2px;}",
			keyframes:"@keyframes loading{0%{transform: scaleY(1);}50%{transform: scaleY(0.5);}100%{transform: scaleY(1);}}",
			animation:"loading 1s ease-in {!gap} infinite",
			classname: 'loadingLines'
		},
		ballPulse:{
			style:".ballPulse{width: 6px;height: 6px;border-radius: 100%;margin: 2px;-webkit-animation-fill-mode: both;animation-fill-mode: both;display: none;}",
			keyframes:"@keyframes scale {0%{-webkit-transform: scale(1);transform: scale(1);opacity: 1; }45% {-webkit-transform: scale(0.1);transform: scale(0.1);opacity: 0.7; }80% {-webkit-transform: scale(1);transform: scale(1);opacity: 1; } }",
			animation:"scale 0.75s {!gap} infinite cubic-bezier(.2, .68, .18, 1.08)",
			classname: 'ballPulse'
		},
		nineBall:{
			style:".nineBall{width: 4px;height: 4px;border-radius: 100%;margin: 1px;-webkit-animation-fill-mode: both;animation-fill-mode: both;display: none;}",
			keyframes:"@keyframes nineBall{33% {-webkit-transform: translateY(10px);transform: translateY(10px);}66%{-webkit-transform: translateY(-10px);transform: translateY(-10px);}100% {-webkit-transform: translateY(0);transform: translateY(0);}}",
			animation:"nineBall 0.6s {!gap} infinite ease-in-out",
			classname: 'nineBall'
		},
		ballScales:{
			style:".ballScales{width: 16px;height: 16px;border-radius: 100%;margin: 2px;-webkit-animation-fill-mode: both;animation-fill-mode: both;left: 0px;top: 0px;opacity: 0;margin: 0;-webkit-animation: ball-scale-multiple 1s 0s linear infinite;animation: ball-scale-multiple 1s 0s linear infinite;}",
			keyframes:"@keyframes ballScales {0% {-webkit-transform: scale(0);transform: scale(0);opacity: 0;}5% {opacity: 1; }100% {-webkit-transform: scale(1);transform: scale(1);opacity: 0; } }",
			animation:"ballScales 0.6s {!gap} infinite ease-in-out",
			classname:'ballScales'
		}
};
})(window);
