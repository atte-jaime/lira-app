import React, { Component } from 'react';
import CanvasJSReact from '../../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints =[];

class PieChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			title: {
				text: "Customer Satisfaction"
			},
			subtitles: [{
				text: "71% Positive",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
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
		fetch('http://localhost:8000/public/data/valores-raw.json')
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {

			var puntos = [0,0,0,0,0,0,0,0,0,0]
			
			for (var i = 0; i < data.length; i++) {
				
				var elem = data[i];
				if(elem.puntoCaptura === 1) puntos[0] = puntos[0] + elem.individuos;
				if(elem.puntoCaptura === 2) puntos[1] = puntos[1] + elem.individuos;
				if(elem.puntoCaptura === 3) puntos[2] = puntos[2] + elem.individuos;
				if(elem.puntoCaptura === 4) puntos[3] = puntos[3] + elem.individuos;
				if(elem.puntoCaptura === 5) puntos[4] = puntos[4] + elem.individuos;
				if(elem.puntoCaptura === 6) puntos[5] = puntos[5] + elem.individuos;
				if(elem.puntoCaptura === 7) puntos[6] = puntos[6] + elem.individuos;
				if(elem.puntoCaptura === 8) puntos[7] = puntos[7] + elem.individuos;
				if(elem.puntoCaptura === 9) puntos[8] = puntos[8] + elem.individuos;
				if(elem.puntoCaptura === 10) puntos[9] = puntos[9] + elem.individuos;
				
			}

			for (let i = 0; i < puntos.length; i++) {
				const element = puntos[i];
				dataPoints.push({
					x: i+1,
					y: element
				});
				
			}
			chart.render();
		});
	}
}

export default PieChart;