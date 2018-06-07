(function (PV){
	"use strict";

	var def = {
		typeName: "helloworld", 
		iconUrl: "Images/greeting_icon.png",
		init: init 
	} 

	function init(scope) {
		scope.buttonClicked = function(){
			alert("Hello World!");
		}
	}

	PV.toolCatalog.register(def); 

})(window.PIVisualization)
