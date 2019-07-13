import React, { Component } from 'react';
import Spline from '../charts/line charts/Spline Chart';
import '../dashboard/Dashboard.css';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataLoaded: true
        }
    }

    render() {

        return (
            <div className="Dash">
                {!this.state.dataLoaded? <h1>Analizando datos</h1> : this.dash()}                             
            </div>
        );
    }

    dash = () => {
        return(
            <div>
                <Spline/>
            </div>
        );
    }

    timerAnalisis = () =>{
        setTimeout(()=>{
            console.log("cambio de estado a loaded");
            this.setState({dataLoaded:true});
        }, 60000);
    }

    componentDidMount(){
        this.timerAnalisis();
    }
}

export default Dashboard;