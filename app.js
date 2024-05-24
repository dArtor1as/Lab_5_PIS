const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const NEWSAPI_KEY = 'a7bbc573393842619be68c59240a4ee4'; 

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'us',
                category: 'business',
                apiKey: NEWSAPI_KEY
            }
        });

        const articles = response.data.articles;
        res.render('index', { articles });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from NewsAPI');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});