import React, {Component} from 'react'
import '../analize/Analize.css'

export default class Analize extends Component{
constructor(props){
  super(props);
  this.state = {
  }
}

  render(){

    return(
      <div className="Analize"> 
      <button onClick={this.analizeAudio}>Analizar datos</button>
      </div>
    )
  }

  analizeAudio(){
    var request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:8000/analize', true);
    request.send();
  }

}