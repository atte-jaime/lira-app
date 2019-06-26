import React, { Component } from 'react';
import Spline from '../charts/line charts/Spline Chart';
import '../dashboard/Dashboard.css';

class Dashboard extends Component {

    render() {

        return (
            <div className="Dash">
                <Spline />                
            </div>
        );
    }

}

export default Dashboard;