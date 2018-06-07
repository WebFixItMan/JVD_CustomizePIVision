(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		typeName: "archivedata",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Single,
		getDefaultConfig: function(){ 
			return { 
				Height: 100,
				Width: 250 
			} 
		}
	}

	var dataItems = [
		{ Time: "29-May-18 06:38:00",
		  Value: 106.3742
		},
		{ Time: "30-May-18 09:38:00",
		  Value: 108.3423
		}
	];
	
	symbolVis.prototype.init = function(scope, elem) {
		scope.Values = dataItems;
		scope.Count = dataItems.length;
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
