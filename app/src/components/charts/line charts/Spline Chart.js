import React, { Component } from 'react';
import CanvasJSReact from '../../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints =[];

class SplineChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			title:{
				text: "Aves por punto de captura"
			},
			axisX: {
				title: "Puntos de Captura",
				//valueFormatString: "MMM"
			},
			axisY: {
				title: "Número de individuos",
				//prefix: "#",
				includeZero: false
			},
			data: [{
				type: "spline",
				dataPoints: dataPoints
			}]
		}
		
		return (
		<div>
			
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref} 
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}

	componentDidMount(){
		var chart = this.chart;
		fetch('http://localhost:8000/public/data/nifty-stock-price.json')
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			for (var i = 0; i < data.length; i++) {
				dataPoints.push({
					x: data[i].x,
					y: data[i].y
				});
			}
			chart.render();
		});
	}
}

export default SplineChart;                           