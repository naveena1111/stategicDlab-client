import React from 'react';
import './App.css';
import { Route, Link, Router } from 'react-router-dom';
import ContactUsComponent from './components/contactUs/contactUs.jsx';
import Home from './components/home/home';
import { history } from './helpers/history';

class App extends React.Component {



    contactus() {

        history.push('/contactus');
    }
    render() {
        return (
            <Router history={history}>
                <div>
                    <header></header>
                </div>


                <div>
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <img src={require('./img/logo1.png')} />
                        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item letterSpace-2 mr-4 ">
                                    <Link to="/home" className="nav-link font-weight-bold ">ABOUT US</Link>                   {/* <a class="nav-link" href="#">ABOUT US <span class="sr-only">(current)</span></a> */}
                                </li>
                                <li class="nav-item letterSpace-2 mr-4">
                                    <a class="nav-link  font-weight-bold" href="#">SERVICES</a>
                                </li>
                                <li class="nav-item letterSpace-2 mr-4">
                                    <a class="nav-link  font-weight-bold" href="#">CASE STUDIES</a>
                                </li>
                                <li class="nav-item letterSpace-2 mr-3 ">
                                    <Link to="/" className="nav-link font-weight-bold active">CONTACT US</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>


                <div >
                    <Route exact path="/" component={ContactUsComponent} />
                    <Route path="/home" component={Home} />
                </div>
            </Router>




        );
    }

}

export default App;
