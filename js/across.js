(function(){
	/**
	 * { construct function }
	 * @param 
	 */
	function targetInfo(){
		this.id = arguments[0].id;
		this.color = arguments[0].color;
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
			console.log('OK');
			var tags=[],
				cssRules = acrossAnimationLibrary[this.file].keyframes,
				node = document.getElementById(this.id),
				styles = acrossAnimationLibrary[this.file].style, 
				tar = document.createElement('style');

			document.getElementsByTagName('head')[0].appendChild(tar);
			targetSheet = document.styleSheets[document.styleSheets.length-1];
			targetSheet.insertRule(cssRules,targetSheet.rules.length);

			for(var j =0;j<this.num;j++){
				var tempTag = document.createElement(this.tag);
				for(var key in styles){
					tempTag['style'][key] = styles[key];
				}
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
		loading1:{
			"style":{display:'none',width: '4px',height: '35px',borderRadius:'2px',margin:'0 2px',backgroundColor: '#333'},
			"keyframes":"@keyframes loading{0%{transform: scaleY(1);}50%{transform: scaleY(0.5);}100%{transform: scaleY(1);}}",
			"animation":"loading 1s ease-in {!gap} infinite"},
		loading2:{}
};
})(window);
