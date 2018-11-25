import React, {
  Component
} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import './Countries.scss'

export default class Countries extends Component {
  constructor() {
    super()

    this.state = {
      cities: [],
      loading: false
    }
  }

  async componentWillMount() {
    this.setState({loading:!this.state.loading})
    const response = await axios.get('https://restcountries.eu/rest/v2/all')
    this.setState({
      cities:response.data
    })
    this.setState({loading:!this.state.loading})
    console.log(this.state)
    }
  
  render (){
      const {cities,loading } = this.state;
      if(loading){
        return (
          <main className='main_content'>
              <h2>Here will be list of a cities!</h2>
          </main>
        )
      }
      return(
        <main className='main_content'>
           <table className="country-table">
             <thead className="country-table__head" >
               <tr>
                  <th>Countr</th>
                  <th>Area</th>
                  <th>Population</th>
               </tr>
             </thead>
             <tbody className="country-table__list">
               {cities.map(item=>
               <tr key={item.numericCode}>
               <td><Link to={`/countries/${item.name}`}>{item.name}</Link></td>
                  <td>{item.area}</td>
                  <td>{item.population}</td>
               </tr>
               )}
             </tbody>
           </table>
        </main>
      )
    }
  }