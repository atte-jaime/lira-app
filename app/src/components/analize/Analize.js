import React, {Component} from 'react'
import '../analize/Analize.css'

export default class Analize extends Component{
constructor(props){
  super(props);
  this.state = {
    transcript: []
  }
}

  sendRequest = () => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("load", event =>{
        const copy = req.response;
        this.setState({transcript: [copy]});
        //console.log("RESPUESTAAAA   "+req.response);
        resolve(req.response);
      });

      
      req.addEventListener("readystatechange", event =>{
        //console.log("RESPUESTAAAA   "+req.response);
      });
      
      req.addEventListener("load", event=>{
        if (req.readyState === 4 && req.status === 200){
          let prevState = this.state.transcript;
          prevState.push(req.response);
          this.setState({transcript: [prevState+","]});
          console.log(req.response);
        }
      });
      //console.log(this.state.transcript[0]);
      
      const formData = new FormData();
      formData.append("valor", "valor");
      req.open("POST", "http://localhost:8000/analize");
      req.send();
    });
  }
  
  analizeAudio = () => {
   // for (let index = 0; index < 3; index++) {
      this.sendRequest();
      
//}
  }
  


  render(){

    return(
      <div className="analize"> 
      <p>
      {this.state.transcript[0]!== null? 
      this.state.transcript[0] : null}
      </p>
      <a onClick={this.analizeAudio}>Analizar datos</a>
      </div>
    )
  }


}