import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

// import coronaImage from './image/image.png';

// Class Based Component
// easier to use class based when so much async
class App extends React.Component {

    // use state to be able to use const data in <Cards />
    state = {
        data: {},
        country: '',
    }
    
    // componentDidMount is invoked after component is inserted into the tree
    async componentDidMount() {
        //await data returned from fetchData
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData } )
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        // fetch the data
        // set the state
        this.setState({ data: fetchedData, country: country });
    }

    render() {
        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <h1 className={styles.title}>COVID-19 Tracker</h1>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;