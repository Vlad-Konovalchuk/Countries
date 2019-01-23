import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Countries from './components/Countries';
import Country from './components/Country';

import './App.css';
import {Modal} from "./components/Modal/Modal";

class App extends Component {
    state = {
        showModal: false,
    };

    toggleModal = () => {
        console.log('modal open');
        this.setState({showModal: !this.state.showModal})
    };

    render() {
        return (
            <div className="App">
                <Header logo={logo} toggleModal={this.toggleModal}/>
                <main className='container'>
                    <Modal open={this.state.showModal} onClose={this.toggleModal}/>
                    <Switch>
                        <Route path='/countries/:id' component={Country}/>
                        <Route path='/countries' component={Countries}/>
                        <Route path='/' component={Main}/>
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
