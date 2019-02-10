import React from 'react';
import './Main.scss';
import {getBiggestArea, getBiggestPopulation} from "../../utils/api";
import {converToChart} from "../../utils/convertToChartData";
import {Chart} from "../Chart/Chart";
import {Loader} from "../Loader/Loader";


export class Main extends React.PureComponent {
    state = {
        areaData: [],
        populationData: [],
        loading: false
    };

    componentDidMount() {
        this.setState({loading: true});
        try {
            getBiggestArea().then(values => {
                    const areaData = converToChart(values, 'area');
                    this.setState({areaData})

            });
            getBiggestPopulation().then(values => {
                    const populationData = converToChart(values, 'population');
                    this.setState({populationData})
            });
        } catch (e) {
            throw new Error(e.message)
        } finally {
            this.setState({loading: false})
        }

    }

    render() {
        const {areaData, populationData, loading} = this.state;
        if (loading) {
            return (<Loader/>)
        }
        return (
            <main>
                <Chart data={areaData}/>
                <Chart data={populationData}/>
            </main>
        )
    }
}

