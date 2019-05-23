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
import './styles/app.css'
//import Upload from "./upload/Upload";
//import Analize from "./analize/Analize"

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="app">
          <div className="sideBar">
            <NavLink exact to="/">Inicio</NavLink>
            <NavLink to="/historial">Historial</NavLink>
            <NavLink to="/investigaciones">Investigaciones</NavLink>
            <NavLink to="/comunidad">Comunidad</NavLink>
            <NavLink to="/configuracion">Configuración</NavLink>
          </div>
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
