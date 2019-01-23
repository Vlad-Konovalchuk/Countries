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
        regions: [],
        sorted: false,
    };

    handleFilter = (e) => {
        const key = e.target.value;
        console.log(e);
        this.setState({filterKey: key}, () => this.filterCountries())
    };

    filterCountries = () => {
        const {countries, filterKey} = this.state;
        if (filterKey === null) {
            return;
        } else {
            const newArr = countries.filter(country => country.region === filterKey);
            this.setState({filteredCountries: newArr});
        }
    };
    handleSort = (key) => {
        this.setState({sortKey: key}, () => this.sortCountries())
    };
    sortCountries = () => {
        const {countries, sortKey, sorted} = this.state;
        if (sortKey === null) {
            return;
        } else if (sorted) {
            const newArr = countries.reverse();
            this.setState({filteredCountries: newArr});
        } else {
            const newArr = countries.sort((a, b) => Number(a[sortKey]) - Number(b[sortKey]));
            this.setState({filteredCountries: newArr, sorted: true});
        }
    };

    async componentDidMount() {
        this.setState({loading: !this.state.loading});
        try {
            const response = await axios.get('https://restcountries.eu/rest/v2/all');
            const regions = response.data.map(item => item.region);
            this.setState({
                countries: response.data,
                filteredCountries: response.data,
                regions: [...new Set(regions)]
            });
        } catch (e) {
            throw new Error(e.message);
        } finally {
            this.setState({loading: !this.state.loading});
        }
    }

    render() {
        const {filteredCountries, loading, regions} = this.state;
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
                        <th className='regions'>
                            Regions
                            {<select
                                className='select-region'
                                name="changeregion"
                                onChange={(e) => this.handleFilter(e)}>
                                {regions.map((item, index) => {
                                    if (item.length > 0) {
                                        return (
                                            <option key={index}
                                                    value={item}
                                            >
                                                {item}
                                            </option>)
                                    }
                                })}
                            </select>}
                        </th>
                        <th className='sorting' onClick={() => this.handleSort('area')}>Area</th>
                        <th className='sorting' onClick={() => this.handleSort('population')}>Population</th>
                    </tr>
                    </thead>
                    <tbody className="country-table__list">
                    {filteredCountries.map(item =>
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