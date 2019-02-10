import React from 'react';
import {Bar} from 'react-chartjs-2';


export class Chart extends React.PureComponent {
    render() {
        return (
            <div className='chart' style={{margin: '2rem 0'}}>
                <Bar
                    data={this.props.data}
                    height={200}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        )
    }
}