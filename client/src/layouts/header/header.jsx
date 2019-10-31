import React from 'react';
import './header.css';
 import { Router, Route, Link } from 'react-router-dom';

export default class Header extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>
                 <header className="header">
      <div className="header-name">
          <Router>
         <div>
             <div><Link to="/home"/></div>
             <div><Link to="/contactus"></Link></div>
         </div>
         </Router>
      </div>
      </header>
   
            </div>
        )
    }
}