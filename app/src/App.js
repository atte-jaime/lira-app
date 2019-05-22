import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Inicio from './pages/inicio/Inicio';
import Historial from './pages/historial/Historial';
import Investigaciones from './pages/investigaciones/Investigaciones';
import Comunidad from './pages/comunidad/Comunidad';
import Configuracion from './pages/configuracion/Configuracion';

//import Upload from "./upload/Upload";
//import Analize from "./analize/Analize"

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <ul className="sideBar">
            <li><NavLink exact to="/">Inicio</NavLink></li>
            <li><NavLink to="/historial">Historial</NavLink></li>
            <li><NavLink to="/investigaciones">Investigaciones</NavLink></li>
            <li><NavLink to="/comunidad">Comunidad</NavLink></li>
            <li><NavLink to="/configuracion">Configuración</NavLink></li>
          </ul>
          <div className="content">
             <Route exact path='/' component={Inicio}/>
             <Route path='/historial' component={Historial}/>
             <Route path='/investigaciones' component={Investigaciones}/>
             <Route path='/comunidad' component={Comunidad}/>
             <Route path='/configuracion' component={Configuracion}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
