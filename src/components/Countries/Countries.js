import React, {
    Component
} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import './Countries.scss'

export default class Countries extends Component {
    state = {
        countries: [],
        filteredCountries: [],
        loading: false,
        filterKey: null,
        sortKey: null,
        regions:[]
    };

    filterCountries = () => {
        const {countries, filterKey} = this.state;
        if (filterKey === '' || filterKey === null) {
            this.setState({filteredCountries: countries});
            return;
        } else {
            const newArr = countries.filter(country => country.region === filterKey);
            this.setState({filteredCountries: newArr});
        }
    }

    async componentDidMount() {
        this.setState({loading: !this.state.loading});
        try {
            const response = await axios.get('https://restcountries.eu/rest/v2/all');
            const regions = response.data.map(item => item.region);
            this.setState({
                countries: response.data,
                regions
            }, () => this.filterCountries());
        } catch (e) {
            throw new Error(e.message);
        } finally {
            this.setState({loading: !this.state.loading});
        }
        console.log(this.state)
    }

    render() {
        const {countries, loading} = this.state;
        if (loading) {
            return (
                <main className='main_content'>
                    <h2>Here will be list of a countries!</h2>
                </main>
            )
        }
        return (
            <main className='main_content'>
                <table className="country-table">
                    <thead className="country-table__head">
                    <tr>
                        <th>Countries</th>
                        <th>
                            <select name="changeregion">
                                {countries.map(item => <option key={item.region}
                                                               value={item.region}>{item.region}</option>)}
                            </select>
                        </th>
                        <th>Area</th>
                        <th>Population</th>
                    </tr>
                    </thead>
                    <tbody className="country-table__list">
                    {countries.map(item =>
                        <tr key={item.numericCode}>
                            <td><Link to={`/countries/${item.name}`}>{item.name}</Link></td>
                            <td>{item.region}</td>
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