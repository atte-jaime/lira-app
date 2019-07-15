import React, { Component } from 'react';
import '../singleData/SingleData.css';

class SingleData extends Component{
    constructor(props){
        super(props);
        this.state={
            value: this.props.value,
            image: this.props.image,
            title: this.props.title,
        };
    }

    render(){

        return(
            <div className="singleData">
                <div className="single">
                    <img src={this.state.image} alt="Icon"/>
                    <h1>{this.state.value}</h1>
                </div>
                <p>{this.state.title}</p>
            </div>
        );
    }
}

export default SingleData;