import React, { Component } from 'react';
import '../singleData/singleData.css';

class SingleData extends Component{
    constructor(props){
        super(props);
        this.state={
            value: "",
            image: "",
            title: ""
        }
    }

    render(){

        return(
            <div className="singleData">
                <div className="container">
                    <img src={require(this.state.image)} alt="logo" width="82" height="116"/>
                    <h1>{this.state.value}</h1>
                </div>
                <p>{this.state.title}</p>
            </div>
        );
    }
}

export default SingleData;