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
import NewData from './pages/newData/NewData';
import './styles/app.css'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="app">
          <div className="sideBar">
            <div className="topSideBar">
              <img src={require('./img/Logo.png')} alt="logo" width="82" height="116"/>
              <NavLink to="/newData" className="addData">Añadir datos</NavLink>
            </div>
            <div className="navegation">
              <NavLink exact to="/" className="menuBtn">Inicio</NavLink>
              <NavLink to="/historial" className="menuBtn">Historial</NavLink>
              <NavLink to="/investigaciones" className="menuBtn">Investigaciones</NavLink>
              <NavLink to="/comunidad" className="menuBtn">Comunidad</NavLink>
              <NavLink to="/configuracion" className="menuBtn">Configuración</NavLink>
            </div>
          </div>
          <div className="content">
             <Route exact path='/' component={Inicio}/>
             <Route path='/historial' component={Historial}/>
             <Route path='/investigaciones' component={Investigaciones}/>
             <Route path='/comunidad' component={Comunidad}/>
             <Route path='/configuracion' component={Configuracion}/>
             <Route path='/newData' component={NewData}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
