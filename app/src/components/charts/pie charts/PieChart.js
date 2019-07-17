import React, { Component } from 'react';
import CanvasJSReact from '../../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class PieChart extends Component {
    constructor(props){
        super(props);
        this.state={
            
            dataPoints : this.props.dataPoints,
            total: this.props.total,
        }
    }

	render() {
		const options = {
			animationEnabled: true,
			title: {
				//text: this.state.title
			},
			subtitles: [{
				text: this.state.total,
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				//indexLabel: "{name}: {y}",
				//yValueFormatString: "#,###'%'",
				dataPoints: this.state.dataPoints
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				// onRef={ref => this.chart = ref} 
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
    }
    
    
}

export default PieChart;