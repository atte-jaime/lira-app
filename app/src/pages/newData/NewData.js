import React, { Component } from "react";
import Upload from '../../components/upload/Upload';
import Analize from '../../components/analize/Analize';
import Dashboard from '../../components/dashboard/Dashboard.js'
import '../newData/NewData.css';

class NewData extends Component {
  constructor(props){
    super(props);
    this.state = {
      isDataReady: true,
    }
  }
  render() {
    return (
      <div className="content">
        <h1>Añadir datos</h1 >
        
        {!this.state.isDataReady? 
        <div className="dashboard"> <Upload /> <Analize /></div> :   
        <Dashboard /> }
        
      </div>
    );
  }
}
 
export default NewData; 