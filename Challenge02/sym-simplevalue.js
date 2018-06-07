(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);
	
	var mArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	
	function convertDate(){
		var rawDateNow = new Date();
		var tYear = addLeadingZero(rawDateNow.getFullYear());
		var tMonth = rawDateNow.getMonth();
		var tDay = addLeadingZero(rawDateNow.getDay())
		var tHour = addLeadingZero(rawDateNow.getHours());
		var tMin = addLeadingZero(rawDateNow.getMinutes());
		var tSec = addLeadingZero(rawDateNow.getSeconds());
		function addLeadingZero(x){
			if(x < 10){
				return "0" + x;
			}else{
				return x;
			}
		}
		return tDay + "-" + mArray[tMonth] + "-" + tYear + " " + tHour + ":" + tMin + ":" + tSec;
	};
	
	var dataItem = { 
		Time: convertDate(),
		//Time : "24-May-18 12:10:00",
		Value : 108.6678
	};

	var definition = { 
		typeName: "simplevalue",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Single,
		getDefaultConfig: function(){ 
			return { 
				Height: 150,
				Width: 150 
			} 
		}
	}

	symbolVis.prototype.init = function(scope, elem) { 
		scope.Time = dataItem.Time;
		scope.Value = dataItem.Value;
		//console.log(scope.Time);
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
