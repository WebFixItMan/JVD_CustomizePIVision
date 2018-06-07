(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);
	
	//# Function to convert the date to a DD-MMM-YY HH:MM:SS format:
	function convertDate(){
		var mArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		var rawDateNow = new Date();
		var tYear = addLeadingZero(rawDateNow.getFullYear());
		var tMonth = rawDateNow.getMonth();
		var tDay = addLeadingZero(rawDateNow.getDay())
		var tHour = addLeadingZero(rawDateNow.getHours());
		var tMin = addLeadingZero(rawDateNow.getMinutes());
		var tSec = addLeadingZero(rawDateNow.getSeconds());
		function addLeadingZero(x){
			return(x < 10 ? "0" + x : x)
		}
		return tDay + "-" + mArray[tMonth] + "-" + tYear + " " + tHour + ":" + tMin + ":" + tSec;
	};
	

	var definition = { 
		typeName: "simplevalue",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Single,
		getDefaultConfig: function(){ 
			return { 
				Height: 100,
				Width: 250 
			} 
		}
	}

	symbolVis.prototype.init = function(scope, elem) { 
		this.onDataUpdate = dataUpdate;

		function dataUpdate(data){
			if(data.Label){
				scope.Path = data.Path;
				scope.Label = data.Label;
				scope.Units = data.Units;
			}
			//~ console.log(data);
			scope.Time = data.Time;
			scope.Value = data.Value;
		}
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
