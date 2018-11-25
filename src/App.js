import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Countries from './components/Countries';
import Country from './components/Country';
import Car from './Car';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header logo={logo}/>
        <main className='container'>
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
