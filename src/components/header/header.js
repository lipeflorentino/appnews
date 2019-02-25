// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col, Input} from 'react-materialize';
//Importando css e scss files
import './stylesheet/header.css';
import './stylesheet/header-switch.scss';
import './stylesheet/header-desktop.css';
//importando function de toggle mode dark/light
import { toggleDarkLight } from './javascript/switch-mode.js';

//header
const Header = () => (
    <div className="header-info" >
        <div className="switch">
            <label>
              <input id="pid" name="on" type="checkbox" value='1' onClick={toggleDarkLight}></input>
              <span className="lever"><p className="p-light">LIGHT</p><p className="p-dark">DARK</p></span>
            </label>
        </div>
        <div className="hi-title">
            <Row>
                <Col m={2} s={12}>
                    <h1>News</h1>                    
                </Col>
                <Col m={10} s={12}>                    
                    <hr></hr>
                </Col>
            </Row>
        </div>        
    </div>  
);

export default Header;