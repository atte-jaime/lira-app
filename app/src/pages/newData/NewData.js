import React, { Component } from "react";
import Upload from '../../components/upload/Upload';
import Analize from '../../components/analize/Analize';
import Dashboard from '../../components/dashboard/Dashboard.js'
import '../newData/NewData.css';

class NewData extends Component {
  constructor(props){
    super(props);
    this.state = {
      isDataReady: false,
    }
  }

  render() {
    return (
      <div className="contenido">
        
        {!this.state.isDataReady? 
        <h1>Añadir datos</h1 > :   
        null}

        
        {!this.state.isDataReady?
        <div className="dashboard"> <Upload /> <div onClick={this.transcriptData}><Analize/></div></div>
        : <Dashboard />
        }
      </div>
    );    
  }

  transcriptData = async(e) => {
    console.log("di click");
    this.setState({isDataReady: true});
  }
  
}
 
export default NewData; 