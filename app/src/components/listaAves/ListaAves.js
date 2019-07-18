import React, {
    Component
} from 'react';

class ListaAves extends Component {
    constructor(props) {
        super(props);
        this.state = {
            punto : this.props.punto,
            especies : this.props.esp
        }
    }

    render(){
        let items = this.state.especies.map((x) =>{
            return <li>{x.name + " " + x.value}</li>
        });
        /*
        const items = lista.map( function (x) {
            <li>Hello</li>
        });
*/
        return(
            <div>
                <h3>Punto # {this.state.punto}</h3>
                <ul>
                    {items}   
                </ul>
            </div>
        );
    }

}

export default ListaAves;