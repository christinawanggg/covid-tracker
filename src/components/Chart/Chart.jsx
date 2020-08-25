import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    // states, set as empty object, same as state= {dailyData={}}, this is the class based version
    const [dailyData, setDailyData] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData()); //awaits and sets DailyData state
        }

        fetchAPI();
    }, []); // [] serves as a componentdidmount

    const lineChart = (
        // if we have dailyData return Line Chart, or else null
        dailyData.length// if not 0
        ? (
        <Line 
            data={{
                // this is a map
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                }],
            }}
        />) : null
    );

    console.log(confirmed, recovered, deaths)
    const barChart = (
        confirmed 
            ? (
                <Bar 
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                'rgba(0, 0, 255, 0.5)', 
                                'rgba(0, 255, 0, 0.5)', 
                                'rgba(255, 0, 0, 0.5)',
                            ], 
                            data: [confirmed.value, recovered.value, deaths.value]
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text:`Current State in ${country}`}, //${country} comes from data
                    }}
                />
            ): null
    );


    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;