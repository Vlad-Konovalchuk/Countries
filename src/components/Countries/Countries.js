import React, {
    Component
} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import './Countries.scss'
import {Loader} from "../Loader/Loader";

function sorting(a, b, key) {
    return Boolean(a[key]) - Number(b[key])
}


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
    //TODO: Clean this methods or maybe get out in utils

    // handleSort = (key) => {
    //     if (this.state.sortKey === key) {
    //         this.sortCountries();
    //     } else {
    //         this.setState({sortKey: key, sorted: !this.state.sorted}, () => this.sortCountries())
    //     }
    // };
    //
    // sortCountries = () => {
    //     const {countries, sortKey, sorted, filterKey} = this.state;
    //     if (sortKey === null) {
    //         return;
    //     } else if (sorted) {
    //         let newArr = Boolean(filterKey) ? countries.reverse().filter(country => country.region === filterKey) : countries.reverse();
    //         this.setState({filteredCountries: newArr});
    //     } else {
    //         let newArr;
    //         if (filterKey !== null) {
    //             newArr = countries.sort(sorting(sortKey)).filter(country => country.region === filterKey);
    //         } else {
    //             newArr = countries.sort((a, b) => Number(a[sortKey]) - Number(b[sortKey]))
    //         }
    //         this.setState({filteredCountries: newArr, sorted: true});
    //     }
    // };

    compareBy(key) {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    }

    sortBy(key) {
        const {sortKey, filteredCountries, filterKey} = this.state;
        if (key === sortKey) {
            let arrayCopy = [...filteredCountries];
            filterKey === null ? arrayCopy.reverse() : arrayCopy.reverse().filter(country => country.region === filterKey);
            this.setState({filteredCountries: arrayCopy});
            return;
        }
        let arrayCopy = [...filteredCountries];
        filterKey === null ? arrayCopy.sort(this.compareBy(key)) : arrayCopy.sort(this.compareBy(key)).filter(country => country.region === filterKey);
        this.setState({filteredCountries: arrayCopy, sortKey: key});
    }


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
            return (<Loader/>)
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
                        <th className='sorting' onClick={() => this.sortBy('area')}>Area</th>
                        <th className='sorting' onClick={() => this.sortBy('population')}>Population</th>
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