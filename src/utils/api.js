import axios from 'axios';

const ALL_COUNTRIES_URL = 'https://restcountries.eu/rest/v2/all'


export const getAllCountries = async () => {
    const response = await axios.get(ALL_COUNTRIES_URL);
    return response.data;
};

export const getBiggestArea = async () => {
    const response = await getAllCountries();
    return getBiggest(response, 'area')
};

export const getBiggestPopulation = async () => {
    const response = await getAllCountries();
    return getBiggest(response, 'population')
};

function getBiggest(arr, key) {
    return arr.sort((a, b) => a[key] - b[key]).slice(arr.length - 4, arr.length);
}
