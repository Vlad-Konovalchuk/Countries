import React, {
  Component
} from 'react';
import axios from 'axios';
import './Country.scss'

export default class Country extends Component {
  constructor() {
    super()

    this.state = {
      city: [],
      loading: false
    }
  }

  async componentWillMount() {
    const { match } = this.props
    this.setState({loading:!this.state.loading})
    const response = await axios.get(`https://restcountries.eu/rest/v2/name/${match.params.id}`)
    this.setState({
      city:response.data[0]
    })
    this.setState({loading:!this.state.loading})
    console.log(this.state)
    }
  
  render (){
      const {loading,city } = this.state;
      console.log(city)
      if(loading){
        return (
          <main className='main_content'>
              <h2>Here will be a city info!</h2>
          </main>
        )
      }
      return(
        <section>
        <div className="country-header">
        <h1>{city.name}</h1>
          <div className="country-flag">
            <img src={city.flag} alt={city.name}/>
          </div>
        </div>
        <ul className="country-details">
          <li>
            <strong>Capital: </strong>{city.capital}
          </li>
          <li>
            <strong>Population: </strong> {city.population}
          </li>
          <li>
            <strong>Top level domain: </strong> 
            <ul>
            {city.topLevelDomain.map(dom=><li>{city.dom}</li>)}
            </ul>
          </li>
          <li>
            Geographic location:
              <ul>
                <li>
                <strong>Region: </strong> 
                {city.region}
                </li>
                <li>
                  <strong>Sub-regio: </strong>{city.subregion}
                </li>
              </ul>
          </li>
          <li>
            <strong>Languages: </strong>
            <ul>
              {city.languages.map(lang=><li>{lang.name}</li>)}
            </ul>
          </li>
          <li>
            <strong>National currencies: </strong>
            <ul>
              {city.currencies.map(cur=><li>{cur.name} {cur.symbol}</li>)}
            </ul>
          </li>
        </ul>
        </section>
      )
    }
  }