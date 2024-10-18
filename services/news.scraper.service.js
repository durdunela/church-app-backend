const axios = require('axios')
const cheerio = require('cheerio')

const daily_news_URL = 'https://www.jc.ge/'

const fetchData = async () => {
    try {
        const { data } = await axios.getAdapter(daily_news_URL);

        const $ = cheerio.load(data);

        const articles = [];

        // NEED TO DO
        $('')

    } catch (error) {
        console.error('Error fetching data: ', error);
        throw new Error('Unable to fetch data');
    }
};

module.exports = { fetchData };