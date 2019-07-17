import React, { Component } from 'react';
import Spline from '../charts/line charts/Spline Chart';
import SingleData from '../singleData/SingleData';
import PieChart from '../charts/pie charts/PieChart';
import '../dashboard/Dashboard.css';

// IMAGENES
import nest from '../../img/nest.png';
import bird from '../../img/bird.png';
import rest from '../../img/rest.png';
import flying from '../../img/flying.png';
import pinpoint from '../../img/pin.png';
import atomic from '../../img/atomic.png';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: true,
            totalAves: {
                title: "Aves en total",
                value: 0
            },
            totalEspecies: {
                title: "Especies encontradas",
                value: 0
            },
            promAvesPunto: {
                title: "Aves por punto",
                value: 0
            },
            
        };

        this.dash = this.dash.bind(this);
    }

    render() {

        return (
            <div className="Dash">
                {!this.state.dataLoaded? <h1>Analizando datos</h1> : this.dash()}                             
            </div>
        );
    }

    dash() {        

        if (this.state.data !== undefined) {
            var tempData = this.state.data;
            var tempEspecies= tempData.map(x => x.especie);
            var pieValues = [];

            Array.prototype.unique = function() {
                return this.filter(function (value, index, self) {
                  return self.indexOf(value) === index;
                });
            };
            
            tempEspecies = tempEspecies.unique();

            tempEspecies.forEach(element => {
                pieValues.push({
                    name: element,
                    y: 0
                });
            });

            for (let i = 0; i < tempData.length; i++) {
                const dato = tempData[i];
                for (let j = 0; j < pieValues.length; j++) {
                    const element = pieValues[j];
                    if (dato.especie === element.name) {
                        element.y += dato.individuos;
                    }
                }
            }

            console.log(pieValues);
            
        }

        return(

            <div className="dashContain">
                <h1>Título investigación</h1>
                <div className="dash1">
                    <div className="spline">
                        <Spline />
                    </div>
                    {this.state.totalAves.value !== 0 ?
                        <div className="cards">
                            <SingleData value={this.state.totalAves.value} imagen={bird} title={this.state.totalAves.title} />
                            <SingleData value={this.state.totalEspecies.value} imagen={atomic} title={this.state.totalEspecies.title} />
                            <SingleData value={this.state.promAvesPunto.value} imagen={pinpoint} title={this.state.promAvesPunto.title} />
                        </div>
                        : null}
                </div>
                <h1>Título X</h1>
                {this.state.totalAves.value !== 0 ?
                <div className="dash2">
                    <div className="pie">
                        <h3>Individuos por especie</h3>
                        <div className="innerPie">
                            <PieChart total={this.state.totalAves.value + " aves en total"} dataPoints={pieValues}/>
                        </div>
                    </div>
                    <div className="pie">
                        <h3>Distancia promedio</h3>
                        <div className="innerPie">
                            <PieChart />

                        </div>
                    </div>
                </div>  
                : null}
            </div>
        );
    }

    timerAnalisis = () =>{ 
        if (!this.state.dataLoaded) {
            setTimeout(()=>{
                console.log("cambio de estado a loaded");
                this.setState({dataLoaded:true});
            }, 60000);
        }

        
    }

    componentDidMount(){
        this.timerAnalisis();
   }

   componentWillMount(){
    fetch('http://localhost:8000/public/data/valores-raw.json')
    .then((response)=> {
        return response.json();
    })
    .then((data)=> {
        let tempAves = 0;

        // CALCULO DE AVES TOTALES

        data.forEach(element => {
            tempAves = tempAves + element.individuos;        
        });


        this.setState({
            totalAves: {
                title: "Aves en total",
                value: tempAves
            },
            totalEspecies: {
                title: "Especies encontradas",
                value: 4
            },
            promAvesPunto: {
                title: "Aves por punto",
                value: parseInt(tempAves/10)
            },
            data: data
        });
    });
   }

}

export default Dashboard;