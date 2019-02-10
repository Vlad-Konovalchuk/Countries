import React, {
    Component
} from 'react';
import {Link} from "react-router-dom";
import './Countries.scss'
import {getAllCountries} from "../../utils/api";
import {compareBy} from "../../utils/compare";
import {Loader} from "../Loader/Loader";
import {Select} from "../Select/Select";

//TODO: Implement Mobx or Context API

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

    sortBy(e) {
        const key = e.target.dataset.category;
        const {sortKey, filteredCountries, filterKey} = this.state;
        if (key === sortKey) {
            let arrayCopy = [...filteredCountries];
            filterKey === null ? arrayCopy.reverse() : arrayCopy.reverse().filter(country => country.region === filterKey);
            this.setState({filteredCountries: arrayCopy});
            return;
        }
        let arrayCopy = [...filteredCountries];
        filterKey === null ? arrayCopy.sort(compareBy(key)) : arrayCopy.sort(compareBy(key)).filter(country => country.region === filterKey);
        this.setState({filteredCountries: arrayCopy, sortKey: key});
    }


    async componentDidMount() {
        this.setState({loading: true});
        try {
            const response = await getAllCountries();
            const regions = response.map(item => item.region);
            this.setState({
                countries: response,
                filteredCountries: response,
                regions: [...new Set(regions)]
            });
        } catch (e) {
            throw new Error(e.message);
        } finally {
            this.setState({loading: false});
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
                            {regions.length > 0 ?
                                <Select data={regions} handleChangeSelect={this.handleFilter}/> : null}
                        </th>
                        <th className='sorting' data-category="area" onClick={(e) => this.sortBy(e)}>Area</th>
                        <th className='sorting' data-category="population" onClick={(e) => this.sortBy(e)}>Population
                        </th>
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