(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		typeName: "timeseries",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		iconUrl: "Images/burger.png",
		getDefaultConfig: function(){ 
			return { 
				DataShape: "Timeseries",
				Height: 100,
				Width: 250 
			} 
		}
	}

	var dataItems = [
		{ Time: "30-May-18 09:38:00",
		  Value: 106.3742
		},
		{ Time: "30-May-18 09:39:00",
		  Value: 108.3423
		},
		{ Time: "30-May-18 09:40:00",
		  Value: 109.9945
		}
	];
	
	symbolVis.prototype.init = function(scope, elem) {
		this.onDataUpdate = dataUpdate;
		
		function dataUpdate(data){
			if(!data) return;
			var firstAttribute = data.Data[0];
			scope.Values = firstAttribute.Values;

			if(firstAttribute.Label){
				//sporadic:
				scope.Units = firstAttribute.Units;
				scope.Label = firstAttribute.Label;
			}			
		}
		//scope.Values = dataItems;
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
