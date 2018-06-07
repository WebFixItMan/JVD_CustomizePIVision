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
				Width: 650,
				BackgroundColor: '#ffffcc',
				BorderRadius: 2,
				Padding: 1,
				DisplayDigits: 1
			} 
		},
		configOptions: function(){
			return [
				{	
					title: "Format Symbol",
					mode: "format"
				}
			];
		}
	}
	
	symbolVis.prototype.init = function(scope, elem) {
		this.onDataUpdate = dataUpdate;
		this.onConfigChange = configChanged;
		
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
		
		function configChanged(newConfig, oldConfig) {
			console.log(newConfig);
			console.log(oldConfig);
		}
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
