import React, { Component } from "react";
import Upload from '../../components/upload/Upload';
import Analize from '../../components/analize/Analize';
import '../newData/NewData.css';

class NewData extends Component {
  render() {
    return (
      <div className="content">
        <h1>Añadir datos</h1 >
        <div className="dashboard">
          <Upload />
          <Analize />
        </div>
      </div>
    );
  }
}
 
export default NewData; 