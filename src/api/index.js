import axios from 'axios'; // axios is used to make api requests

const url = 'https://covid19.mathdro.id/api';

// async await deals with promises
export const fetchData = async (country) => {
    let changeableUrl = url;

    if(country) {
        changeableUrl = `${url}/countries/${country}`;
    }

    try {
        // destructuring confirmed, recovered, deaths, lastUpdate
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

        // through object, getting attributes of data
        // since same name as data objects, don't have to do ex. confirmed: confirmed
        // originally had this object, but don't need it if you directly use its contents
        //const modifiedData = { confirmed, recovered, deaths, lastUpdate, }

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`); // this is a template string to get daily data from
    
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));

        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries }} = await axios.get(`${url}/countries`);
        
        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}