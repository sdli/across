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
				divStyles = acrossAnimationLibrary[this.file].divStyle, 
				tar = document.createElement('style'),
				div = document.createElement('div');

			try{
				tar.appendChild(document.createTextNode(styles));
				tar.appendChild(document.createTextNode(divStyles));
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
				console.log(this.color);
				tags.push(tempTag);
			}
			for(var i=0;i<tags.length;i++){
				div.appendChild(tags[i]);
			}

			div.className = 'acrossDiv ' + this.file + 'Div';
			node.appendChild(div);
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
			childNodes = thisDom.firstChild.childNodes,
			gapTime = this.gap?this.gap:0,
			animation = acrossAnimationLibrary[this.file].animation;
		if(!gapTime){
			for(var i=0;i<this.num;i++){
				var animationWithGap = animation.replace('{!gap}','0s');
				childNodes[i].style.animation = animationWithGap;
				if(acrossAnimationLibrary[this.file].display){
					childNodes[i].style.display = acrossAnimationLibrary[this.file].display;
				}else{
					childNodes[i].style.display = 'inline-block';
					gapTime += this.gap;
				}
			}
		}else{
			for(var i=0;i<this.num;i++){
				var animationWithGap = animation.replace('{!gap}',gapTime/1000 +'s');
				childNodes[i].style.animation = animationWithGap;
				if(acrossAnimationLibrary[this.file].display){
					childNodes[i].style.display = acrossAnimationLibrary[this.file].display;
				}else{
					childNodes[i].style.display = 'inline-block';
					gapTime += this.gap;
				}
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
			classname: 'loadingLines',
			divStyle:''
		},
		ballPulse:{
			style:".ballPulse{width: 6px;height: 6px;border-radius: 100%;margin: 2px;-webkit-animation-fill-mode: both;animation-fill-mode: both;display: none;}",
			keyframes:"@keyframes scale {0%{-webkit-transform: scale(1);transform: scale(1);opacity: 1; }45% {-webkit-transform: scale(0.1);transform: scale(0.1);opacity: 0.7; }80% {-webkit-transform: scale(1);transform: scale(1);opacity: 1; } }",
			animation:"scale 0.75s {!gap} infinite cubic-bezier(.2, .68, .18, 1.08)",
			classname: 'ballPulse',
			divStyle:''
		},
		nineBall:{
			style:".nineBall{width: 4px;height: 4px;border-radius: 100%;margin: 1px;-webkit-animation-fill-mode: both;animation-fill-mode: both;display: none;}",
			keyframes:"@keyframes nineBall{33% {-webkit-transform: translateY(10px);transform: translateY(10px);}66%{-webkit-transform: translateY(-10px);transform: translateY(-10px);}100% {-webkit-transform: translateY(0);transform: translateY(0);}}",
			animation:"nineBall 0.6s {!gap} infinite ease-in-out",
			classname: 'nineBall',
			divStyle:''
		},
		ballScales:{
			style:".acrossDiv{margin:0 auto;}",
			keyframes:"@keyframes ballScales{0% {-webkit-transform: scale(0);transform: scale(0);opacity: 0;}5% {opacity: 1; }100% {-webkit-transform: scale(1);transform: scale(1);opacity: 0; } }",
			animation:"ballScales 1s {!gap} infinite ease-in-out",
			classname:'ballScales',
			divStyle:".ballScalesDiv{position: relative;-webkit-transform: translateX(20px);text-align:center;width:100%;margin:0 auto;} .ballScalesDiv i{width: 30px;height:30px;border-radius: 100%;-webkit-animation-fill-mode: both;animation-fill-mode: both;position: absolute;left:25%;top:25%;margin: 0 auto;}",
			display:'block'
		},
		spinFades:{
			style:"",
			keyframes:"@keyframes spinFades{50%{opacity: 0.3;}100%{opacity:1;}}",
			animation:"spinFades 1.2s {!gap} infinite ease-in-out",
			classname:'spinFades',
			divStyle:".spinFadesDiv{position: relative;transform: translateX(45%) translateY(15px);}.spinFadesDiv i:nth-child(1) {top: 10px;left: 0;}.spinFadesDiv i:nth-child(2) {top: 6.81818px;left: 6.81818px;-webkit-transform: rotate(-45deg);-ms-transform: rotate(-45deg);transform: rotate(-45deg);}.spinFadesDiv i:nth-child(3) {top: 0;left: 10px;-webkit-transform: rotate(90deg);-ms-transform: rotate(90deg);transform: rotate(90deg);}.spinFadesDiv i:nth-child(4) {top: -6.81818px;left: 6.81818px;-webkit-transform: rotate(45deg);-ms-transform: rotate(45deg);transform: rotate(45deg);}.spinFadesDiv i:nth-child(5) {top: -10px;left: 0;}.spinFadesDiv i:nth-child(6) {top: -6.81818px;left: -6.81818px;-webkit-transform: rotate(-45deg);-ms-transform: rotate(-45deg);transform: rotate(-45deg);}.spinFadesDiv i:nth-child(7) {top: 0;left: -10px;-webkit-transform: rotate(90deg);-ms-transform: rotate(90deg);transform: rotate(90deg);}.spinFadesDiv i:nth-child(8) {top: 6.81818px;left: -6.81818px;-webkit-transform: rotate(45deg);-ms-transform: rotate(45deg);transform: rotate(45deg);}.spinFadesDiv i{background-color: #fff;width: 2px;height: 8px;border-radius: 2px;margin: 2px;-webkit-animation-fill-mode: both;animation-fill-mode: both;position: absolute;}",
			display:'block'
		},
		semiCircle:{
			style:"",
			keyframes:"@keyframes semiCircle {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}50%{-webkit-transform: rotate(180deg);transform: rotate(180deg); }100% {-webkit-transform: rotate(360deg);transform: rotate(360deg); } }",
			animation:"semiCircle 1s {!gap} infinite ease-in-out",
			classname:'semiCircle',
			divStyle:".semiCircleDiv{position:relative;width:16px;height:16px;overflow:hidden;}.semiCircleDiv i{position: absolute;border-width: 0px;border-radius: 100%;background-image:-webkit-linear-gradient(transparent 0%, transparent 70%, #fff 30%, #fff 100%);background-image: linear-gradient(transparent 0%, transparent 70%, #fff 30%, #fff 100%);width: 100%;height: 100%; }",
			display:'block'
		},

};
})(window);






















