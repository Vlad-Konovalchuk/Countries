import React from 'react';
import Radium from 'radium';
const Car = ()=> {
  const style = {
    margin:'2rem',
    background:'#eee',
    ":hover": {
      border:'1px solid #fff'
    }
  }
    return (
      <div style={style}>
        <h3>Car Name</h3>
        <p>Year: <strong>1987</strong></p>
        <input type="text"/>
        <button>Buy this car</button>
      </div>
    )
};


export default Radium(Car);