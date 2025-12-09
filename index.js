const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

// Endpoint principal
app.get('/', async (req, res) => {
    const targetUrl = req.headers['x-target-url'] || req.query.url;
    if (!targetUrl) {
        return res.status(400).send('Missing target URL');
    }

    try {
        const response = await fetch(targetUrl);
        const html = await response.text();
        res.set('Content-Type', 'text/html');
        res.send(html);
    } catch (err) {
        console.error('Error fetching URL:', err.message);
        res.status(500).send('Error fetching target URL: ' + err.message);
    }
});

// Porta dinâmica fornecida pelo Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`OpenGraph proxy running on port ${PORT}`);
});
