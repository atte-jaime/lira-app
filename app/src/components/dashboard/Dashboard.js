import React, { Component } from 'react';
import Spline from '../charts/line charts/Spline Chart';
import SingleData from '../singleData/SingleData';
import PieChart from '../charts/pie charts/PieChart';
import ListaAves from '../listaAves/ListaAves'
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
                {this.dash()}                             
            </div>
        );
    }

    dash() {

        if (this.state.data !== undefined) {
            var tempData = this.state.data;
            var tempEspecies = tempData.map(x => x.especie);
            var pieValues = [];
            var porPunto = [];

            Array.prototype.unique = function () {
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


            for (let i = 0; i < 10; i++) {
                let especies = [];

                tempEspecies.forEach(esp => {
                    especies.push({
                        name: esp,
                        value: 0
                    });
                });

                porPunto.push({
                    puntoCaptura: i + 1,
                    especies
                });
            }

            for (let i = 0; i < porPunto[0].especies.length; i++) {
                const tempEsp = porPunto[0].especies[i];

                for (let j = 0; j < tempData.length; j++) {
                    const dato = tempData[j];

                    if (tempEsp.name === dato.especie) {
                        porPunto[dato.puntoCaptura - 1].especies[i].value += dato.individuos;
                    }
                }
            }

            for (let i = 0; i < porPunto.length; i++) {
                porPunto[i].especies.sort(function (a, b) {
                    if (a.value > b.value) {
                        return -1;
                    }
                    if (a.value < b.value) {
                        return 1;
                    }
                });

            }

            console.log(porPunto);

        }

        return (

            <div className="dashContain">
                <h1>Título investigación</h1>
                <div className="dash1">
                    <div className="spline">
                        <Spline />
                    </div>
                    {this.state.totalAves.value !== 0 ?
                        <div className="cards">
                            <div>
                                <h3>Totales</h3>
                                <SingleData value={this.state.totalAves.value} imagen={bird} title={this.state.totalAves.title} />
                            </div>
                            <SingleData value={this.state.totalEspecies.value} imagen={atomic} title={this.state.totalEspecies.title} />
                            <div>
                                <h3>Promedios</h3>
                                <SingleData value={this.state.promAvesPunto.value} imagen={pinpoint} title={this.state.promAvesPunto.title} />
                            </div>
                            <div>
                                <h3>Estados</h3>
                                <SingleData value={this.state.volando} imagen={flying} title="En vuelo" />
                            </div>
                            <SingleData value={this.state.rest} imagen={rest} title="En reposo" />
                            <SingleData value={this.state.nido} imagen={nest} title="Incubando" />

                        </div>
                        : null}
                </div>

                <h1>Título X</h1>

                {pieValues !== undefined ?
                    <div className="dash2">
                        <div className="pie">
                            <h3>Individuos por especie</h3>
                            <div className="innerPie">
                                <PieChart total={this.state.totalAves.value + " aves en total"} dataPoints={pieValues} />
                            </div>
                        </div>
                    </div>
                    : null}
                
                {porPunto !== undefined ?
                
                <div className="dash3">
                    {
                        porPunto.map(x=>{
                            return <ListaAves punto = {x.puntoCaptura} esp = {x.especies}/>     
                        })
                    }
                </div>
                    : null}
                
            </div>
        );
    }

    componentDidMount() {
        fetch('http://localhost:8000/public/data/valores-raw.json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let tempAves = 0;
                let tempVolando = 0;
                let tempNido  = 0;
                let tempRest = 0;
                
                var tempEspecies= data.map(x => x.especie);

    
                Array.prototype.unique = function() {
                    return this.filter(function (value, index, self) {
                      return self.indexOf(value) === index;
                    });
                };
                
                tempEspecies = tempEspecies.unique();
    
                // CALCULO DE AVES TOTALES

                data.forEach(element => {
                    tempAves = tempAves + element.individuos;
                    
                    if (element.actividad === "volando") { 
                        tempVolando += element.individuos;
                    }

                    if (element.actividad === "reposo") { 
                        tempRest += element.individuos;
                    }

                    if (element.actividad === "incubando") { 
                        tempNido += element.individuos;
                    }
                });


                this.setState({
                    totalAves: {
                        title: "Aves en total",
                        value: tempAves
                    },
                    totalEspecies: {
                        title: "Especies encontradas",
                        value: tempEspecies.length
                    },
                    promAvesPunto: {
                        title: "Aves por punto",
                        value: parseInt(tempAves / 10)
                    },
                    volando : tempVolando,
                    rest: tempRest,
                    nido: tempNido,
                    data: data
                });
            });
    }

}

export default Dashboard;