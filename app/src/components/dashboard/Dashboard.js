import React, { Component } from 'react';
import Spline from '../charts/line charts/Spline Chart';
import SingleData from '../singleData/SingleData';
import '../dashboard/Dashboard.css';

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


        return(
            <div className= "dash2">
                <Spline/>
                    {this.state.totalAves.value !== 0? 
                        <div className="cards">
                            <SingleData value= {this.state.totalAves.value} image="" title= {this.state.totalAves.title}/>
                            <SingleData value= {this.state.totalEspecies.value} image="" title= {this.state.totalEspecies.title}/>
                            <SingleData value= {this.state.promAvesPunto.value} image="" title= {this.state.promAvesPunto.title}/>
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
            }
        });
        
        console.log(this.state.totalAves.value);
    });
   }

}

export default Dashboard;