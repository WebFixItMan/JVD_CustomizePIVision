/*	F I N A L   P R O J E C T:
	OSIsoft Customizing PI Vision with Extensibility Course
	Student: James Devine
	Date: 07-June-2018
	Final Project Summary: This custom symbol utilizes an icon in the symbols panel, loads
	several visible values from the onDataUpdate data. Then stores the symbol name in a 'hidden'
	<span> tag, that when the symbol is clicked it launches an alert showing the symbol name.
*/
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
		typeName: "symbolname",
		iconUrl: "Images/glasses_icon.png",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Single,
		getDefaultConfig: function(){ 
			return { 
				Height: 100,
				Width: 250,
				BackgroundColor: '#ffffcc',
				BorderRadius: 2,
				Padding: 1,
			} 
		}
	}

	symbolVis.prototype.init = function(scope, elem) { 
		this.onDataUpdate = dataUpdate;
		
		scope.buttonClicked = function(){
			alert(document.getElementById("theSymbolName").innerHTML);
		}

		function dataUpdate(data){
			if(data.Label){
				scope.Path = data.Path;
				scope.Label = data.Label;
				scope.Units = data.Units;
				scope.SymbolName = data.SymbolName;
			}
			//console.log(data);
			scope.Time = data.Time;
			scope.Value = data.Value;
		}
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
