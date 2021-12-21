import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Login from './Components/Login';
import Gallery from './Components/Gallery';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/gallery" render={(props) => <Gallery {...props} />} />
                </Switch>
            </Router>
        );
    }
}


export default App;
