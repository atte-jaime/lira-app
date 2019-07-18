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
      showComp: true
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
        : this.state.showComp? <Dashboard /> : <h1>Analizando datos</h1>
        }
      </div>
    );    
  }

  transcriptData = async(e) => {
    console.log("di click");
    this.setState({isDataReady: true});
  }
  
  componentDidMount(){
    if (!this.state.showComp) {
      setTimeout(()=>{
          console.log("cambio de estado a loaded");
          this.setState({showComp:true});
          
      }, 60000);
    }
  }

}
 
export default NewData; 