import React, {
    Component
} from 'react';
import axios from 'axios';
import './Country.scss'

export default class Country extends Component {
    state = {
        city: [],
        loading: false
    };


    async componentWillMount() {
        const {match} = this.props
        this.setState({loading: !this.state.loading})
        const response = await axios.get(`https://restcountries.eu/rest/v2/name/${match.params.id}`)
        this.setState({
            city: response.data[0]
        })
        this.setState({loading: !this.state.loading})
        console.log(this.state)
    }

    render() {
        const {loading, city} = this.state;
        console.log(city)
        if (loading) {
            return (
                <main className='main_content'>
                    <h2>Here will be a city info!</h2>
                </main>
            )
        }
        return (
            <section className="country-item">
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
                            {city.topLevelDomain.map(dom => <li>{city.dom}</li>)}
                        </ul>
                    </li>
                    <li className="country-geo">
                        <strong>Geographic location:</strong>
                        <ul className="country__sublist">
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
                            {city.languages.map(lang => <li>{lang.name}</li>)}
                        </ul>
                    </li>
                    <li>
                        <strong>National currencies: </strong>
                        <ul>
                            {city.currencies.map(cur => <li>{cur.name} {cur.symbol}</li>)}
                        </ul>
                    </li>
                </ul>
                <a className='geo-location'
                   href={`https://www.google.com/maps/?q=${city.latlng[0]},${city.latlng[1]}`}
                   title={`Show on Google Maps ${city.name}`}
                   target='_blank'
                   rel="noopener noreferrer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999">
                        <g fill="#03aa6f">
                            <path
                                d="M441.374 79.519l-26.485 17.656-44.141-8.828-26.485-8.828-35.313 8.828-26.485-8.828 17.656-35.313h35.313l34.607-17.303a252.853 252.853 0 0 1 71.333 52.616zM238.325 44.206l-8.828 26.485-26.485 8.828-26.485 44.141-44.141 26.485-61.797 8.828v26.485l17.656 17.656v35.313L61.762 220.77l-26.485-17.656-15.361-46.171A255.855 255.855 0 0 1 160.284 18.604l25.072 16.774 52.969 8.828zM255.982 291.395l-8.828 44.141-35.313 35.313v26.485l-35.313 26.484v44.141l-26.484-8.828-17.657-44.141v-88.282l-44.141-8.828-17.656-35.313v-26.485l17.656-17.656 26.485-26.485 17.656 35.313h61.797l26.485 44.141zM479.335 130.987c48.193 85.978 42.702 191.996-14.125 272.526l-23.836-23.836v-35.313l-17.656-35.313-17.656-35.313v-35.313l-26.485-17.656-35.313 8.828-61.797-26.485-8.828-61.797 26.485-26.485h52.969l17.656 26.485 52.969 8.828 52.969-17.656 2.648-1.5z"/>
                        </g>
                        <path
                            d="M308.951 88.347l35.313-8.828 26.485 8.828 44.141 8.828 26.485-17.656a252.12 252.12 0 0 1 37.961 51.468l-2.648 1.501-52.969 17.656-52.969-8.828-17.656-26.485h-52.969l-26.485 26.485 8.828 61.797 61.797 26.485 35.313-8.828 26.485 17.656v35.313l17.656 35.313 17.656 35.313v35.313l23.836 23.836c-81.528 115.526-241.275 143.079-356.792 61.55-98.108-69.249-134.913-197.373-88.503-308.122l15.361 46.171 26.485 17.656 26.485 17.656-17.657 17.657v26.485l17.656 35.313 44.141 8.828v88.282l17.656 44.141 26.485 8.828v-44.141l35.313-26.485v-26.485l35.313-35.313 8.828-44.141h-35.313l-26.485-44.141h-61.797l-17.656-35.313-26.485 26.485v-35.313L70.59 185.457v-26.485l61.797-8.828 44.141-26.485 26.485-44.141 26.485-8.828 8.828-26.485-52.969-8.828-25.072-16.774a256.035 256.035 0 0 1 209.758 8.299l-34.607 17.303h-35.313l-17.656 35.313 26.484 8.829z"
                            fill="#86daf1"/>
                    </svg>
                    <span>
                        Show on Google Maps
                    </span>
                </a>
            </section>
        )
    }
}