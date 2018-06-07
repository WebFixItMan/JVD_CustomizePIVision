(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = { 
		typeName: "barchart",
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		getDefaultConfig: function(){ 
			return { 
				DataShape: 'Table',
				Height: 650,
				Width: 650 
			} 
		}
	}

	function getConfig(){
		return {
				"type": "serial",
				"categoryField": "attribute",
				"startDuration": 1,
				"categoryAxis": {
					"gridPosition": "start"
				},
				"trendLines": [],
				"graphs": [
					{
						"balloonText": "[[title]] of [[category]]:[[value]]",
						"fillAlphas": 1,
						"id": "AmGraph-1",
						"title": "graph 1",
						"type": "column",
						"valueField": "value"
					}
				],
				"guides": [],
				"valueAxes": [
					{
						"id": "ValueAxis-1",
						"title": "Not Just Any Old Axis title"
					}
				],
				"allLabels": [],
				"balloon": {},
				"legend": {
					"enabled": true,
					"useGraphSettings": true
				},
				"titles": [
					{
						"id": "Title-1",
						"size": 15,
						"text": "The Orange Graph"
					}
				],
				"dataProvider": [
					{
						"attribute": "attribute 1",
						"value": 8
					},
					{
						"attribute": "attribute 2",
						"value": 6
					}
				]
		}
	} 
	
	symbolVis.prototype.init = function(scope, elem) { 
		var container = elem.find('#container')[0];
		container.id = "barChart_" + scope.symbol.Name;
		var chart = AmCharts.makeChart(container.id, getConfig());
		
		function convertToChart(data){
			return data.Rows.map(function(item){
				return {
					value:item.Value,
					attribute:(item.Label ? item.Label : "Something" )
				}
			});
		}	
		
		this.onDataUpdate = dataUpdate;
		function dataUpdate(data){
			var dataprovider = convertToChart(data);
			chart.dataProvider = dataprovider;
			chart.validateData();
			console.log(data);
		}
	};

	PV.symbolCatalog.register(definition); 
})(window.PIVisualization); 
