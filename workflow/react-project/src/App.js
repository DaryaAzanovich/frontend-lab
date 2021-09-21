import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import { Sp } from './pages/Sp';
import Navbar from './components/Navbar';

function App() {
    return (
        <BrowserRouter>
            <div className="app-container" id="app">
                <Navbar />
                <Switch>
                    <Route exact path={'/'}>
                        <Home />
                    </Route>
                    <Route path={'/sp'} component={Sp}/>
                </Switch>
            </div>
        </BrowserRouter>   
    );
}

export default App;
