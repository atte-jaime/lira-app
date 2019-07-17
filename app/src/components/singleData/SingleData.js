import React, { Component } from 'react';
import '../singleData/SingleData.css';

class SingleData extends Component{
    constructor(props){
        super(props);
        this.state={
            value: this.props.value,
            imagen: this.props.imagen,
            title: this.props.title,
        };
    }

    render(){

        return(
            <div className="singleData">
                <div className="single">
                    <img src={this.state.imagen} width="84px" height="84px" alt="Icon"/>
                    <h1>{this.state.value}</h1>
                </div>
                <p>{this.state.title}</p>
            </div>
        );
    }
}

export default SingleData;