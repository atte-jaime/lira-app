import React, { Component } from 'react';
import Spline from '../charts/line charts/Spline Chart';
import SingleData from '../singleData/SingleData';
import '../dashboard/Dashboard.css';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataLoaded: false,
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
        
        var totalEspecies = [];
        var promAvesPunto = 0;
        var tempAves = 0;
        
        fetch('http://localhost:8000/public/data/valores-raw.json')
		.then(function(response) {
            return response.json();
		})
		.then(function(data) {
            let totalAves = 0;
            data.forEach(element => {
                totalAves = totalAves + element.individuos;
            });
            tempAves = totalAves;
        });


        return(
            <div className= "dash2">
                <Spline/>
                <div className="cards">
                    <SingleData value= {386} image="" title= {this.state.totalAves.title}/>
                    <SingleData value= {15} image="" title= {this.state.totalEspecies.title}/>
                    <SingleData value= {63} image="" title= {this.state.promAvesPunto.title}/>
                </div>
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
}

export default Dashboard;